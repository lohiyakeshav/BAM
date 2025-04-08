
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

interface AssetData {
  name: string;
  value: number;
  color: string;
}

const assetData: AssetData[] = [
  { name: "Equity", value: 65, color: "#387ed1" },
  { name: "Debt", value: 20, color: "#6c2bd9" },
  { name: "Gold", value: 10, color: "#f59e0b" },
  { name: "Cash", value: 5, color: "#10b981" },
];

export function AssetAllocation() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#1c1c1c';
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
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
  );
}
