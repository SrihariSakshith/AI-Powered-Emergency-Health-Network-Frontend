import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import aiBanner from "./images/alert-bg.jpg";
import hospitalNetwork from "./images/hospital1.jpg";
import howItWorksImg from "./images/how-it-works.jpg";
import donateImg from "./images/donate.jpg";

const Home = () => {
  const quotes = [
    "“The gift of blood is the gift of life.”",
    "“Not all heroes wear capes. Some donate blood.”",
    "“AI connects, you protect – donate today.”",
    "“Together, we can build a life-saving network.”",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const [showModal, setShowModal] = useState(false);
  const [emergencyText, setEmergencyText] = useState("");

  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    alert("🚑 Help will be on the way shortly!");
    setShowModal(false);
    setEmergencyText("");
  };

  return (
    <div className="ai-home-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="overlay"></div>
        <img src={aiBanner} alt="AI Emergency Health" className="banner-img" />
        <div className="hero-text">
          <h1>AI Emergency Health Connect</h1>
          <p className="tagline">Bridging technology and humanity to save lives</p>
          <h3 className="quote">{randomQuote}</h3>
          <div className="hero-buttons">
            <Link to="/Donorform" className="donate-link">💖 Become a Donor</Link>
            <button className="emergency-btn" onClick={() => setShowModal(true)}>🚨 Emergency</button>
          </div>
        </div>
      </section>

      {/* Connected Hospitals */}
      <section className="network-section">
        <h2>🏥 Hospitals Connected Through Our Network</h2>
        <img src={hospitalNetwork} alt="Connected Hospitals" className="network-img" />
        <p className="network-text">
          Our platform links patients, hospitals, and donors using AI-powered real-time monitoring.
          Whether it's blood, organs, or equipment — we're here in every emergency.
        </p>
      </section>

      {/* Why Donate */}
      <section className="why-donate-section">
        <h2>💡 Why Should You Donate?</h2>
        <div className="donate-flex">
          <img src={donateImg} alt="Why Donate" className="donate-img" />
          <ul className="donate-points">
            <li>✅ Every donation can save up to 3 lives.</li>
            <li>✅ Donating creates a ripple of kindness in emergencies.</li>
            <li>✅ Blood & organ shortages are real – be the difference.</li>
            <li>✅ You may save someone who saves thousands tomorrow.</li>
          </ul>
        </div>
      </section>

      
      {/* Modal for Emergency */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🚨 Emergency Alert</h2>
            <form onSubmit={handleEmergencySubmit}>
              <textarea
                value={emergencyText}
                onChange={(e) => setEmergencyText(e.target.value)}
                placeholder="Describe the emergency..."
                required
              />
              <div className="modal-buttons">
                <button type="submit">Send Alert</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
