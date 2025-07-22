import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";

// Page imports
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import Tours from "./pages/Tours";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import AllGallery from "./pages/AllGallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const routes = [
  { path: "/", element: <Index /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/contact", element: <Contact /> },
  { path: "/tours", element: <Tours /> },
  { path: "/videos", element: <Videos /> },
  { path: "/gallery", element: <AllGallery /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/sitemap", element: <Sitemap /> },
];

const AppRoutes = () => {
  const { isMaintenanceMode } = useMaintenanceMode();

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <Routes>
      {routes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <MaintenanceProvider>
          <AppRoutes />
        </MaintenanceProvider>
      </BrowserRouter>
      <Toaster />
      <Sonner position="top-right" />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;