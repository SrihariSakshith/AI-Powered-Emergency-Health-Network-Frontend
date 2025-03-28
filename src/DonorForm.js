import React, { useState } from "react";
import axios from "axios";
import './css/DonorForm.css'; // Ensure this CSS file exists

const DonorForm = ({ username, role }) => {
  const [donation, setDonation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donorData = {
      username,  // Use username from props
      donation,  // Only donation field is being sent
      role,
    };

    try {
      // Sending donor details to the backend server
      const response = await axios.post("https://ai-powered-emergency-health-network-server.vercel.app//donor-form/api/donors", donorData);

      if (response.data.success) {
        setMessage("Donor details submitted successfully!");
        setDonation("");
      } else {
        setMessage("Failed to submit donor details.");
      }
    } catch (error) {
      console.error("Error submitting donor details:", error.message);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="donor-form-container">
      <h2>Donor Form</h2>
      <form onSubmit={handleSubmit}>
        <p><strong>Username:</strong> {username}</p> {/* Display username from props */}
        <input
          type="text"
          placeholder="Donation (e.g., Blood, Organ, etc.)"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
};

export default DonorForm;
