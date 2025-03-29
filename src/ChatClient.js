import React, { useState } from "react";
import Nav from "./Nav.js"; // Updated import path
import Footer from "./Footer.js"; // Updated import path
import axios from "axios"; // Import axios
import "./css/Chat.css";

axios.defaults.withCredentials = true; // Enable credentials for axios

const ChatClient = ({ username, role, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || "https://ai-powered-emergency-health-network.onrender.com/chat";

      const response = await axios.post(`${apiUrl}/chat/chat`, {
        message: input,
      });

      console.log("Response from API:", response.data); // Debugging

      const botMessage = { sender: "bot", text: response.data.reply }; // ✅ Corrected Property
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat API call:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to fetch response." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-page">
      <Nav username={username} role={role} onLogout={onLogout} />
      <div className="chat-container">
        <h1 className="chat-title">Chat with MedReady</h1>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="chat-send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatClient;
