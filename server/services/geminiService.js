/**
 * geminiService.js — Gemini AI Integration (Server-Side Only)
 * 
 * Uses @google/genai SDK (the current unified Google Gen AI SDK).
 * Model: gemini-2.5-flash — verified as the current production-stable
 * flash-tier model (Aug 2026). 2.0-flash is deprecated; 3.x is too new
 * for hackathon reliability.
 * 
 * Structured output: uses responseMimeType + responseSchema to guarantee
 * JSON conformance. Falls back to a rule-based keyword parser if Gemini
 * fails, times out, or returns malformed JSON.
 * 
 * SECURITY: This file is server-side only. The API key never reaches the browser.
 */

const { GoogleGenAI } = require('@google/genai');

// ─── Gemini Client (initialized lazily to allow .env loading first) ───
let genaiClient = null;

function getClient() {
  if (!genaiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('[GeminiService] No valid GEMINI_API_KEY found. Will use fallback parser.');
      return null;
    }
    genaiClient = new GoogleGenAI({ apiKey });
  }
  return genaiClient;
}

// ─── JSON Schema for structured output ───
// This is the exact schema from the spec. All downstream components use these field names.
const QUEUE_REQUEST_SCHEMA = {
  type: 'object',
  properties: {
    service: {
      type: 'string',
      description: 'The specific service the user needs (e.g., "Passport Renewal", "Medical Consultation")',
    },
    department: {
      type: 'string',
      description: 'The department that handles this service (e.g., "Passport Office", "Health Services")',
    },
    preferredTime: {
      type: 'string',
      description: 'Preferred time slot if mentioned (e.g., "morning", "2pm", "tomorrow"). Null if not specified.',
      nullable: true,
    },
    isAppointment: {
      type: 'boolean',
      description: 'Whether the user mentions having an existing appointment',
    },
    priority: {
      type: 'object',
      properties: {
        level: {
          type: 'string',
          enum: ['normal', 'senior_citizen', 'pregnant', 'emergency', 'disabled', 'child'],
          description: 'Priority classification based on the request context',
        },
        reason: {
          type: 'string',
          description: 'Brief explanation of why this priority was assigned',
        },
      },
      required: ['level', 'reason'],
    },
    estimatedWaitMinutes: {
      type: 'number',
      description: 'Estimated wait time in minutes based on the service type (rough estimate: 5-30 min)',
    },
    notes: {
      type: 'string',
      description: 'Any additional notes extracted from the request. Null if none.',
      nullable: true,
    },
  },
  required: ['service', 'department', 'preferredTime', 'isAppointment', 'priority', 'estimatedWaitMinutes', 'notes'],
};

// ─── System prompt for Gemini ───
const SYSTEM_PROMPT = `You are a smart queue management assistant for a government/public service center called "Token Flow". 

Your job: analyze a citizen's natural language request and extract structured information for queue management.

Guidelines:
- Identify the specific service they need and map it to the most appropriate department
- Detect priority indicators: elderly/senior (senior_citizen), pregnant women (pregnant), emergencies/urgent (emergency), disabled/wheelchair (disabled), children/minors (child), or normal
- Note any preferred times or existing appointments
- Estimate reasonable wait times (5-30 minutes range)
- Extract any additional notes that would help the counter staff

Common departments: Passport Office, Health Services, Civil Registry, Tax Office, License Department, Education Services, Social Welfare, Land Registry, Immigration, Utilities Office

Be concise in your notes and reason fields. Always classify priority as one of the exact enum values.`;

/**
 * Analyze a natural language queue request using Gemini
 * @param {string} userRequest - The citizen's natural language input
 * @returns {Object} Structured queue data matching QUEUE_REQUEST_SCHEMA
 */
async function analyzeRequest(userRequest) {
  // Try Gemini first, with one retry on failure
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await callGemini(userRequest);
      if (result) return result;
    } catch (error) {
      console.error(`[GeminiService] Attempt ${attempt} failed:`, error.message);
      if (attempt === 2) {
        console.warn('[GeminiService] Both attempts failed. Using fallback parser.');
      }
    }
  }

  // Fallback: rule-based parser
  return fallbackParser(userRequest);
}

/**
 * Make the actual Gemini API call with structured output
 * @param {string} userRequest - User's input text
 * @returns {Object|null} Parsed JSON or null on failure
 */
async function callGemini(userRequest) {
  const client = getClient();
  if (!client) {
    console.warn('[GeminiService] No API client available. Using fallback.');
    return null;
  }

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Analyze this queue request from a citizen:\n\n"${userRequest}"`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: QUEUE_REQUEST_SCHEMA,
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  // Parse the response
  const text = response.text;
  if (!text) {
    console.error('[GeminiService] Empty response text from Gemini');
    return null;
  }

  try {
    const parsed = JSON.parse(text);
    // Validate essential fields exist
    if (!parsed.service || !parsed.department || !parsed.priority) {
      console.error('[GeminiService] Parsed JSON missing required fields');
      return null;
    }
    return parsed;
  } catch (parseError) {
    console.error('[GeminiService] Failed to parse Gemini response as JSON:', parseError.message);
    return null;
  }
}

/**
 * Fallback rule-based parser for when Gemini is unavailable or fails.
 * Uses keyword matching to produce a usable (if less sophisticated) result.
 * 
 * This ensures the app ALWAYS produces a token, even without AI.
 * 
 * @param {string} text - User's natural language input
 * @returns {Object} Structured queue data (same shape as Gemini output)
 */
function fallbackParser(text) {
  const lower = text.toLowerCase();

  // ─── Priority detection via keywords ───
  let priorityLevel = 'normal';
  let priorityReason = 'Standard request';

  if (/\b(emergency|urgent|critical|life.?threatening|ambulance|accident)\b/.test(lower)) {
    priorityLevel = 'emergency';
    priorityReason = 'Emergency keywords detected in request';
  } else if (/\b(disabled|wheelchair|disability|handicap|blind|deaf)\b/.test(lower)) {
    priorityLevel = 'disabled';
    priorityReason = 'Disability-related keywords detected';
  } else if (/\b(pregnant|pregnancy|expecting|maternity)\b/.test(lower)) {
    priorityLevel = 'pregnant';
    priorityReason = 'Pregnancy-related keywords detected';
  } else if (/\b(senior|elderly|old age|grandmother|grandfather|aged|retire|70.?year|80.?year|90.?year)\b/.test(lower)) {
    priorityLevel = 'senior_citizen';
    priorityReason = 'Senior citizen keywords detected';
  } else if (/\b(child|baby|infant|toddler|kid|minor|son|daughter)\b/.test(lower)) {
    priorityLevel = 'child';
    priorityReason = 'Child-related keywords detected';
  }

  // ─── Department detection via keywords ───
  let department = 'General Services';
  let service = 'General Inquiry';

  const deptMap = [
    { keywords: /\b(passport|travel document|visa)\b/, dept: 'Passport Office', svc: 'Passport Services' },
    { keywords: /\b(health|medical|doctor|hospital|clinic|consultation|checkup)\b/, dept: 'Health Services', svc: 'Medical Consultation' },
    { keywords: /\b(birth|death|marriage|certificate|registry)\b/, dept: 'Civil Registry', svc: 'Certificate Services' },
    { keywords: /\b(tax|income tax|gst|filing|return)\b/, dept: 'Tax Office', svc: 'Tax Services' },
    { keywords: /\b(license|driving|vehicle|registration|motor)\b/, dept: 'License Department', svc: 'License Services' },
    { keywords: /\b(school|education|admission|scholarship|exam)\b/, dept: 'Education Services', svc: 'Education Inquiry' },
    { keywords: /\b(social|welfare|pension|disability benefit|subsidy)\b/, dept: 'Social Welfare', svc: 'Welfare Services' },
    { keywords: /\b(land|property|deed|title|real estate)\b/, dept: 'Land Registry', svc: 'Property Services' },
    { keywords: /\b(immigration|foreign|citizenship|naturalization)\b/, dept: 'Immigration', svc: 'Immigration Services' },
    { keywords: /\b(electricity|water|gas|utility|bill|meter)\b/, dept: 'Utilities Office', svc: 'Utility Services' },
  ];

  for (const { keywords, dept, svc } of deptMap) {
    if (keywords.test(lower)) {
      department = dept;
      service = svc;
      break;
    }
  }

  // ─── Appointment detection ───
  const isAppointment = /\b(appointment|scheduled|booked|reserved|confirmed)\b/.test(lower);

  // ─── Time preference detection ───
  let preferredTime = null;
  if (/\b(morning|am|early)\b/.test(lower)) preferredTime = 'morning';
  else if (/\b(afternoon|pm|lunch)\b/.test(lower)) preferredTime = 'afternoon';
  else if (/\b(evening|late)\b/.test(lower)) preferredTime = 'evening';
  else if (/\b(tomorrow)\b/.test(lower)) preferredTime = 'tomorrow';

  return {
    service,
    department,
    preferredTime,
    isAppointment,
    priority: {
      level: priorityLevel,
      reason: priorityReason,
    },
    estimatedWaitMinutes: priorityLevel === 'emergency' ? 2 : priorityLevel === 'normal' ? 15 : 8,
    notes: `[Processed by fallback parser] Original: "${text.substring(0, 200)}"`,
  };
}

module.exports = { analyzeRequest, fallbackParser };
