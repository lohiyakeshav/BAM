import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/contexts/AuthContext";
import { BarChart, PieChart, LineChart, TrendingUp, User, Sparkles, Bot } from "lucide-react";

export function Header() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            <img 
              width="24" 
              height="24" 
              src="https://img.icons8.com/ios-filled/50/batman-old.png" 
              alt="batman-logo"
              className="h-6 w-6"
            />
            <span className="font-bold">BAM</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground"
            >
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/investment-report"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground"
            >
              <PieChart className="h-4 w-4" />
              <span>Investment Report</span>
            </Link>
            <Link
              to="/dashboard/portfolio"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground"
            >
              <Bot className="h-4 w-4" />
              <span>BAM AI</span>
            </Link>
            <Link
              to="/dashboard/market-analysis"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Market Analysis</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1.5" asChild>
              <Link to="/dashboard/profile">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-block">
                  {user?.name || 'Profile'}
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </nav>
        </div>
      </div>
      <div className="md:hidden border-t py-2">
        <nav className="container flex justify-between items-center">
          <Link
            to="/dashboard"
            className="flex flex-col items-center text-xs"
          >
            <BarChart className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/dashboard/investment-report"
            className="flex flex-col items-center text-xs"
          >
            <PieChart className="h-5 w-5" />
            <span>Reports</span>
          </Link>
          <Link
            to="/dashboard/portfolio"
            className="flex flex-col items-center text-xs"
          >
            <Bot className="h-5 w-5" />
            <span>BAM AI</span>
          </Link>
          <Link
            to="/dashboard/market-analysis"
            className="flex flex-col items-center text-xs"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Markets</span>
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex flex-col items-center text-xs"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
