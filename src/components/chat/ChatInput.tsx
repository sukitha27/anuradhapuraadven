import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  onWhatsAppRedirect: () => void;
  placeholder: string;
}

const ChatInput = ({ 
  inputText, 
  setInputText, 
  onSendMessage, 
  onWhatsAppRedirect, 
  placeholder 
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={onSendMessage}
          disabled={!inputText.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
      <div className="mt-2 text-center">
        <button
          onClick={onWhatsAppRedirect}
          className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
        >
          📱 Connect to WhatsApp for Live Support
        </button>
      </div>
    </div>
  );
};

export default ChatInput;