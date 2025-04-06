import React, { useState } from "react";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import axios from "axios";
import "./css/Chat.css";

axios.defaults.withCredentials = true;

const ChatClient = ({ username, role, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const apiUrl =
        process.env.REACT_APP_API_BASE_URL || "https://ai-powered-emergency-health-network.onrender.com/chat";

      const response = await axios.post(`${apiUrl}/chat`, {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
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

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="chat-page">
      <Nav username={username} role={role} onLogout={onLogout} />
      <div className="chat-container">
        <h1 className="chat-title">💬 Chat with <span>MedReady</span></h1>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <strong>{msg.sender === "user" ? "You: " : "MedReady: "}</strong>{" "}
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
            🚀 Send
          </button>
          <button
            className={`mic-btn ${listening ? "listening" : ""}`}
            onClick={handleMicClick}
            title="Speak"
          >
            🎤
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatClient;
