import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { LoadingProvider } from "./lib/LoadingContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questionnaire from "./pages/Questionnaire";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import Portfolio from "./pages/Portfolio";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAuthenticated(user.isLoggedIn === true);
    setLoading(false);
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    return isAuthenticated ? <>{children}</> : <Navigate to="/landing" replace />;
  };

  // Auth route component (redirects to dashboard if logged in)
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
                
                {/* Protected Routes with Header */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Index />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Reports />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Portfolio />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/insights" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Insights />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-1">
                        <Profile />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                
                {/* Questionnaire (Protected, but no header) */}
                <Route path="/questionnaire" element={
                  <ProtectedRoute>
                    <Questionnaire />
                  </ProtectedRoute>
                } />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
