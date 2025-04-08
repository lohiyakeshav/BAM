
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, Mail, Phone, MapPin, Briefcase, CircleDollarSign } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    bio: "",
    financialGoals: [] as string[],
    riskAppetite: "",
    monthlyIncome: "",
    monthlySavings: "",
    currentInvestments: [] as string[]
  });
  
  // Form state for editing
  const [formData, setFormData] = useState({ ...userData });
  
  // Load user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const questionnaire = user.questionnaire || {};
    
    // If no user data, redirect to login
    if (!user.isLoggedIn) {
      navigate("/login");
      return;
    }
    
    setUserData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: questionnaire.cityOfResidence || "",
      occupation: questionnaire.occupation || "",
      bio: user.bio || "",
      financialGoals: questionnaire.financialGoals || [],
      riskAppetite: questionnaire.riskAppetite || "",
      monthlyIncome: questionnaire.monthlyIncome || "",
      monthlySavings: questionnaire.monthlySavings || "",
      currentInvestments: questionnaire.currentInvestments || []
    });
    
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: questionnaire.cityOfResidence || "",
      occupation: questionnaire.occupation || "",
      bio: user.bio || "",
      financialGoals: questionnaire.financialGoals || [],
      riskAppetite: questionnaire.riskAppetite || "",
      monthlyIncome: questionnaire.monthlyIncome || "",
      monthlySavings: questionnaire.monthlySavings || "",
      currentInvestments: questionnaire.currentInvestments || []
    });
  }, [navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSave = () => {
    // Save updated profile data
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio
    };
    
    // Update questionnaire data if it exists
    if (user.questionnaire) {
      updatedUser.questionnaire = {
        ...user.questionnaire,
        occupation: formData.occupation,
        cityOfResidence: formData.address
      };
    }
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUserData({ ...formData });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };
  
  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  // Helper function to format financial goals
  const formatFinancialGoals = (goals: string[]) => {
    const goalMap: { [key: string]: string } = {
      house: "Buying a house",
      retirement: "Retirement planning",
      education: "Child's education",
      wealth: "Wealth growth",
      emergency: "Emergency fund",
      travel: "Vacation/Travel",
      other: "Other"
    };
    
    return goals.map(goal => goalMap[goal] || goal).join(", ");
  };
  
  // Helper function to format investments
  const formatInvestments = (investments: string[]) => {
    const investmentMap: { [key: string]: string } = {
      fd: "Fixed Deposits",
      mf: "Mutual Funds",
      stocks: "Stocks",
      gold: "Gold",
      realestate: "Real Estate",
      crypto: "Crypto",
      ppf: "PPF",
      none: "Not investing yet"
    };
    
    return investments.map(inv => investmentMap[inv] || inv).join(", ");
  };
  
  // Helper function to format risk appetite
  const formatRiskAppetite = (risk: string) => {
    const riskMap: { [key: string]: string } = {
      low: "Low (Prefer capital protection)",
      medium: "Medium (Balanced growth & safety)",
      high: "High (Aggressive growth, okay with market fluctuations)"
    };
    
    return riskMap[risk] || risk;
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">User Profile</h1>
      
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="financial">Financial Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">City/Location</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <UserRound className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Full Name</p>
                      <p className="font-medium">{userData.name || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Email Address</p>
                      <p className="font-medium">{userData.email || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Phone Number</p>
                      <p className="font-medium">{userData.phone || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Location</p>
                      <p className="font-medium">{userData.address || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="bg-primary/10 p-3 rounded-full w-fit">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Occupation</p>
                      <p className="font-medium">{userData.occupation || "Not provided"}</p>
                    </div>
                  </div>
                  
                  {userData.bio && (
                    <div className="border-t pt-4 mt-4">
                      <p className="text-muted-foreground text-sm mb-2">About Me</p>
                      <p>{userData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Profile</CardTitle>
              <CardDescription>Your financial information from the questionnaire</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userData.financialGoals.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Financial Goals</p>
                    <p className="font-medium">{formatFinancialGoals(userData.financialGoals)}</p>
                  </div>
                )}
                
                {userData.riskAppetite && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Risk Appetite</p>
                    <p className="font-medium">{formatRiskAppetite(userData.riskAppetite)}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userData.monthlyIncome && (
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <CircleDollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Monthly Income</p>
                        <p className="font-medium">₹{userData.monthlyIncome}</p>
                      </div>
                    </div>
                  )}
                  
                  {userData.monthlySavings && (
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <CircleDollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Monthly Savings</p>
                        <p className="font-medium">₹{userData.monthlySavings}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {userData.currentInvestments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Current Investments</p>
                    <p className="font-medium">{formatInvestments(userData.currentInvestments)}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/questionnaire")}>Update Questionnaire</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
