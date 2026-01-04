'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatProps {
  symbol: string;
}

export default function Chat({ symbol }: ChatProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || !session) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          query: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get analysis');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.analysis || 'Analysis complete. Check the prediction card for details.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          AI Trading Chat
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ask questions about {symbol} or request analysis
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Bot className="mx-auto h-12 w-12 text-zinc-400" />
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Start a conversation about {symbol}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`mt-1 text-xs ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                  <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                  <span className="text-sm text-zinc-500">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              session ? `Ask about ${symbol}...` : 'Please sign in to chat'
            }
            disabled={!session || loading}
            className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading || !session}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
