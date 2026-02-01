import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@petecommerce.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Pet Street, Pet City, PC 12345</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Pet Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
