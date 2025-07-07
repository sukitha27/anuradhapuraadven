import React from 'react';
import { Phone } from 'lucide-react';

interface ChatHeaderProps {
  onWhatsAppRedirect: () => void;
}

const ChatHeader = ({ onWhatsAppRedirect }: ChatHeaderProps) => {
  return (
    <div className="bg-emerald-500 text-white p-4 rounded-t-lg flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Anuradhapura Adventures</h3>
        <p className="text-sm opacity-90">Customer Support</p>
      </div>
      <button
        onClick={onWhatsAppRedirect}
        className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
        title="Connect to WhatsApp"
      >
        <Phone size={16} />
      </button>
    </div>
  );
};

export default ChatHeader;