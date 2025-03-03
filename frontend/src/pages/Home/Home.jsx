import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero text-center text-black d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to the Book Shelf</h1>
          <p className="lead">Discover, Buy, and Sell Old Books with Ease</p>
          <a href="/about" className="btn btn-warning btn-lg mt-3">Learn More</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits text-center">
      <div className="container mt-5">
  <h2 className="section-title mb-4 text-primary text-center">Why Choose Our Platform?</h2>
  <div className="row g-4"> {/* Bootstrap grid gap for spacing */}

    {/* Wide Collection */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">📚 Wide Collection</h3>
        <p>Explore a vast collection of old books from various genres and authors.</p>
      </div>
    </div>

    {/* Affordable Prices */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">💰 Affordable Prices</h3>
        <p>Find books at the best prices and compare offers from different sellers.</p>
      </div>
    </div>

    {/* Eco-Friendly */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🌱 Eco-Friendly</h3>
        <p>Buying and selling old books reduces waste and supports sustainability.</p>
      </div>
    </div>

    {/* City-wise Availability */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🏙️ Find Books in Your City</h3>
        <p>Discover books available in different cities and choose the nearest seller.</p>
      </div>
    </div>

    {/* University-wise Books */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🎓 University-Specific Books</h3>
        <p>Filter books based on university syllabi, ensuring you get the right study material.</p>
      </div>
    </div>

    {/* Search Nearby Books */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">📍 Search Books Near You</h3>
        <p>Find books listed by sellers in your local area for easy pickup or delivery.</p>
      </div>
    </div>

    {/* Book Condition & Price Comparison */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">📖 Choose Book Condition</h3>
        <p>Filter books by condition (New, Like New, Used) and compare prices easily.</p>
      </div>
    </div>

    {/* Verified Sellers & Trusted Buyers */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">✅ Trusted & Verified</h3>
        <p>We verify sellers and buyers to ensure a safe and secure book exchange.</p>
      </div>
    </div>

    {/* 🚚 Book Delivery System */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🚚 Book Delivery Available</h3>
        <p>Get your books delivered to your doorstep with our reliable delivery partners.</p>
      </div>
    </div>

    {/* 🌍 Multi-language Support */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🌍 Multi-language Support</h3>
        <p>Our platform is available in multiple languages for a better user experience.</p>
      </div>
    </div>

    {/* 🧾 Book Invoice Feature */}
    <div className="col-md-4">
      <div className="card shadow-lg p-4 bg-light border-0 text-center">
        <h3 className="text-dark">🧾 Get Invoice for Books</h3>
        <p>Receive detailed invoices for every book you buy or sell for better record-keeping.</p>
      </div>
    </div>

  </div>
</div>


      </section>


      {/* Call-to-Action Section */}
      <section className="cta text-center text-white py-1">
        <div className="container">
          <h2>Ready to Discover Your Next Favorite Book?</h2>
          <a href="/registration" className="btn btn-primary btn-lg mt-3">Get Started Now</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
