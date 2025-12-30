import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Aplikasi GolfPredict
 * 
 * Struktur Routing:
 * - "/" : Halaman Prediksi (Index)
 * - "/profil" : Halaman Profil
 * - "*" : Halaman 404 Not Found
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Halaman Prediksi - Form input dan hasil prediksi */}
          <Route path="/" element={<Index />} />
          
          {/* Halaman Profil - Informasi tentang aplikasi dan pembuat */}
          <Route path="/profil" element={<Profil />} />
          
          {/* Catch-all route untuk halaman yang tidak ditemukan */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
