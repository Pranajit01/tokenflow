/**
 * ToastContext.jsx — Toast Notification System
 * 
 * Provides a global toast notification system with auto-dismiss.
 * Types: success, error, warning, info
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

let toastId = 0;

const TOAST_COLORS = {
  success: { bg: 'bg-teal', icon: CheckCircle },
  error: { bg: 'bg-coral', icon: AlertCircle },
  warning: { bg: 'bg-mustard', icon: AlertTriangle },
  info: { bg: 'bg-sky', icon: Info },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, exiting: false }]);

    // Auto-dismiss
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev =>
      prev.map(t => (t.id === id ? { ...t, exiting: true } : t))
    );
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
        {toasts.map(toast => {
          const config = TOAST_COLORS[toast.type] || TOAST_COLORS.info;
          const IconComponent = config.icon;

          return (
            <div
              key={toast.id}
              className={`${toast.exiting ? 'toast-exit' : 'toast-enter'} ${config.bg} text-white border-3 border-ink rounded-xl px-4 py-3 flex items-start gap-3 shadow-lg`}
              style={{ borderColor: 'var(--color-ink)', borderWidth: '3px' }}
            >
              <IconComponent size={20} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
