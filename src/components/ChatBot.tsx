import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import avatar from "/images/avatar/agent.jpg"; // replace with your logo/avatar

const ChatBot: React.FC = () => {
  const [online, setOnline] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState(true);

  React.useEffect(() => {
    const ping = () =>
      fetch("/api/status") // returns {online:boolean}
        .then((r) => r.json())
        .then((json) => setOnline(json.online))
        .catch(() => setOnline(false));
    ping();
    const id = setInterval(ping, 60_000); // every minute
    return () => clearInterval(id);
  }, []);

  return (
    <FloatingWhatsApp
    buttonClassName="focus-visible:ring-2 focus-visible:ring-green-400"
  chatboxClassName="focus-within:outline-none"
    statusMessage={online ? "Online" : "Replies within 24 h"}
      phoneNumber="94701306430" // Your WhatsApp number
      accountName="Anuradhapura Homestay"
      avatar={avatar}
      placeholder="Type your message..."
      allowEsc
      allowClickAway
      notification
      notificationSound
      darkMode={true} // true = WhatsApp dark mode look
      chatMessage={
        showIntro
          ? "Hi 👋 Thanks for visiting Anuradhapura Homestay! How can we help you today?"
          : "Hi again! Anything else we can do for you?"
      }
      onClick={() => {
        /* reset greeting after first open */
        setTimeout(() => setShowIntro(false), 3000);
      }}
      
    />
  );
};

export default ChatBot;
