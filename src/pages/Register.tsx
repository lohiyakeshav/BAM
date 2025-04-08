import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLoading } from "@/lib/LoadingContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  
  // Hide loader if component unmounts
  useEffect(() => {
    return () => hideLoading();
  }, [hideLoading]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    showLoading(); // Show the loader animation
    
    // Simulate registration process
    setTimeout(() => {
      // In a real app, you would register the user with a backend
      if (name && email && password) {
        // Store user info in localStorage (this is just for demo - use a proper auth system in production)
        localStorage.setItem("user", JSON.stringify({ name, email, isLoggedIn: true, isNewUser: true }));
        toast.success("Registration successful! Please complete the onboarding questionnaire.");
        setTimeout(() => {
          hideLoading(); // Ensure loader is hidden before navigation
          navigate("/questionnaire");
        }, 500);
      } else {
        toast.error("Please fill in all fields.");
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
          <h2 className="mt-4 text-2xl font-bold">Create an account</h2>
          <p className="mt-2 text-muted-foreground">
            Join Batman Asset Management today
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
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
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
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
