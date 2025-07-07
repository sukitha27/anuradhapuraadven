import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import TypingIndicator from './chat/TypingIndicator';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "+94701234567"; // Replace with your actual WhatsApp number
  
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
      // Add welcome message when chat opens
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

    // Simulate bot response
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

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          <ChatHeader onWhatsAppRedirect={handleWhatsAppRedirect} />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            onSendMessage={handleSendMessage}
            onWhatsAppRedirect={handleWhatsAppRedirect}
            placeholder="Type your message..."
          />
        </div>
      )}
    </>
  );
};

export default ChatBot;