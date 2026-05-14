import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import './Auth.css';

const Register = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: searchParams.get('role') || 'brand', company: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to CreatorsSampark!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <img src={logo} alt="CreatorsSampark" className="auth-logo" />
          <h2>Join CreatorsSampark Today</h2>
          <p>Create your free account and start connecting with top creators or discover amazing brand opportunities.</p>
          <div className="role-select-visual">
            <button className={`role-btn ${form.role === 'brand' ? 'active' : ''}`} onClick={() => setForm({ ...form, role: 'brand' })}>
              🏢 I'm a Brand
            </button>
            <button className={`role-btn ${form.role === 'creator' ? 'active' : ''}`} onClick={() => setForm({ ...form, role: 'creator' })}>
              🎨 I'm a Creator
            </button>
          </div>
          <div className="auth-features">
            {['Free to get started', 'Verified & vetted creators', 'Campaign management tools', 'Real-time performance tracking'].map((f, i) => (
              <div key={i} className="auth-feature">✓ {f}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-card">
          <h2>Create Your Account</h2>
          <p>Already registered? <Link to="/login">Sign in here</Link></p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Company / Brand Name</label>
                <input type="text" placeholder="Your Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>I am registering as</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="brand">Brand / Business</option>
                <option value="creator">Creator / Influencer</option>
              </select>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Password *</label>
                <input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
              </div>
            </div>
            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>
          <p className="back-home"><Link to="/">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
