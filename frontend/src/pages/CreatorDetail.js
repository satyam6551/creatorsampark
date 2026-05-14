import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaUsers, FaChartLine, FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaArrowLeft, FaBullhorn } from 'react-icons/fa';
import './CreatorDetail.css';

const CreatorDetail = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/creators/${id}`)
      .then(res => { setCreator(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader" style={{ marginTop: 100 }}><div className="spinner"></div></div>;
  if (!creator) return <div style={{ padding: '120px 20px', textAlign: 'center' }}><h2>Creator not found</h2><Link to="/creators">← Back</Link></div>;

  return (
    <div className="creator-detail-page">
      {/* Cover */}
      <div className="creator-cover">
        <div className="cover-overlay"></div>
        <img src={creator.coverImage || `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200`} alt="" className="cover-bg" />
        <div className="container cover-content">
          <Link to="/creators" className="back-btn"><FaArrowLeft /> Back to Creators</Link>
        </div>
      </div>

      <div className="container detail-grid">
        {/* Left Column */}
        <aside className="detail-sidebar">
          <div className="profile-card">
            <img src={creator.avatar || 'https://randomuser.me/api/portraits/women/10.jpg'} alt={creator.name} className="profile-img" />
            <div className="profile-info">
              <div className="profile-name-row">
                <h1>{creator.name}</h1>
                {creator.isVerified && <span className="verified-big">✓ Verified</span>}
              </div>
              <p className="profile-cat">{creator.category}</p>
              <p className="profile-location">📍 {creator.location}</p>
              {creator.isFeatured && <span className="featured-big">⭐ Featured Creator</span>}
            </div>

            <div className="profile-stats">
              <div className="pstat">
                <FaUsers />
                <strong>{(creator.followers / 1000).toFixed(0)}K</strong>
                <span>Followers</span>
              </div>
              <div className="pstat">
                <FaChartLine />
                <strong>{creator.engagementRate}%</strong>
                <span>Engagement</span>
              </div>
              <div className="pstat">
                <FaStar />
                <strong>{creator.rating}</strong>
                <span>Rating</span>
              </div>
              <div className="pstat">
                <FaBullhorn />
                <strong>{creator.totalCampaigns}</strong>
                <span>Campaigns</span>
              </div>
            </div>

            <div className="social-section">
              <h4>Social Platforms</h4>
              <div className="social-btns">
                {creator.platform && creator.platform.map((p, i) => (
                  <a key={i} href={creator.socialLinks?.[p.toLowerCase()] || '#!'} className={`social-btn ${p.toLowerCase()}`} target="_blank" rel="noreferrer">
                    {p === 'Instagram' && <FaInstagram />}
                    {p === 'YouTube' && <FaYoutube />}
                    {p === 'Twitter' && <FaTwitter />}
                    {p === 'Facebook' && <FaFacebook />}
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="pricing-section">
              <h4>Pricing</h4>
              <div className="price-card">
                <span>Per Post</span>
                <strong>₹{creator.pricePerPost?.toLocaleString()}</strong>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '14px' }}>
              Contact Creator
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="detail-main">
          {/* Bio */}
          <section className="detail-section">
            <h2>About</h2>
            <p className="bio-text">{creator.bio || 'No bio available.'}</p>
          </section>

          {/* Tags */}
          {creator.tags && creator.tags.length > 0 && (
            <section className="detail-section">
              <h2>Niches & Tags</h2>
              <div className="tags-list">
                {creator.tags.map((tag, i) => (
                  <span key={i} className="big-tag">#{tag}</span>
                ))}
              </div>
            </section>
          )}

          {/* Platforms */}
          <section className="detail-section">
            <h2>Active Platforms</h2>
            <div className="platforms-grid">
              {creator.platform && creator.platform.map((p, i) => (
                <div key={i} className="platform-card">
                  <div className={`platform-icon ${p.toLowerCase()}`}>
                    {p === 'Instagram' && <FaInstagram />}
                    {p === 'YouTube' && <FaYoutube />}
                    {p === 'Twitter' && <FaTwitter />}
                    {p === 'Facebook' && <FaFacebook />}
                  </div>
                  <h4>{p}</h4>
                  <p>Active</p>
                </div>
              ))}
            </div>
          </section>

          {/* Performance */}
          <section className="detail-section">
            <h2>Performance Metrics</h2>
            <div className="metrics-bars">
              {[
                { label: 'Engagement Rate', value: creator.engagementRate * 10, display: `${creator.engagementRate}%` },
                { label: 'Campaign Success', value: 90, display: '90%' },
                { label: 'Content Quality', value: creator.rating * 20, display: `${creator.rating}/5` },
                { label: 'Response Rate', value: 88, display: '88%' },
              ].map((m, i) => (
                <div key={i} className="metric-bar">
                  <div className="metric-bar-header">
                    <span>{m.label}</span>
                    <strong>{m.display}</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.min(m.value, 100)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreatorDetail;
