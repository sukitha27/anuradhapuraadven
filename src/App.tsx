import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MaintenanceProvider, useMaintenanceMode } from "./contexts/MaintenanceContext";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Tours from "./pages/Tours";
import Videos from "./pages/Videos";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import AllGallery from "./pages/AllGallery";

const queryClient = new QueryClient();


const AppContent = () => {
  const { isMaintenanceMode } = useMaintenanceMode();

  if (isMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<AllGallery />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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