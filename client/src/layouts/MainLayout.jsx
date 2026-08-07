/**
 * MainLayout.jsx — Wraps all pages with Navbar, Footer, and error boundary
 */

import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RetryBanner from '../components/RetryBanner';
import { useQueue } from '../contexts/QueueContext';

export default function MainLayout() {
  const { error, refresh } = useQueue();

  return (
    <div className="min-h-screen flex flex-col bg-[#07080a] text-white font-sans selection:bg-[#ff5b57]/30 selection:text-white relative">
      {/* Error banner when backend is unreachable */}
      {error && (
        <RetryBanner
          message={`Connection issue: ${error}`}
          onRetry={refresh}
        />
      )}

      <Navbar />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
