import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-footer">
          <a href="/" className="footer-logo">MedReady</a>
          <p className="footer-tagline">
            Empowering emergency healthcare with real-time access to donors, tests, and critical equipment.
          </p>
          <div className="footer-service">
            <ion-icon name="time-outline"></ion-icon>
            <span>Available 24/7</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2025 MedReady. All rights reserved.</p>
          <ul className="footer-socials">
            <li><a href="https://facebook.com/andro.pool.54" target="_blank" rel="noreferrer"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="https://instagram.com/_vladimir_putin.___" target="_blank" rel="noreferrer"><ion-icon name="logo-instagram"></ion-icon></a></li>
            <li><a href="https://twitter.com/Annabel07785340" target="_blank" rel="noreferrer"><ion-icon name="logo-twitter"></ion-icon></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
