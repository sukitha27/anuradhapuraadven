import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";
import ErrorBoundary from './ErrorBoundary';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { SeoDefaults } from '@/components/SeoDefaults';

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
  { path: "/admin/contacts", element: <AdminContacts /> }, // Add this route
];

const AppContent = () => {
  useGoogleAnalytics();
  const { isMaintenanceMode } = useMaintenanceMode();

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <>
      <SeoDefaults />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
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
            <AppContent />
          </MaintenanceProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;