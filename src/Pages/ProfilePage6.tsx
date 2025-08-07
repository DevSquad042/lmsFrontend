
import type { FC } from "react";
import type { ChangeEvent } from 'react'
import type {FormEvent} from 'react'
import {  useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/shared/Footer";
import "../assets/css/ProfilePage6.css";
import profile from '../assets/Images/profile.png'

// Message type
interface Message {
  id: number;
  text: string;
  type: "sent" | "received";
}

const ProfilePage6: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋", type: "received" },
    { id: 2, text: "Hello! How are you?", type: "sent" },
    { id: 3, text: "I'm good. Thanks for asking.", type: "received" },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");

  // Reference for scrolling
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

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

        {/* Chat Section */}
        <div className="chat-section">
          <h2>Messages</h2>
          {/* Chat Header */}
          <div className="chat-header">
            <FaArrowLeft className="chat-back-icon" />
            <img
              src={profile}
              alt="User"
              className="chat-profile-img"
            />
            <span className="chat-user-name">John Doe</span>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {/* Invisible div for auto-scroll */}
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

export default ProfilePage6;


