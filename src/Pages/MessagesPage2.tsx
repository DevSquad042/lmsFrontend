/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, ChangeEvent, FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import "../Styles/MessagesPage2.css";

// Sample user data
const sampleUsers = [
  { id: 1, name: "Ronald Richards", avatar: "https://i.pravatar.cc/48?img=12" },
  { id: 2, name: "Devon Lane", avatar: "https://i.pravatar.cc/48?img=32" },
];

// Message type
interface Message {
  id: number;
  text: string;
  type: "sent" | "received";
}

// API base URL
const API_URL = "http://localhost:3000/api/chats";

const MessagesPage2: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userId = parseInt(id || "0", 10);
  const user = sampleUsers.find((u) => u.id === userId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages from API
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setError(null);
        const response = await fetch(`${API_URL}?sender=${userId}&receiver=${userId === 1 ? 2 : 1}`);
        
        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Verify content type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();
        
        // Transform API data to match Message interface
        const transformedMessages: Message[] = data.map((msg: any) => ({
          id: msg._id || Date.now(),
          text: msg.message,
          type: msg.sender === userId ? "sent" : "received",
        }));
        
        setMessages(transformedMessages);
      } catch (error: any) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again later.");
        // Fallback to mock data if API fails
        setMessages([
          {
            id: 1,
            text: `Hey! Unable to load messages due to server error.`,
            type: "received",
          },
        ]);
      }
    };
    loadMessages();
  }, [userId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now(),
      text: newMessage,
      type: "sent",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          receiver: userId === 1 ? 2 : 1,
          message: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Verify content type for POST response
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      setError(null);
    } catch (error: any) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="profile-chat-page">
      <Header2 />

      <div className="profile-chat-body">
        <ProfileSidebar />

        <div className="chat-section">
          <h2>Messages</h2>

          {/* Error Message */}
          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}

          {/* Chat Header */}
          <div className="chat-header">
            <FaArrowLeft
              className="chat-back-icon"
              onClick={() => navigate("/profile5")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={user?.avatar || ""}
              alt={user?.name || "User"}
              className="chat-profile-img"
            />
            <span className="chat-user-name">{user?.name || "Unknown User"}</span>
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