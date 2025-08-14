import { useEffect, useState } from 'react';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";
import ErrorBoundary from './ErrorBoundary';
import { SeoDefaults } from '@/components/SeoDefaults';
import path from 'path';

// Lazy-loaded components
const Index = lazy(() => import('./pages/Index'));
const Tours = lazy(() => import('./pages/Tours'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Contact = lazy(() => import('./pages/Contact'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Videos = lazy(() => import('./pages/Videos'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const AllGallery = lazy(() => import('./pages/AllGallery'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const AdminContacts = lazy(() => import('./pages/admin/ContactsDashboard'));
const BookNow = lazy(() => import('./pages/BookNow'));
const HomeIntro = lazy(() => import('./components/HomeIntro'));

const queryClient = new QueryClient();

const routes = [
  { path: "/", element: <Index /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/tours", element: <Tours /> },
  { path: "/videos", element: <Videos /> },
  { path: "/gallery", element: <AllGallery /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/sitemap", element: <Sitemap /> },
  { path: "/admin/contacts", element: <AdminContacts /> },
  {path: "/book-now", element: <BookNow /> },
  {path: "/home-intro", element: <HomeIntro /> },
  
];

// Delayed Loading Component - Only shows for slow connections
const DelayedLoadingSpinner = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    // Only show loader if loading takes longer than 300ms (indicates slow connection)
    const delayTimer = setTimeout(() => {
      setShowLoader(true);
    }, 300);

    // Animate loading text only after loader is shown
    let textInterval;
    if (showLoader) {
      textInterval = setInterval(() => {
        setLoadingText(prev => {
          const dots = prev.match(/\.+$/)?.[0] || "";
          if (dots.length >= 3) return "Loading";
          return prev + ".";
        });
      }, 500);
    }

    return () => {
      clearTimeout(delayTimer);
      if (textInterval) clearInterval(textInterval);
    };
  }, [showLoader]);

  // Don't render anything for fast connections (under 300ms)
  if (!showLoader) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50">
      <div className="flex flex-col items-center space-y-4">
        {/* Main spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-primary/20"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[80px] text-center">
          {loadingText}
        </p>
      </div>
    </div>
  );
};

// Fixed: Moved useGoogleAnalytics inside router context
const GoogleAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-XPTRVPZKM8', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

const AppContent = () => {
  const { isMaintenanceMode } = useMaintenanceMode();

  if (isMaintenanceMode) {
    return (
      <Suspense fallback={<DelayedLoadingSpinner />}>
        <Maintenance />
      </Suspense>
    );
  }

  return (
    <>
      <SeoDefaults />
      <GoogleAnalyticsTracker />
      <Suspense fallback={<DelayedLoadingSpinner />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <MaintenanceProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </MaintenanceProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;