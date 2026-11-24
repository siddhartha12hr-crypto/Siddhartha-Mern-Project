import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Siddhartha eBook Library</h3>
            <p>Your gateway to free digital knowledge.</p>
            <p>Read and download books that inspire, educate, and transform lives.</p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#books">eBooks</a>
            <a href="#categories">Categories</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <a href="#devotional">Devotional eBooks</a>
            <a href="#entertainment">Entertainment</a>
            <a href="#self-help">Self-Help</a>
            <a href="#finance">Money & Finance</a>
            <a href="#psychology">Psychology</a>
            <a href="#educational">Educational</a>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <FaMapMarkerAlt /> 123 Digital Avenue, Reading City
            </p>
            <p>
              <FaPhone /> +91 98765 43210
            </p>
            <p>
              <FaEnvelope /> info@siddhartha-ebooks.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Siddhartha eBook Library. All rights reserved. Free access to knowledge for everyone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
