import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Loader } from "@/components/ui/loader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, checkAuth } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // This helps ensure proper mounting and state update sequence
    const timer = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only check auth if we have a token but no user
    const checkAuthentication = async () => {
      const hasToken = !!localStorage.getItem('authToken');
      
      if (hasToken && !user) {
        setChecking(true);
        try {
          await checkAuth();
        } catch (error) {
          console.error("Auth check failed:", error);
        } finally {
          setChecking(false);
        }
      }
    };
    
    if (ready) {
      checkAuthentication();
    }
  }, [user, checkAuth, ready]);

  // Show a loading state briefly while checking authentication
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-12 w-24" />
      </div>
    );
  }

  // Wait for component to be ready
  if (!ready) {
    return null;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return <>{children}</>;
} 