import React, { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./css/Home.css";

const Home = () => {
  const featuresRef = useRef(null);
  const handleGetStartedClick = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="highlight">MedReady</span>
          </h1>
          <p>Your all-in-one platform for emergency medical needs and hospital management.</p>
          <button className="cta-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <h2>Our Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Search Hospitals</h3>
            <p>Find hospitals by location, specialties, or facilities. Get the right care at the right place.</p>
          </div>
          <div className="feature-card">
            <h3>Donor Search</h3>
            <p>Quickly find blood and organ donors in your area. Save lives with just a click.</p>
          </div>
          <div className="feature-card">
            <h3>Profile Management</h3>
            <p>Manage your medical data securely. Keep your health information up to date.</p>
          </div>
        </div>
      </section>


      {/* Scrolling Section */}
      <section className="scrolling-section">
        <h2>Explore MedReady</h2>
        <div className="scrolling-content">
          <div className="scrolling-item">
            <h4>Comprehensive Hospital Data</h4>
            <p>Access detailed information about hospitals including tests available and specialties.</p>
          </div>
          <div className="scrolling-item">
            <h4>Connect with Donors</h4>
            <p>Find and contact blood or organ donors quickly in case of emergencies.</p>
          </div>
          <div className="scrolling-item">
            <h4>Secure Patient Profiles</h4>
            <p>Patients can safely store and update their medical records for emergency use.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have any questions? We're here to help you with all your medical needs.</p>
        <Link to="/contact">
          <button className="contact-btnn">Reach Out</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
