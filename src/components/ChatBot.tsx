import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import TypingIndicator from './chat/TypingIndicator';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ModernChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+94701234567";
  
  const botResponses = {
    welcome: "Hello! I'm here to help you with Anuradhapura Adventures. How can I assist you today?",
    tours: "We offer amazing tours including ancient city exploration, temple visits, and cultural experiences. Would you like to know more about specific tours?",
    restaurant: "Our restaurant serves authentic Sri Lankan cuisine with traditional recipes. Would you like to see our menu or make a reservation?",
    homestay: "Our homestay offers comfortable accommodation with local families. You'll experience authentic Sri Lankan hospitality. Interested in booking?",
    cookery: "Learn traditional Sri Lankan cooking with our hands-on classes led by local experts. Would you like to book a cooking class?",
    contact: "You can reach us at +94 70 123 4567 or connect via WhatsApp for immediate assistance. Would you like me to connect you to WhatsApp?",
    default: "I'd be happy to help! You can ask me about tours, restaurant, homestay, cookery classes, or contact information. For immediate assistance, I can connect you to our WhatsApp support."
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
    }, 1000);
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
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-500 transform hover:scale-110 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[500px] backdrop-blur-xl bg-background/80 border border-border/50 rounded-2xl shadow-2xl z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">Anuradhapura Adventures</h3>
              <p className="text-sm opacity-90">AI Assistant • Online</p>
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="bg-background/20 hover:bg-background/30 p-2 rounded-full transition-colors"
              title="Connect to WhatsApp"
            >
              <Phone size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    message.isBot
                      ? 'bg-muted/80 text-muted-foreground rounded-bl-md'
                      : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted/80 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground p-2 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={handleWhatsAppRedirect}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center space-x-1"
              >
                <span>📱</span>
                <span>Connect to WhatsApp for Live Support</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModernChatBot;