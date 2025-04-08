import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, Sparkles, AlertTriangle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  stockData?: StockData;
}

interface StockData {
  [symbol: string]: {
    symbol: string;
    price: string;
    change: string;
    change_percent: string;
    volume: string;
    last_refreshed: string;
    exchange: string;
    previous_close: string;
    is_mock?: boolean;
  };
}

interface ApiResponse {
  status: string;
  query: string;
  response: string;
  stock_data?: StockData;
  message?: string;
}

// Function to generate AI response based on query
const fetchFinancialResponse = async (query: string): Promise<{ response: string; stockData?: StockData }> => {
  try {
    const response = await fetch(`http://localhost:5001/api/query?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Unknown error occurred');
    }
    
    return {
      response: data.response,
      stockData: data.stock_data
    };
  } catch (error) {
    console.error('Error fetching response:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch response');
  }
};

// Sample greeting messages
const greetings = [
  "Hi there! I'm BAM AI financial assistant. How can I help you today?",
  "Welcome to BAM AI. Feel free to ask me about Indian stocks, mutual funds, or financial markets.",
  "Hello! I'm here to answer your questions about Indian financial markets. Try asking about stock prices, market trends, or investment strategies."
];

export default function BAMAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with greeting
  useEffect(() => {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setMessages([
      {
        id: "greeting",
        content: randomGreeting,
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  }, []);
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Generate response from API
      const { response, stockData } = await fetchFinancialResponse(input);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
        stockData: stockData
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm having trouble connecting to my financial database. Please check your internet connection and try again. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render stock data
  const renderStockData = (stockData?: StockData) => {
    if (!stockData) return null;
    
    return (
      <div className="mt-4 space-y-2">
        {Object.entries(stockData).map(([symbol, data]) => (
          <div key={symbol} className="bg-muted/50 rounded-lg p-3 border">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">{data.symbol}</span>
                <Badge variant={parseFloat(data.change) >= 0 ? "default" : "destructive"}>
                  {data.exchange}
                </Badge>
                {data.is_mock && (
                  <Badge variant="outline" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Simulated Data
                  </Badge>
                )}
              </div>
              <span className="text-xl font-semibold">₹{parseFloat(data.price).toLocaleString('en-IN')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Change:</span>
                <span className={parseFloat(data.change) >= 0 ? "text-green-500" : "text-red-500"}>
                  {parseFloat(data.change) >= 0 ? '+' : ''}{data.change} ({data.change_percent})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span>{parseInt(data.volume).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prev Close:</span>
                <span>₹{parseFloat(data.previous_close).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>{new Date(data.last_refreshed).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">BAM AI Assistant</h1>
      
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>BAM AI Assistant</span>
          </CardTitle>
          <CardDescription>
            Ask me about Indian stocks, market trends, or financial insights
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-primary" : "bg-muted"}`}>
                      {message.sender === "user" ? (
                        <span className="text-xs">You</span>
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </Avatar>
                    
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.sender === "bot" && message.stockData && renderStockData(message.stockData)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-muted">
                      <Bot className="h-4 w-4" />
                    </Avatar>
                    
                    <div>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex gap-1 items-center">
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse"></div>
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-75"></div>
                          <div className="h-2 w-2 rounded-full bg-foreground/60 animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <Input
              placeholder="Ask about Indian stocks, market trends, investments..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
              {isTyping ? <Loader className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 mr-2" />
        <span>Powered by BAM AI</span>
      </div>
    </div>
  );
} 