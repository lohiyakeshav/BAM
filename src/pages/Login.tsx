import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLoading } from "@/lib/LoadingContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  // Hide loader if component unmounts
  useEffect(() => {
    return () => hideLoading();
  }, [hideLoading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    showLoading(); // Show the loader animation
    
    // Simulate authentication process
    setTimeout(() => {
      // In a real app, you would verify credentials with a backend
      if (email && password) {
        // Store user info in localStorage (this is just for demo - use a proper auth system in production)
        localStorage.setItem("user", JSON.stringify({ email, isLoggedIn: true, isNewUser: false }));
        toast.success("Login successful!");
        // We're about to navigate - hide the loader after toast appears
        setTimeout(() => {
          hideLoading(); // Ensure loader is hidden before navigation
          navigate("/");
        }, 500);
      } else {
        toast.error("Invalid credentials. Please try again.");
        hideLoading(); // Hide loader on error
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg border shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Sign in to BAM</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        
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
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
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
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
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
