import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const MinimalChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+94701234567";
  
  const botResponses = {
    welcome: "Hi there! 👋 I'm your Anuradhapura Adventures assistant. What would you like to explore?",
    tours: "🗿 Our signature tours: Ancient City Walk, Temple Circuit, Bicycle Adventures, and Wildlife Safari. Which interests you?",
    restaurant: "🍛 Authentic Sri Lankan cuisine awaits! Traditional curries, fresh seafood, and vegetarian delights. Want to see our menu?",
    homestay: "🏠 Stay with local families and experience true Sri Lankan hospitality. Comfortable rooms, home-cooked meals included!",
    cookery: "👩‍🍳 Learn to cook authentic Sri Lankan dishes! Hands-on classes with local chefs. Spice blending, curry making & more.",
    contact: "📞 Call us: +94 70 123 4567 | WhatsApp available 24/7 for instant support. Shall I connect you?",
    default: "I can help with tours, dining, accommodation, cooking classes, or contact info. What would you like to know? 😊"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        text: botResponses.welcome,
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputText.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const getBotResponse = (input: string): string => {
    if (input.includes('tour')) {
      return botResponses.tours;
    } else if (input.includes('restaurant') || input.includes('food')) {
      return botResponses.restaurant;
    } else if (input.includes('homestay')) {
      return botResponses.homestay;
    } else if (input.includes('cookery') || input.includes('cooking')) {
      return botResponses.cookery;
    } else if (input.includes('contact') || input.includes('phone')) {
      return botResponses.contact;
    } else {
      return botResponses.default;
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello! I'm interested in Anuradhapura Adventures services. Can you help me?");
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 bg-card border-2 border-primary/20 hover:border-primary/40 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center group hover:scale-105 ${
            isOpen ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-primary/5'
          }`}
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 w-80 h-[32rem] bg-card border border-border rounded-3xl shadow-xl z-50 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-card border-b border-border p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">Adventure Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  Online now
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <Phone size={14} className="text-muted-foreground" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
              >
                <Minimize2 size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[75%] group ${message.isBot ? 'flex items-start space-x-2' : ''}`}>
                  {message.isBot && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <MessageCircle size={12} className="text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      message.isBot
                        ? 'bg-muted text-foreground rounded-bl-md'
                        : 'bg-primary text-primary-foreground rounded-br-md'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <MessageCircle size={12} className="text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-3 bg-muted border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-2xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 text-center">
              <button
                onClick={handleWhatsAppRedirect}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Need instant help? Connect via WhatsApp →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MinimalChatBot;