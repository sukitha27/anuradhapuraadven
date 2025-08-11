import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";
import Contact from "./pages/Contact";

// Page imports
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Tours from "./pages/Tours";
import AboutUs from './pages/AboutUs';
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import AllGallery from "./pages/AllGallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import AdminContacts from "./pages/admin/ContactsDashboard"; // Add this import
import path from "path";

const queryClient = new QueryClient();

// Route configuration - consistent format using objects
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
  const { isMaintenanceMode } = useMaintenanceMode();

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={route.element} 
          />
        ))}
        {/* Catch-all route should be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MaintenanceProvider>
        <AppContent />
      </MaintenanceProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App; 