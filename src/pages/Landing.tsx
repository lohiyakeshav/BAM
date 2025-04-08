import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Shield, TrendingUp, User, PieChart, Briefcase, LineChart } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">Batman Asset Management</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-6 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Strategic <span className="text-primary">Wealth Management</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Batman Asset Management (BAM) delivers sophisticated investment solutions, personalized wealth management, and data-driven financial planning tailored to your unique goals.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Our Services</a>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md p-6 bg-card rounded-lg border shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl">Portfolio Performance</h3>
              <LineChart className="h-8 w-8 text-primary" />
            </div>
            <div className="h-48 bg-muted rounded-md mb-4 flex items-center justify-center">
              <PieChart className="h-32 w-32 text-primary/40" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Return</span>
                <span className="font-medium text-primary">+21.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BAM Index</span>
                <span className="font-medium">+24.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Average</span>
                <span className="font-medium text-muted-foreground">+13.2%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-muted py-12 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            BAM provides a comprehensive suite of financial services designed to protect, grow, and optimize your wealth in any market condition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm transition hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Investment Management</h3>
              <p className="text-muted-foreground">
                Our data-driven strategies encompass equity, fixed income, and alternative investments tailored to your risk profile and goals.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm transition hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Wealth Planning</h3>
              <p className="text-muted-foreground">
                Comprehensive financial planning that addresses retirement, estate planning, tax optimization, and intergenerational wealth transfer.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm transition hover:shadow-md">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Risk Management</h3>
              <p className="text-muted-foreground">
                Protect your assets with advanced risk analysis, diversification strategies, and portfolio hedging techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Statistics */}
      <section className="container mx-auto px-6 py-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">₹25B+</div>
            <div className="text-muted-foreground">Assets Under Management</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">High-Net-Worth Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">Years of Excellence</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">97%</div>
            <div className="text-muted-foreground">Client Retention Rate</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <p className="italic mb-4">
                "BAM's systematic approach to wealth management has consistently delivered outstanding results. Their team of professionals understands the unique needs of high-net-worth individuals and institutions."
              </p>
              <div className="font-semibold">- Bruce Wayne, CEO & Philanthropist</div>
            </div>
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <p className="italic mb-4">
                "Working with Batman Asset Management transformed my retirement planning and investment strategy. Their data-driven approach and personalized service are exceptional."
              </p>
              <div className="font-semibold">- Lucius Fox, Finance Executive</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Financial Strategy?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Join BAM today and experience the difference that strategic wealth management can make for your financial future.
        </p>
        <Button size="lg" asChild>
          <Link to="/register">Create Your Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Batman Asset Management</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Securing and growing your wealth with precision, integrity, and innovation.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Leadership</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Wealth Management</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Financial Planning</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Investment Advisory</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-primary">Disclosures</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Batman Asset Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
