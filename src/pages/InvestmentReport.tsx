import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  age: string;
  income: string;
  riskAppetite: string;
  investmentHorizon: string;
  monthlyInvestment: string;
}

interface InvestmentReport {
  recommendedAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    alternativeInvestments: number;
  };
  projectedReturns: {
    conservative: number;
    moderate: number;
    aggressive: number;
  };
  riskAssessment: string;
  recommendedActions: string[];
}

export default function InvestmentReport() {
  const [profile, setProfile] = useState<UserProfile>({
    age: "",
    income: "",
    riskAppetite: "moderate",
    investmentHorizon: "5-10",
    monthlyInvestment: ""
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<InvestmentReport | null>(null);
  const [activeTab, setActiveTab] = useState("form");
  
  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const generateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock report data
      const mockReport: InvestmentReport = {
        recommendedAllocation: {
          stocks: 60,
          bonds: 30,
          cash: 5,
          alternativeInvestments: 5
        },
        projectedReturns: {
          conservative: 4.2,
          moderate: 6.8,
          aggressive: 9.5
        },
        riskAssessment: "Based on your profile, you have a moderate risk tolerance with a long-term investment horizon. This suggests you can allocate a significant portion to equities while maintaining some fixed income exposure.",
        recommendedActions: [
          "Increase stock allocation to 60% of your portfolio",
          "Focus on diversified index funds to minimize unsystematic risk",
          "Consider dollar-cost averaging with your monthly investment",
          "Review and rebalance your portfolio every 6 months"
        ]
      };
      
      setReport(mockReport);
      setActiveTab("report");
      toast.success("Investment report generated successfully!");
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateReport();
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Investment Report</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="form">Profile Information</TabsTrigger>
          <TabsTrigger value="report" disabled={!report}>Investment Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Your Investment Profile</CardTitle>
              <CardDescription>
                Provide your financial details to generate a personalized investment report.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      type="number" 
                      placeholder="e.g., 35" 
                      value={profile.age}
                      onChange={(e) => handleProfileChange("age", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (₹)</Label>
                    <Input 
                      id="income" 
                      type="number" 
                      placeholder="e.g., 1200000" 
                      value={profile.income}
                      onChange={(e) => handleProfileChange("income", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="riskAppetite">Risk Appetite</Label>
                    <Select
                      value={profile.riskAppetite}
                      onValueChange={(value) => handleProfileChange("riskAppetite", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investmentHorizon">Investment Horizon (years)</Label>
                    <Select
                      value={profile.investmentHorizon}
                      onValueChange={(value) => handleProfileChange("investmentHorizon", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time frame" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-3">Short Term (0-3 years)</SelectItem>
                        <SelectItem value="3-5">Medium Term (3-5 years)</SelectItem>
                        <SelectItem value="5-10">Long Term (5-10 years)</SelectItem>
                        <SelectItem value="10+">Very Long Term (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="monthlyInvestment">Monthly Investment Amount (₹)</Label>
                    <Input 
                      id="monthlyInvestment" 
                      type="number" 
                      placeholder="e.g., 15000" 
                      value={profile.monthlyInvestment}
                      onChange={(e) => handleProfileChange("monthlyInvestment", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader className="mr-2 h-4 w-8" />
                      Generating Report...
                    </>
                  ) : "Generate Investment Report"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report">
          {report ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Asset Allocation</CardTitle>
                  <CardDescription>
                    Based on your risk profile and investment horizon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Stocks</span>
                        <span className="font-medium">{report.recommendedAllocation.stocks}%</span>
                      </div>
                      <Progress value={report.recommendedAllocation.stocks} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Bonds</span>
                        <span className="font-medium">{report.recommendedAllocation.bonds}%</span>
                      </div>
                      <Progress value={report.recommendedAllocation.bonds} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Cash</span>
                        <span className="font-medium">{report.recommendedAllocation.cash}%</span>
                      </div>
                      <Progress value={report.recommendedAllocation.cash} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Alternative Investments</span>
                        <span className="font-medium">{report.recommendedAllocation.alternativeInvestments}%</span>
                      </div>
                      <Progress value={report.recommendedAllocation.alternativeInvestments} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Projected Returns</CardTitle>
                  <CardDescription>
                    Estimated annual returns based on different market scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{report.projectedReturns.conservative}%</div>
                        <p className="text-sm text-muted-foreground mt-2">Conservative</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-green-600">{report.projectedReturns.moderate}%</div>
                        <p className="text-sm text-muted-foreground mt-2">Moderate</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-2xl font-bold text-blue-600">{report.projectedReturns.aggressive}%</div>
                        <p className="text-sm text-muted-foreground mt-2">Aggressive</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{report.riskAssessment}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    {report.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab("form")}>Update Profile</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <Skeleton className="h-[300px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[150px] w-full rounded-lg" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 