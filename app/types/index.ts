export interface TradingPair {
  symbol: string;
  name: string;
  description?: string;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
}

export interface AnalysisResult {
  symbol: string;
  timeframe: string;
  technicalSignals: TechnicalIndicator[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  prediction: string;
  analysis: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
}

export interface UserCredits {
  remaining: number;
  total: number;
  subscriptionStatus: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WebSocketMessage {
  type: 'market_update' | 'analysis_complete' | 'error';
  data: Record<string, unknown>;
}
