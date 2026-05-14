import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      toast.success('Message sent successfully! We will get back to you within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <span className="badge">Get In Touch</span>
          <h1>Contact <span className="gold-text">Us</span></h1>
          <p>We'd love to hear from you. Let's build something amazing together.</p>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info */}
        <div className="contact-info-col">
          <h2>Let's Talk</h2>
          <p>Whether you're a brand looking to launch your next big campaign or a creator ready to take your career to the next level, our team is here to help.</p>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon"><FaPhone /></div>
              <div>
                <strong>Phone</strong>
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <strong>Email</strong>
                <span>hello@creatorsSampark.in</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <strong>Address</strong>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><FaClock /></div>
              <div>
                <strong>Business Hours</strong>
                <span>Mon–Sat: 9AM – 7PM IST</span>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3>Quick Answers</h3>
            {[
              { q: 'How quickly do you respond?', a: 'We typically respond within 2-4 business hours.' },
              { q: 'Do you work with small brands?', a: 'Yes! We have packages starting from ₹15,000/month for smaller brands.' },
              { q: 'Can creators apply directly?', a: 'Absolutely. Register as a creator and apply to any campaign that fits you.' },
            ].map((faq, i) => (
              <div key={i} className="faq-item">
                <strong>{faq.q}</strong>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-col">
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                    <option value="">Select a subject</option>
                    <option>Brand Campaign Inquiry</option>
                    <option>Creator Registration</option>
                    <option>Partnership Opportunity</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="form-group full">
                <label>Message *</label>
                <textarea placeholder="Tell us about your project, campaign goals, or how we can help..." rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
