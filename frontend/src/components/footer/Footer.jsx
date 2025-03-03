import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container py-4">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 d-flex flex-column align-items-center text-center">
  <h2 className="footer-title text-white mb-3">📚 KitabGhar</h2>
  <p className="footer-text">
    Discover a world of knowledge with <strong>KitabGhar</strong>! Your one-stop platform for books, learning materials, and insightful content.  
    <br /> <br />
    Whether you're a student, a book lover, or a knowledge seeker, we provide a vast collection of resources to enhance your learning experience.
  </p>
  {/* <a href="/explore" className="btn btn-primary mt-3">Explore Now</a> */}
</div>


          {/* Quick Links */}
          <div className="col-md-4 text-center">
  <h2 className="footer-title text-white">Quick Links</h2>
  <ul className="footer-links list-unstyled d-flex flex-column align-items-center">
    <li><a href="/about">About Us</a></li>
    <li><a href="/contact">Contact Us</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/faq">FAQ</a></li>
  </ul>
</div>


          {/* Social Media & Contact */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <h2 className="footer-title text-white">Follow Us</h2>
            <div className="footer-social ">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
            <p>Email: <a href="mailto:support@company.com">mukeshmewada@.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+91 7224986567</a></p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright text-center py-3">
        <p>&copy; {new Date().getFullYear()} kitabghar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
