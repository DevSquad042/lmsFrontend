// src/components/messages/Messages.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter2 from "./Filters/Filter2";
import "./ComponentStyles/Messages.css";

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
  avatar: string;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    name: "Ronald Richards",
    message:
      "Thank you for asking your doubt, I'll send you a pdf file which covers the problems you are facing. If you have any...",
    date: "18th March, 2024",
    avatar: "https://i.pravatar.cc/48?img=12",
  },
  {
    id: 2,
    name: "Devon Lane",
    message: "I'll get back to you as soon as possible.",
    date: "18th March, 2024",
    avatar: "https://i.pravatar.cc/48?img=32",
  },
  // Add more items or fetch from API later
];

const Messages: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleClick = (id: number) => {
    console.log("Navigating to:", `/profile5/${id}`); // ✅ Debug log
    navigate(`/profile5/${id}`);
  };

  return (
    <div className="messages-container">
      <Filter2
        title="Messages"
        searchQuery={search}
        setSearchQuery={setSearch}
      />

      <div className="messages-list">
        {sampleMessages.map((msg) => (
          <div
            className="message-card"
            key={msg.id}
            onClick={() => handleClick(msg.id)}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <img src={msg.avatar} alt={msg.name} className="message-avatar" />
            <div className="message-info">
              <div className="message-top">
                <h4 className="message-name">{msg.name}</h4>
                <span className="message-date">{msg.date}</span>
              </div>
              <p className="message-text">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
