/**
 * App.jsx — Root application component
 * 
 * Sets up:
 * - React Router routes for all 7 pages
 * - QueueProvider for polling-based sync
 * - ToastProvider for notifications
 * - MainLayout with Navbar + Footer
 */

import { Routes, Route } from 'react-router';
import { QueueProvider } from './contexts/QueueContext';
import { ToastProvider } from './contexts/ToastContext';
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import QueueFormPage from './pages/QueueFormPage';
import TokenSuccessPage from './pages/TokenSuccessPage';
import LiveQueuePage from './pages/LiveQueuePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <ToastProvider>
      <QueueProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/queue" element={<QueueFormPage />} />
            <Route path="/success" element={<TokenSuccessPage />} />
            <Route path="/live" element={<LiveQueuePage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </QueueProvider>
    </ToastProvider>
  );
}
