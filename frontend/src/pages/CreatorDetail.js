import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaInstagram, FaYoutube, FaArrowLeft, FaQuoteLeft, FaMapMarkerAlt } from 'react-icons/fa';
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
              </div>
              <p className="profile-cat">{creator.category}</p>
              {creator.location && (
                <p className="profile-location"><FaMapMarkerAlt /> {creator.location}</p>
              )}
              {creator.isFeatured && <span className="featured-big">⭐ Featured Creator</span>}
            </div>

            <div className="profile-stats">
              <div className="pstat">
                <FaUsers />
                <strong>{(creator.followers / 1000).toFixed(0)}K</strong>
                <span>Followers</span>
              </div>
            </div>

            <div className="social-section">
              <h4>Follow on Social</h4>
              <div className="social-btns">
                {creator.socialLinks?.instagram && (
                  <a href={creator.socialLinks.instagram} className="social-btn instagram" target="_blank" rel="noreferrer">
                    <FaInstagram /> Instagram
                  </a>
                )}
                {creator.socialLinks?.youtube && (
                  <a href={creator.socialLinks.youtube} className="social-btn youtube" target="_blank" rel="noreferrer">
                    <FaYoutube /> YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="detail-main">
          {/* Motivation Quote */}
          {creator.motivationLine && (
            <section className="detail-section motivation-section">
              <div className="motivation-card">
                <FaQuoteLeft className="quote-icon" />
                <blockquote className="motivation-text">
                  {creator.motivationLine}
                </blockquote>
                <p className="motivation-author">— {creator.name}</p>
              </div>
            </section>
          )}

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
                <a
                  key={i}
                  href={creator.socialLinks?.[p.toLowerCase()] || '#!'}
                  className="platform-card"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={`platform-icon ${p.toLowerCase()}`}>
                    {p === 'Instagram' && <FaInstagram />}
                    {p === 'YouTube' && <FaYoutube />}
                  </div>
                  <h4>{p}</h4>
                  <p>Active</p>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CreatorDetail;
