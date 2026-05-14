import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import satyamPhoto from '../assets/images/satyam-yadav.jpg';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="CreatorsSampark" className="footer-logo" />
            <p>India's premier talent management & influencer marketing platform. Connecting brands with authentic creators for impactful campaigns.</p>

            {/* Founder */}
            <div className="footer-founder">
              <span className="founder-label">Founded by</span>
              <div className="founder-info">
                <img src={satyamPhoto} alt="Satyam Yadav" className="founder-avatar" />
                <div>
                  <strong>Satyam Yadav</strong>
                  <span>Founder & CEO</span>
                  <div className="founder-socials">
                    <a href="https://www.instagram.com/satyam.yadav" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    <a href="https://www.linkedin.com/in/satyam-yadav" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="https://www.instagram.com/creatorsSampark" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="#!" aria-label="YouTube"><FaYoutube /></a>
              <a href="#!" aria-label="Twitter"><FaTwitter /></a>
              <a href="#!" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.linkedin.com/company/creatorssampark" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/creators">Find Creators</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Talent Management</Link></li>
              <li><Link to="/services">Influencer Marketing</Link></li>
              <li><Link to="/services">Brand Campaigns</Link></li>
              <li><Link to="/services">Content Strategy</Link></li>
              <li><Link to="/services">Analytics & ROI</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>📍 Mumbai, Maharashtra, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@creatorsSampark.in</li>
              <li>🕒 Mon–Sat: 9AM – 7PM IST</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2024 CreatorsSampark. All rights reserved. | Founded by <strong style={{color: 'var(--gold)'}}>Satyam Yadav</strong></p>
          <div className="footer-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
            <a href="#!">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
