
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import NotFound from "./pages/NotFound";
import BecomeProvider from "./pages/BecomeProvider";
import RecoverPassword from "./pages/RecoverPassword";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import ChamberFormPage from "./pages/ChamberFormPage";
import LoginRequiredPage from "./pages/LoginRequiredPage";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recuperar-password" element={<RecoverPassword />} />
              <Route path="/profesional/:id" element={<ProfessionalDetail />} />
              <Route path="/ser-chamber" element={<BecomeProvider />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/crear-chamber" element={<ChamberFormPage />} />
              <Route path="/login-required" element={<LoginRequiredPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
