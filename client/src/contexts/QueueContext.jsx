/**
 * QueueContext.jsx — Queue State Provider
 * 
 * Polls GET /api/queue/live every 3 seconds.
 * Provides queue state to all child components.
 * This is the frontend's single source of truth for queue data.
 */

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchLiveQueue } from '../services/api';

const QueueContext = createContext(null);

const POLL_INTERVAL = 3000; // 3 seconds

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [stats, setStats] = useState({
    totalServed: 0,
    totalSkipped: 0,
    totalToday: 0,
    avgWaitMinutes: 0,
    waitingCount: 0,
    servingCount: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  const pollQueue = useCallback(async () => {
    try {
      const data = await fetchLiveQueue();
      setQueue(data.queue || []);
      setCurrentToken(data.currentToken || null);
      setNextToken(data.nextToken || null);
      setStats(data.stats || {});
      setLastUpdated(data.updatedAt || new Date().toISOString());
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('[QueueContext] Poll failed:', err.message);
      setError(err.message);
      setLoading(false);
      // Don't clear existing data on transient errors — keep showing stale data
    }
  }, []);

  // Start polling on mount
  useEffect(() => {
    pollQueue(); // Initial fetch
    intervalRef.current = setInterval(pollQueue, POLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pollQueue]);

  // Force refresh (called after admin actions)
  const refresh = useCallback(async () => {
    await pollQueue();
  }, [pollQueue]);

  const value = {
    queue,
    currentToken,
    nextToken,
    stats,
    loading,
    error,
    lastUpdated,
    refresh,
  };

  return (
    <QueueContext.Provider value={value}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
}

export default QueueContext;
