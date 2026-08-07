/**
 * QueueFormPage.jsx — Citizen Queue Request Form
 * 
 * Natural language input + voice input → sends to backend → Gemini analysis → token
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import ParallaxStarsBackground from '../components/ParallaxStarsBackground';
import { submitQueueRequest } from '../services/api';
import { useToast } from '../contexts/ToastContext';

const EXAMPLE_PROMPTS = [
  "I need to renew my passport before next month",
  "My grandmother needs an urgent medical consultation, she's 82",
  "I want to register my newborn baby's birth certificate",
  "I have a scheduled appointment for driving license renewal",
  "Emergency — my child needs immediate medical attention",
  "I need to file my income tax return, preferably in the morning",
];

export default function QueueFormPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await submitQueueRequest(text.trim());
      if (result.success && result.token) {
        addToast(`Token ${result.token.tokenId} generated!`, 'success');
        navigate('/success', { state: { token: result.token, aiAnalysis: result.aiAnalysis } });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      console.error('[QueueForm] Submit error:', err);
      setError(err.message || 'Failed to process your request. Please try again.');
      addToast('Failed to generate token. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [text, loading, navigate, addToast]);

  const handleVoiceTranscript = useCallback((transcript) => {
    setText(prev => prev ? `${prev} ${transcript}` : transcript);
    addToast('Voice input captured!', 'info', 2000);
  }, [addToast]);

  const handleExampleClick = useCallback((example) => {
    setText(example);
  }, []);

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 relative flex flex-col justify-center items-center">
      <ParallaxStarsBackground speed={1} />

      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 space-badge bg-white/5 border border-white/15 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-[#ffc531]" />
            <span className="text-xs font-mono text-white/80">AI-Powered Intent Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
            Tell Us What You Need
          </h1>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Describe your request in plain human language. Google Gemini AI will classify the service and assign your priority.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-card p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-white">
                <MessageSquare size={16} className="text-[#12b3a4]" />
                Natural Language Request
              </span>
              <span className="text-xs font-mono text-white/40">English / Multilingual</span>
            </label>
            
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., I need an urgent medical consultation for my 82-year-old grandmother..."
                className="w-full bg-black/40 border border-white/15 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#12b3a4] transition-colors min-h-[130px] resize-y"
                disabled={loading}
                rows={4}
              />
              <div className="absolute right-3 bottom-3">
                <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl text-xs bg-[#ff5b57]/15 border border-[#ff5b57]/40 text-[#ff5b57]">
              {error}
            </div>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={!text.trim() || loading}
            className="btn-primary w-full justify-center !py-3.5 !text-base shadow-lg"
            style={{ opacity: (!text.trim() || loading) ? 0.5 : 1 }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Analyzing with Gemini AI...
              </span>
            ) : (
              <>
                <Send size={18} />
                <span>Generate Digital Token</span>
              </>
            )}
          </button>
        </form>

        {/* Example Prompt Chips */}
        <div className="mt-8">
          <p className="text-xs font-mono text-white/50 mb-3 text-center">
            💡 Tap an example request to try:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_PROMPTS.map((example, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-xs text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-2 rounded-xl transition-all text-left"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
