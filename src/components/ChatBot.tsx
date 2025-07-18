import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Maximize2, Minimize2, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

const InteractiveChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+94701234567";
  
  const quickReplyOptions = [
    "Tours & Packages",
    "Restaurant Menu", 
    "Homestay Booking",
    "Cooking Classes",
    "Contact Info"
  ];

  const intelligentResponses = {
    welcome: {
      text: "Welcome to Anuradhapura Adventures! I'm your AI travel assistant. I can help you discover amazing experiences in the ancient city of Anuradhapura.",
      quickReplies: quickReplyOptions
    },
    tours: {
      text: "Discover our signature experiences:\n\n• Ancient City Heritage Walk (3 hours)\n• Sacred Temple Circuit (Full day)\n• Bicycle Adventure Tour (Half day)\n• Wildlife Safari at Wilpattu (Full day)\n\nWhich adventure calls to you?",
      quickReplies: ["Check Availability", "View Pricing", "See Photos", "Book Now"]
    },
    restaurant: {
      text: "Taste authentic Sri Lankan flavors!\n\n• Traditional rice & curry spreads\n• Fresh seafood specialties\n• Vegetarian & vegan options\n• Traditional hoppers & kottu\n\nOur chef uses recipes passed down through generations!",
      quickReplies: ["Full Menu", "Opening Hours", "Make Reservation", "Dietary Options"]
    },
    homestay: {
      text: "Experience authentic Sri Lankan hospitality!\n\n• Stay with welcoming local families\n• Comfortable private rooms with AC\n• Home-cooked traditional meals\n• Cultural immersion activities\n\nAvailable from $25/night including breakfast!",
      quickReplies: ["Check Dates", "See Rooms", "Meet Families", "Book Stay"]
    },
    cookery: {
      text: "Master Sri Lankan cuisine with our expert chefs!\n\n• Traditional spice blending techniques\n• Authentic curry preparation\n• Coconut-based cooking methods\n• Take recipes home with you\n\n3-hour classes starting at $30/person",
      quickReplies: ["Available Times", "Group Bookings", "Spice Levels", "What You'll Learn"]
    },
    contact: {
      text: "Ready to connect? Here's how:\n\n• Phone: +94 70 123 4567\n• WhatsApp: Available 24/7\n• Email: info@anuradhapura-adventures.com\n• Location: Anuradhapura Ancient City\n\nShall I connect you via WhatsApp for instant support?",
      quickReplies: ["WhatsApp Now", "Send Email", "Get Directions", "Business Hours"]
    },
    default: {
      text: "I'm here to help you explore Anuradhapura!\n\nI can assist with tours, dining, accommodation, cooking classes, or any questions about our beautiful ancient city. What interests you most?",
      quickReplies: quickReplyOptions
    }
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
        text: intelligentResponses.welcome.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: intelligentResponses.welcome.quickReplies
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      const response = getIntelligentResponse(messageText.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: response.quickReplies
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickReplies(true);
    }, 1200);
  };

  const getIntelligentResponse = (input: string) => {
    if (input.includes('tour')) {
      return intelligentResponses.tours;
    } else if (input.includes('restaurant') || input.includes('food')) {
      return intelligentResponses.restaurant;
    } else if (input.includes('homestay')) {
      return intelligentResponses.homestay;
    } else if (input.includes('cookery') || input.includes('cooking')) {
      return intelligentResponses.cookery;
    } else if (input.includes('contact') || input.includes('phone')) {
      return intelligentResponses.contact;
    } else {
      return intelligentResponses.default;
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello! I'm interested in Anuradhapura Adventures. Can you help me?");
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatWidth = isExpanded ? 'w-full max-w-2xl' : 'w-80 sm:w-96';
  const chatHeight = isExpanded ? 'h-[80vh]' : 'h-[32rem] sm:h-[36rem]';

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-xl transition-all duration-500 transform hover:scale-110 group ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600 rotate-90' 
              : 'bg-gradient-to-br from-primary to-primary/80 hover:shadow-primary/25'
          }`}
        >
          {isOpen ? (
            <X size={24} className="text-white absolute inset-0 m-auto" />
          ) : (
            <>
              <MessageCircle size={24} className="text-white absolute inset-0 m-auto" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles size={12} className="text-white animate-pulse" />
              </div>
            </>
          )}
        </button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className={`fixed ${isExpanded ? 'inset-4' : 'bottom-24 left-4'} ${chatWidth} ${chatHeight} bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Smart Travel Assistant</h3>
                <p className="text-xs text-white/80 flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  AI-powered • Always learning
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                title="WhatsApp Support"
              >
                <Phone size={16} className="text-white" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={16} className="text-white" /> : <Maximize2 size={16} className="text-white" />}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] group ${message.isBot ? 'flex items-start space-x-3' : ''}`}>
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`space-y-2 ${message.isBot ? '' : 'flex flex-col items-end'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        message.isBot
                          ? 'bg-muted text-foreground rounded-bl-md shadow-sm'
                          : 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md shadow-md'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    {!message.isBot && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <User size={12} />
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                    {message.isBot && message.timestamp && (
                      <p className="text-xs text-muted-foreground px-4">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {showQuickReplies && messages.length > 0 && messages[messages.length - 1].isBot && messages[messages.length - 1].quickReplies && (
              <div className="flex flex-wrap gap-2 mt-3 px-11">
                {messages[messages.length - 1].quickReplies?.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-card/50">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... "
                  className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground text-sm resize-none min-h-[44px] max-h-24"
                  rows={1}
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="w-11 h-11 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:from-muted disabled:to-muted disabled:text-muted-foreground text-primary-foreground rounded-2xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={handleWhatsAppRedirect}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center space-x-1"
              >
                <Phone size={12} />
                <span>Need instant help? Connect via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveChatBot;