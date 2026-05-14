import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import './Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <img src={logo} alt="CreatorsSampark" className="auth-logo" />
          <h2>Welcome Back to CreatorsSampark</h2>
          <p>India's premier talent management & influencer marketing platform. Log in to access your dashboard, manage campaigns, and connect with top creators.</p>
          <div className="auth-features">
            {['500+ Verified Creators', '200+ Brand Campaigns', 'Real-time Analytics', '24/7 Support'].map((f, i) => (
              <div key={i} className="auth-feature">✓ {f}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-card">
          <h2>Sign In</h2>
          <p>Don't have an account? <Link to="/register">Create one free</Link></p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>
          <p className="back-home"><Link to="/">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
