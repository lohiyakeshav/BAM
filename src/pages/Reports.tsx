
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

// Mock data for the reports page
const monthlyReturnsData = [
  { month: 'Jan', returns: 3.2 },
  { month: 'Feb', returns: -1.5 },
  { month: 'Mar', returns: 2.8 },
  { month: 'Apr', returns: 1.4 },
  { month: 'May', returns: -0.8 },
  { month: 'Jun', returns: 4.2 },
  { month: 'Jul', returns: 3.5 },
  { month: 'Aug', returns: 1.2 },
  { month: 'Sep', returns: -2.1 },
  { month: 'Oct', returns: 3.9 },
  { month: 'Nov', returns: 2.7 },
  { month: 'Dec', returns: 1.5 },
];

const sectorAllocationData = [
  { name: 'Financial Services', value: 30, color: '#387ed1' },
  { name: 'Technology', value: 25, color: '#6c2bd9' },
  { name: 'Consumer Goods', value: 15, color: '#f59e0b' },
  { name: 'Healthcare', value: 12, color: '#10b981' },
  { name: 'Energy', value: 10, color: '#ef4444' },
  { name: 'Others', value: 8, color: '#8b5cf6' }
];

// Custom bar component to render different colors based on value
const CustomBar = (props: any) => {
  const { x, y, width, height, returns } = props;
  const fill = returns >= 0 ? "#10b981" : "#ef4444";
  
  // Fix: Changed radius from array to string format
  return <rect x={x} y={y} width={width} height={height} fill={fill} radius="4" />;
};

const Reports = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#1c1c1c';
  const gridColor = theme === 'dark' ? '#2a2e35' : '#e6e6e6';
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Investment Reports</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Monthly Returns</CardTitle>
            <CardDescription>Performance tracked across all months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturnsData}>
                  <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke={textColor} 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                  />
                  <YAxis 
                    stroke={textColor} 
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: gridColor }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
                      borderColor: gridColor,
                      color: textColor
                    }}
                    formatter={(value) => [`${value}%`, 'Returns']}
                  />
                  <Bar 
                    dataKey="returns" 
                    fill="#387ed1" 
                    radius={[4, 4, 0, 0]}
                    shape={<CustomBar />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Breakdown of investments by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    formatter={(value) => <span style={{color: textColor}}>{value}</span>}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
                      borderColor: theme === 'dark' ? '#2a2e35' : '#e6e6e6',
                      color: textColor,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle>Annual Performance Report</CardTitle>
            <CardDescription>Year-to-date portfolio performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-muted-foreground text-sm">Total Returns</div>
                <div className="text-2xl font-bold text-green-500">+18.67%</div>
                <div className="text-xs text-muted-foreground">vs. Benchmark: +12.45%</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-muted-foreground text-sm">Risk (Volatility)</div>
                <div className="text-2xl font-bold">14.32%</div>
                <div className="text-xs text-muted-foreground">Medium Risk Profile</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-muted-foreground text-sm">Sharpe Ratio</div>
                <div className="text-2xl font-bold">1.24</div>
                <div className="text-xs text-muted-foreground">Above Average</div>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Key Insights</h4>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Your portfolio outperformed the benchmark by 6.22%</li>
                <li>Tech stocks were the biggest contributors to performance</li>
                <li>Diversification has reduced your overall risk exposure</li>
                <li>Consider rebalancing your sector allocation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
