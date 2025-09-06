/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, ChangeEvent, FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import "../Styles/MessagesPage2.css";

// Sample user data
const sampleUser = {
  id: 1,
  name: "Ronald Richards",
  avatar: "https://i.pravatar.cc/48?img=12",
};

// Message type
interface Message {
  id: number;
  text: string;
  type: "sent" | "received";
}

const MessagesPage2: FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How are you?", type: "received" },
    { id: 2, text: "Hi! I’m good, thank you.", type: "sent" },
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      type: "sent",
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="profile-chat-page">
      <Header2 />

      <div className="profile-chat-body">
        <ProfileSidebar />

        <div className="chat-section">
          <h2>Messages</h2>

          {/* Chat Header */}
          <div className="chat-header">
            <FaArrowLeft
              className="chat-back-icon"
              onClick={() => navigate("/profile5")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={sampleUser.avatar}
              alt={sampleUser.name}
              className="chat-profile-img"
            />
            <span className="chat-user-name">{sampleUser.name}</span>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Input */}
          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MessagesPage2;
