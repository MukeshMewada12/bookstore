import React from "react";
import myPhoto from "../../assets/bookpic.jpg"; // Replace with actual photo path
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container mt-5">
      {/* About Us Section */}
      <div className="row align-items-center bg-light p-4 rounded shadow-lg">
        <div className="col-lg-5 text-center">
          <img 
            src={myPhoto} 
            alt="Our Team" 
            className="img-fluid rounded shadow-lg border border-3 border-primary" 
            style={{ maxHeight: "350px" }}
          />
        </div>
        <div className="col-lg-7">
          <h2 className="text-primary mb-3 fw-bold text-uppercase display-5">📖 About Us</h2>
          <p className="text-muted fs-5 lh-lg fw-semibold">
            Welcome to our platform! Our goal is to <span className="fw-bold text-dark">help students and entrepreneurs</span> by creating a direct 
            <span className="text-success fw-bold"> marketplace</span> for <span className="text-info fw-bold">buying and selling books</span> affordably.
          </p>
          <p className="text-muted fs-5 lh-lg">
            Many bookstores buy used books at <span className="text-danger fw-bold">low prices</span> and sell them at <span className="text-warning fw-bold">high margins</span>, making students 
            <span className="text-dark fw-bold"> pay extra</span> for second-hand books. With our platform, students can <span className="text-success fw-bold">sell their books directly</span> to other 
            students at fair prices, eliminating middlemen!
          </p>
        </div>
      </div>

      {/* Example Scenario */}
      <div className="mt-5 p-5 bg-white rounded shadow-lg text-center">
        <h3 className="text-danger mb-4 fw-bold display-6 text-uppercase">📊 Example Scenario</h3>
        
        <div className="row">
          <div className="col-md-6">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h5 className="text-primary fw-bold fs-4">🚫 Traditional Bookstore</h5>
              <p className="text-muted fs-5">
                📚 Student buys a book for <span className="fw-bold text-dark">₹4000</span>  
                <br /> 🔻 After exams, sells it to a **bookstore** for only <span className="fw-bold text-danger">₹500 - ₹700</span>  
                <br /> 🔺 The bookstore **resells** it to another student for <span className="fw-bold text-warning">₹2000 - ₹2500</span>  
                <br /> ❌ **Both seller & buyer lose money!**
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 border rounded bg-light shadow-sm">
              <h5 className="text-success fw-bold fs-4">✅ Our Portal</h5>
              <p className="text-muted fs-5">
                📚 Student buys a book for <span className="fw-bold text-dark">₹4000</span>  
                <br /> 🔻 After exams, sells it on **our portal** for <span className="fw-bold text-success">₹1500</span>  
                <br /> 🔺 Another student buys it for the same <span className="fw-bold text-primary">₹1500</span>  
                <br /> 🎉 **Seller earns ₹700 more, buyer saves ₹800 - ₹1000!**
              </p>
            </div>
          </div>
        </div>

        <p className="text-dark mt-4 fs-5">
          <span className="fw-bold text-success">✔ Smart students use our portal</span> to avoid **unfair losses** and **save more!**  
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="mt-5 p-5 bg-light rounded shadow-lg text-center">
        <h3 className="text-success mb-4 fw-bold display-6 text-uppercase">🎯 Our Mission</h3>
        <p className="text-dark fs-5 lh-lg">
          Our mission is to <span className="fw-bold text-primary">help students save money</span> and 
          <span className="text-danger fw-bold"> get better value</span> for their books.  
          Typically, bookstores buy used books at a <span className="text-info fw-bold">very low price</span> and resell them at <span className="text-warning fw-bold">much higher margins</span>.  
        </p>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="p-4 border rounded bg-white shadow-sm">
              <h5 className="text-primary fw-bold fs-4">📚 Direct Selling</h5>
              <p className="text-muted fs-5">Sell your used books at fair prices directly to buyers.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded bg-white shadow-sm">
              <h5 className="text-primary fw-bold fs-4">💰 Cost Savings</h5>
              <p className="text-muted fs-5">Buyers get cheaper books, sellers earn more – a win-win deal!</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded bg-white shadow-sm">
              <h5 className="text-primary fw-bold fs-4">🚚 Easy & Reliable</h5>
              <p className="text-muted fs-5">Home delivery options and secure transactions for a smooth experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
