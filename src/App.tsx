
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useState, useEffect } from "react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import VoiceChatbot from "@/components/VoiceChatbot";
import FastPageLoader from "@/components/loading/FastPageLoader";
import SkeletonLoader from "@/components/loading/SkeletonLoader";
import { useServiceWorker, usePerformanceMonitoring } from "@/hooks/usePerformance";
import useRevealOnScroll from '@/hooks/useRevealOnScroll';

// Lazy load pages for code splitting
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const Admin = lazy(() => import("@/pages/Admin"));
const PasswordResetConfirm = lazy(() => import("@/components/PasswordResetConfirm"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

const AppRoutes = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [location]);

  return (
    <>
      <FastPageLoader isLoading={isNavigating} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<SkeletonLoader type="full-page" />}>
              <Index />
            </Suspense>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<SkeletonLoader type="full-page" />}>
              <About />
            </Suspense>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <Suspense fallback={<SkeletonLoader type="card" count={6} />}>
              <Projects />
            </Suspense>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <Suspense fallback={<SkeletonLoader type="card" count={6} />}>
              <Blog />
            </Suspense>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Suspense fallback={<SkeletonLoader type="text" />}>
              <Contact />
            </Suspense>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<SkeletonLoader type="full-page" />}>
              <Admin />
            </Suspense>
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            <Suspense fallback={<SkeletonLoader type="full-page" />}>
              <PasswordResetConfirm />
            </Suspense>
          } 
        />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<SkeletonLoader type="text" />}>
              <NotFound />
            </Suspense>
          } 
        />
      </Routes>
    </>
  );
};

const App = () => {
  // Initialize performance monitoring and service worker
  useServiceWorker();
  usePerformanceMonitoring();
  // Initialize global reveal-on-scroll observer
  useRevealOnScroll();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AccessibilityProvider>
          <ThemeProvider>
            <LanguageProvider>
              <AdminProvider>
                <TooltipProvider>
                  <BrowserRouter>
                    <AccessibilityToolbar />
                    <VoiceChatbot />
                    <Toaster />
                    <Sonner />
                    <AppRoutes />
                  </BrowserRouter>
                </TooltipProvider>
              </AdminProvider>
            </LanguageProvider>
          </ThemeProvider>
        </AccessibilityProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
