import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/contexts/AuthContext";

// Components
const BatmanLogo = () => (
  <img 
    width="50" 
    height="50" 
    src="https://img.icons8.com/ios-filled/50/batman-old.png" 
    alt="batman-logo"
    className="h-12 w-12"
  />
);

const LoginHeader = () => (
  <div className="text-center">
    <div className="flex justify-center">
      <BatmanLogo />
    </div>
    <h2 className="mt-4 text-2xl font-bold">Sign in to BAM</h2>
    <p className="mt-2 text-muted-foreground">
      Enter your credentials to access your account
    </p>
  </div>
);

const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  isLoading, 
  handleLogin 
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  handleLogin: (e: React.FormEvent) => void;
}) => (
  <form className="space-y-6" onSubmit={handleLogin}>
    <div>
      <Label htmlFor="email">Email address</Label>
      <Input 
        id="email" 
        type="email" 
        placeholder="name@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
    </div>
    
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
      <Input 
        id="password" 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
      />
    </div>
    
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Signing in..." : "Sign in"}
    </Button>
  </form>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  // Get the redirect path from location state, default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  // Set ready state after a brief delay to ensure component mounts properly
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login({ email, password });
      toast.success("Login successful!");
      // Redirect to the protected page the user tried to visit
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
    }
  };

  if (!ready) {
    return null; // Return nothing while component initializes
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg border shadow-md">
        <LoginHeader />
        <LoginForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          handleLogin={handleLogin}
        />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link to="/landing">
            Back to homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
