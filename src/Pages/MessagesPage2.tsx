import type { FC, ChangeEvent, FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header2 from "../Components/shared/Header2";
import ProfileSidebar from "../Components/shared/ProfileSidebar";
import Footer from "../Components/Layout/Footer";
import "../Styles/MessagesPage2.css";

// ✅ Mocked API function
const getMessages = (userId: number): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text: `Hey Grace! 👋 (user ${userId})`, // using userId to silence warning
          type: "received",
        },
        {
          id: 2,
          text: "Hi! How’s the project going?",
          type: "sent",
        },
        {
          id: 3,
          text: "Smooth so far. Just waiting on the backend team 😅",
          type: "received",
        },
      ]);
    }, 1000);
  });
};

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

const MessagesPage2: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userId = parseInt(id || "0", 10);
  const user = sampleUsers.find((u) => u.id === userId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Load messages from mock API
  useEffect(() => {
    const loadMessages = async () => {
      const data = await getMessages(userId);
      setMessages(data);
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

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: "Got it! I’ll ping the backend team again 😅",
        type: "received",
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
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












