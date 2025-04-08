import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { LoadingProvider } from "./lib/LoadingContext";
import { AuthProvider } from "./lib/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestmentReport from "./pages/InvestmentReport";
import { Dashboard } from "./components/dashboard/Dashboard";
import Landing from "./pages/Landing";
import MarketAnalysis from "./pages/MarketAnalysis";
import BAMAI from "./pages/BAMAI";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/PublicRoute';

// Placeholder components for new routes
const ProfilePage = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-8">User Profile</h1>
    <p className="text-muted-foreground">This page is under construction. Your profile information will be displayed here.</p>
  </div>
);

const queryClient = new QueryClient();

// Layout wrapper for dashboard pages with header
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 p-6">
      {children}
    </main>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LoadingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Navigate to="/landing" replace />} />
                  <Route path="/landing" element={<Landing />} />
                  
                  {/* Auth Routes */}
                  <Route 
                    path="/auth/login" 
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    } 
                  />
                  <Route 
                    path="/auth/register" 
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    } 
                  />
                  
                  {/* Legacy Routes - Redirect to new paths */}
                  <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                  <Route path="/register" element={<Navigate to="/auth/register" replace />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/investment-report" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <InvestmentReport />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/portfolio" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <BAMAI />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/market-analysis" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <MarketAnalysis />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/profile" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <ProfilePage />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Legacy Route - Redirect to new path */}
                  <Route path="/investment-report" element={<Navigate to="/dashboard/investment-report" replace />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/landing" replace />} />
                </Routes>
              </Router>
            </TooltipProvider>
          </LoadingProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
