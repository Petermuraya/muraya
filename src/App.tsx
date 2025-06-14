
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import SocialMedia from "@/pages/SocialMedia";
import Analytics from "@/pages/Analytics";
import Tasks from "@/pages/Tasks";
import NotFound from "@/pages/NotFound";

import AccessibilityToolbar from "@/components/AccessibilityToolbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AccessibilityProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AdminProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <AccessibilityToolbar />
                  <Toaster />
                  <Sonner />

                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/social" element={<SocialMedia />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </AdminProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
