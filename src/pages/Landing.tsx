import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <img 
            width="30" 
            height="30" 
            src="https://img.icons8.com/ios-filled/50/batman-old.png" 
            alt="batman-logo"
            className="h-8 w-8"
          />
          <span className="font-bold text-xl">Batman Asset Management</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Strategic <span className="text-primary">Wealth Management</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Batman Asset Management (BAM) delivers sophisticated investment solutions, 
            personalized wealth management, and data-driven financial planning.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Batman Asset Management. All rights reserved.</p>
      </footer>
    </div>
  );
}
