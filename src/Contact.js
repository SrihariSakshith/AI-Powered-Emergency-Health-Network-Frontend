import React, { useState } from "react";
import axios from "axios";
import "./css/Contact.css";

const ContactForm = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryData = { username, description };
  
    console.log("Sending data to backend:", queryData); // Debugging
  
    try {
      const response = await axios.post(
        "https://ai-powered-emergency-health-network.onrender.com/contact/api/contact",
        queryData
      );
  
      if (response.data.success) {
        setMessage("Query submitted successfully!");
        setUsername("");
        setDescription("");
      } else {
        setMessage("Failed to submit query.");
      }
    } catch (error) {
      console.error("Error submitting query:", error.message);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Any Queries</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default ContactForm;
