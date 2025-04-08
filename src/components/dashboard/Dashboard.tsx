
import { StockChart } from './StockChart';
import { PortfolioSummary } from './PortfolioSummary';
import { TopHoldings } from './TopHoldings';
import { AssetAllocation } from './AssetAllocation';
import { RecentTransactions } from './RecentTransactions';

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Wealth Dashboard</h1>
      <div className="space-y-6">
        <PortfolioSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockChart />
          <AssetAllocation />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopHoldings />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}
