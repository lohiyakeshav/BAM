import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  published_date: string;
  link: string;
  insights?: string;
}

export default function MarketAnalysis() {
  // State for news data
  const [marketNews, setMarketNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:5001/api/news');
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        const data = await response.json();
        setMarketNews(data.data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load market news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      }
    } catch (e) {
      return 'Recently';
    }
  };

  // Sample data - in a real application, this would come from an API
  const marketIndices = [
    { name: "BAM 500", value: 4783.83, change: 1.2, status: "up" },
    { name: "BAM Tech", value: 16879.71, change: 1.7, status: "up" },
    { name: "BAM 100", value: 19354.05, change: -0.3, status: "down" },
    { name: "BAM Small Cap", value: 2245.12, change: 0.5, status: "up" },
    { name: "BAM Global", value: 5672.34, change: -0.8, status: "down" },
  ];

  const topGainers = [
    { symbol: "AAPL", name: "Apple Inc.", change: 2.7, price: 188.63 },
    { symbol: "MSFT", name: "Microsoft Corp.", change: 2.3, price: 410.34 },
    { symbol: "NVDA", name: "NVIDIA Corp.", change: 3.1, price: 824.11 },
    { symbol: "AMZN", name: "Amazon.com Inc.", change: 1.8, price: 178.22 },
    { symbol: "GOOGL", name: "Alphabet Inc.", change: 1.5, price: 153.51 },
  ];

  const topLosers = [
    { symbol: "META", name: "Meta Platforms Inc.", change: -1.7, price: 468.12 },
    { symbol: "TSLA", name: "Tesla Inc.", change: -2.1, price: 175.34 },
    { symbol: "NFLX", name: "Netflix Inc.", change: -0.9, price: 617.52 },
    { symbol: "DIS", name: "Walt Disney Co.", change: -1.3, price: 111.56 },
    { symbol: "INTC", name: "Intel Corp.", change: -3.2, price: 42.31 },
  ];

  const renderNewsContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading market news...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      );
    }

    if (marketNews.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <p>No market news available at the moment.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {marketNews.map((news, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">
                <a 
                  href={news.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {news.title}
                </a>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center text-sm">
                  <span>{news.source}</span>
                  <span className="mx-2">•</span>
                  <span>{formatRelativeTime(news.published_date)}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{news.summary}</p>
              {news.insights && (
                <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <div className="whitespace-pre-line">{news.insights}</div>
                </div>
              )}
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={news.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Market Analysis</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="indices">Indices</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Market Summary
                </CardTitle>
                <CardDescription>Current market trends and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-40 w-full bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization coming soon</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Today's trading activity shows mixed results with technology and healthcare sectors leading gains, while energy and utilities lag behind.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Key Indices
                </CardTitle>
                <CardDescription>Major market indices performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketIndices.map((index, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-medium">{index.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{index.value.toLocaleString()}</span>
                        <div className={`flex items-center ${index.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {index.status === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span className="ml-1">{index.change}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Top Gainers
                </CardTitle>
                <CardDescription>Stocks with highest positive change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topGainers.slice(0, 3).map((stock, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                      </div>
                      <div className="flex items-center text-green-500">
                        <span>${stock.price.toLocaleString()}</span>
                        <span className="ml-2">+{stock.change}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  Top Losers
                </CardTitle>
                <CardDescription>Stocks with highest negative change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topLosers.slice(0, 3).map((stock, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{stock.symbol}</span>
                        <span className="text-sm text-muted-foreground ml-2">{stock.name}</span>
                      </div>
                      <div className="flex items-center text-red-500">
                        <span>${stock.price.toLocaleString()}</span>
                        <span className="ml-2">{stock.change}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Latest Market News
              </CardTitle>
              <CardDescription>Recent developments affecting the markets</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading news...</span>
                </div>
              ) : error ? (
                <p className="text-red-500 p-4">{error}</p>
              ) : marketNews.length > 0 ? (
                <div className="space-y-4">
                  {marketNews.slice(0, 2).map((news, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium">
                        <a 
                          href={news.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {news.title}
                        </a>
                      </h3>
                      <div className="flex text-sm text-muted-foreground mt-1">
                        <span>{news.source}</span>
                        <span className="mx-2">•</span>
                        <span>{formatRelativeTime(news.published_date)}</span>
                      </div>
                      <p className="mt-2 text-sm">{news.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground p-4">No news available at the moment.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Indices Tab */}
        <TabsContent value="indices">
          <Card>
            <CardHeader>
              <CardTitle>Market Indices</CardTitle>
              <CardDescription>Performance of major market indices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 w-full bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Indices chart visualization coming soon</p>
                </div>
                
                <div className="border rounded-lg">
                  <div className="grid grid-cols-3 font-medium p-4 border-b bg-muted">
                    <div>Index</div>
                    <div className="text-right">Value</div>
                    <div className="text-right">Change</div>
                  </div>
                  {marketIndices.map((index, i) => (
                    <div key={i} className="grid grid-cols-3 p-4 border-b last:border-0">
                      <div>{index.name}</div>
                      <div className="text-right">{index.value.toLocaleString()}</div>
                      <div className={`text-right ${index.status === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                        {index.status === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                        {index.status === 'up' ? '+' : ''}{index.change}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Stocks Tab */}
        <TabsContent value="stocks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Top Gainers
                </CardTitle>
                <CardDescription>Stocks with highest positive change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-4 font-medium p-3 border-b bg-muted text-sm">
                    <div>Symbol</div>
                    <div>Company</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Change</div>
                  </div>
                  {topGainers.map((stock, i) => (
                    <div key={i} className="grid grid-cols-4 p-3 border-b last:border-0 text-sm">
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="truncate">{stock.name}</div>
                      <div className="text-right">${stock.price.toLocaleString()}</div>
                      <div className="text-right text-green-500">+{stock.change}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                  Top Losers
                </CardTitle>
                <CardDescription>Stocks with highest negative change</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <div className="grid grid-cols-4 font-medium p-3 border-b bg-muted text-sm">
                    <div>Symbol</div>
                    <div>Company</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Change</div>
                  </div>
                  {topLosers.map((stock, i) => (
                    <div key={i} className="grid grid-cols-4 p-3 border-b last:border-0 text-sm">
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="truncate">{stock.name}</div>
                      <div className="text-right">${stock.price.toLocaleString()}</div>
                      <div className="text-right text-red-500">{stock.change}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Stock Screener</CardTitle>
              <CardDescription>Find stocks based on your criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Stock screener functionality coming soon</p>
                <Button disabled>Launch Stock Screener</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* News Tab */}
        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Market News & Analysis</CardTitle>
              <CardDescription>Latest financial news and expert insights</CardDescription>
            </CardHeader>
            <CardContent>
              {renderNewsContent()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 