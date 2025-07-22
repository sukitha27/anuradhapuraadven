import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";
import Contact from "./pages/Contact";

// Page imports
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Tours from "./pages/Tours";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import AllGallery from "./pages/AllGallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

// Enhanced route configuration with additional metadata
const routes = [
  { 
    path: "/", 
    element: <Index />,
    isIndex: true
  },
  { 
    path: "/reviews", 
    element: <Reviews />,
    navItem: { name: "Reviews", href: "/reviews", isHash: false }
  },
  { 
    path: "/contact", 
    element: <Contact />,
    navItem: { name: "Contact", href: "/contact", isHash: false }
  },
  { 
    path: "/tours", 
    element: <Tours />,
    navItem: { name: "Tours", href: "#tours", isHash: true }
  },
  { 
    path: "/videos", 
    element: <Videos />,
    navItem: { name: "Videos", href: "/videos", isHash: false }
  },
  { 
    path: "/gallery", 
    element: <AllGallery />,
    navItem: { name: "Gallery", href: "/gallery", isHash: false }
  },
  { 
    path: "/privacy-policy", 
    element: <PrivacyPolicy />,
    showInNav: false
  },
  { 
    path: "/terms-of-service", 
    element: <TermsOfService />,
    showInNav: false
  },
  { 
    path: "/sitemap", 
    element: <Sitemap />,
    showInNav: false
  },
];

// Export navigation items for use in Navigation component
export const navItems = routes
  .filter(route => route.navItem || route.isIndex)
  .map(route => route.isIndex ? 
    { name: "Home", href: "/", isHash: false } : 
    route.navItem
  );

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