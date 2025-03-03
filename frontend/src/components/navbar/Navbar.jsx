import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';  
import { logout } from '../../features/Login/LoginSlice'; 
import { logoutUserApi } from '../../features/Login/LoginApi';  
import { FaBook } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = isAuthenticated ? user.username : null;
  const userId = isAuthenticated ? user.id : null;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await logoutUserApi(userId);  
        dispatch(logout());  
        alert("You have successfully logged out.");
        navigate("/login");  
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to logout. Please try again.");
      }
    }
  };

  // Load Google Translate Script
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi', // English & Hindi
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <h1>
          <Link to="/" className="brand-logo">
            <FaBook className="FaBook" /> KitabGhar
          </Link>
        </h1>
        <button className="mobile-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMobileMenu}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
              <li>
                <span className="username">{userName}</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
              </li>
              <li>
                <Link to="/registration" onClick={toggleMobileMenu}>Registration</Link>
              </li>
            </>
          )}
        </ul>
        {/* Google Translate Dropdown */}
        <div className="google-translate-container">
  <div id="google_translate_element"></div>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
