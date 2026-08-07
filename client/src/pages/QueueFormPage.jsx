/**
 * QueueFormPage.jsx — Citizen Queue Request Form
 * 
 * Natural language input + voice input → sends to backend → Gemini analysis → token
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Send, Sparkles, MessageSquare } from 'lucide-react';
import VoiceInput from '../components/VoiceInput';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfettiBackground from '../components/ConfettiBackground';
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
        // Navigate to success page with token data
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
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 relative">
      <ConfettiBackground density="sparse" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 memphis-badge px-4 py-2 mb-4" style={{ backgroundColor: 'var(--color-violet)', color: 'white', borderColor: 'var(--color-ink)' }}>
            <Sparkles size={14} />
            <span className="text-xs">AI-Powered Queue Request</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Tell Us What You Need
          </h1>
          <p className="opacity-60 max-w-md mx-auto">
            Describe your request in plain language. Our AI will figure out the rest.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="memphis-card p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <MessageSquare size={16} className="inline mr-1" />
              Your Request
            </label>
            <div className="flex gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., I need to renew my passport, my appointment is tomorrow morning..."
                className="memphis-input min-h-[120px] resize-y"
                disabled={loading}
                rows={4}
              />
              <div className="flex-shrink-0">
                <VoiceInput onTranscript={handleVoiceTranscript} disabled={loading} />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(255,91,87,0.1)', border: '2px solid var(--color-coral)', color: 'var(--color-coral)' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!text.trim() || loading}
            className="memphis-btn memphis-btn-primary w-full justify-center text-lg"
            style={{ opacity: (!text.trim() || loading) ? 0.5 : 1 }}
          >
            {loading ? (
              <>
                <div className="flex gap-1">
                  <span className="spinner-dot !w-2 !h-2" style={{ backgroundColor: 'white' }} />
                  <span className="spinner-dot !w-2 !h-2" style={{ backgroundColor: 'white' }} />
                  <span className="spinner-dot !w-2 !h-2" style={{ backgroundColor: 'white' }} />
                </div>
                Analyzing with Gemini AI...
              </>
            ) : (
              <>
                <Send size={20} />
                Generate My Token
              </>
            )}
          </button>
        </form>

        {/* Example prompts */}
        <div className="mt-8">
          <p className="text-sm font-bold mb-3 opacity-60" style={{ fontFamily: 'var(--font-heading)' }}>
            💡 Try an example:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((example, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(example)}
                className="text-xs px-3 py-2 rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--color-ink)',
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                }}
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
