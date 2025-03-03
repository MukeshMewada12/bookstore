// Contact.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm, submitContactForm } from "../../features/ContactUs/ContactUsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  const dispatch = useDispatch();
  const { formData, loading, success, error } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input type="tel" className="form-control" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <p className="alert alert-success mt-3">Message sent successfully!</p>}
          {error && <p className="alert alert-danger mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
