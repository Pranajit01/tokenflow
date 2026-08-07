/**
 * VoiceInput.jsx — Web Speech API mic button with graceful fallback
 * 
 * Uses browser-native SpeechRecognition API.
 * Feature-detects and hides the mic button gracefully if unsupported (e.g. Firefox).
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

// Feature-detect Web Speech API
const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

export default function VoiceInput({ onTranscript, disabled = false }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // If browser doesn't support speech recognition, render nothing
  if (!SpeechRecognition) return null;

  const startListening = useCallback(() => {
    if (disabled || isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.warn('[VoiceInput] Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [disabled, isListening, onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      disabled={disabled}
      className={`memphis-btn ${isListening ? 'memphis-btn-coral' : 'memphis-btn-outline'} !p-3`}
      title={isListening ? 'Stop listening' : 'Start voice input'}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
    >
      {isListening ? (
        <>
          <MicOff size={20} />
          <span className="text-sm hidden sm:inline">Listening...</span>
        </>
      ) : (
        <>
          <Mic size={20} />
          <span className="text-sm hidden sm:inline">Voice</span>
        </>
      )}
    </button>
  );
}
