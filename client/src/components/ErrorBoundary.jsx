/**
 * ErrorBoundary.jsx — React Fallback Error Boundary
 * Prevents UI crashes and ensures 100% reliability
 */

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Captured UI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ef233c]/20 border border-[#ef233c]/40 flex items-center justify-center text-[#ef233c] mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl font-bold font-manrope mb-2">Something went wrong</h1>
          <p className="text-sm text-zinc-400 max-w-md mb-6 font-mono">
            {this.state.error?.message || 'An unexpected error occurred in the application interface.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            <span>Reload Application</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
