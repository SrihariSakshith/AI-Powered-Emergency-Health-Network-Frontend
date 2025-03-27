import React from 'react';
import './css/Footer.css'; // Import the CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-footer">
          <div className="footer-brand">
            <a href="#" className="logo">MedReady</a>
            <p className="footer-text">
              We are committed to bridging the gap in healthcare by connecting blood donors with recipients.
              Join our community to make a meaningful difference in people's lives.
            </p>
            <div className="schedule">
              <div className="schedule-icon">
                <ion-icon name="time-outline"></ion-icon>
              </div>
              <span className="span">24/7 Service</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2024 All Rights Reserved by MedReady
          </p>
          <ul className="social-list">
            <li>
              <a href="https://www.facebook.com/andro.pool.54?mibextid=ZbWKwL" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/_vladimir_putin.___/" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Annabel07785340" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
