import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
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

const RegisterHeader = () => (
  <div className="text-center">
    <div className="flex justify-center">
      <BatmanLogo />
    </div>
    <h2 className="mt-4 text-2xl font-bold">Create your account</h2>
    <p className="mt-2 text-muted-foreground">
      Enter your details to get started with BAM
    </p>
  </div>
);

const RegisterForm = ({ 
  name,
  setName,
  email, 
  setEmail, 
  password, 
  setPassword, 
  isLoading, 
  handleRegister 
}: {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  handleRegister: (e: React.FormEvent) => void;
}) => (
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
        minLength={8}
      />
      <p className="text-sm text-muted-foreground mt-1">
        Password must be at least 8 characters long
      </p>
    </div>
    
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading ? "Creating account..." : "Create account"}
    </Button>
  </form>
);

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  // Set ready state after a brief delay to ensure component mounts properly
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register({ name, email, password });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
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
        <RegisterHeader />
        <RegisterForm 
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          handleRegister={handleRegister}
        />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
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
