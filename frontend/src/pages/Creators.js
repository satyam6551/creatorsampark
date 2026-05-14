import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Creators.css';

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/creators?limit=50');
      setCreators(data.creators || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="creators-page">
        <div className="page-loader"><div className="spinner"></div></div>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="creators-page">
        <div className="empty-state">
          <div className="empty-icon">🎭</div>
          <h3>No creators found</h3>
          <p>Seed sample data to see creators.</p>
          <button className="btn-primary" onClick={() => axios.post('/api/creators/seed/data').then(fetchCreators)}>
            Load Sample Creators
          </button>
        </div>
      </div>
    );
  }

  // Split creators into two rows — duplicate for seamless loop
  const mid = Math.ceil(creators.length / 2);
  const row1 = creators.slice(0, mid);
  const row2 = creators.slice(mid);

  // Duplicate each row for seamless infinite marquee
  const row1Loop = [...row1, ...row1, ...row1];
  const row2Loop = [...row2, ...row2, ...row2];

  return (
    <div className="creators-page">

      {/* Row 1 — Right to Left */}
      <div className="marquee-row">
        <div className="marquee-track marquee-left">
          {row1Loop.map((creator, i) => (
            <CreatorCard key={`r1-${i}`} creator={creator} />
          ))}
        </div>
      </div>

      {/* Center Title */}
      <div className="creators-title-block">
        <span className="badge">Our Network</span>
        <h1>Discover <span className="gold-text">Top Creators</span></h1>
        <p>Browse our curated network of verified influencers across all niches</p>
      </div>

      {/* Row 2 — Left to Right */}
      <div className="marquee-row">
        <div className="marquee-track marquee-right">
          {row2Loop.map((creator, i) => (
            <CreatorCard key={`r2-${i}`} creator={creator} />
          ))}
        </div>
      </div>

    </div>
  );
};

const CreatorCard = ({ creator }) => (
  <Link to={`/creators/${creator._id}`} className="marquee-card">
    <img src={creator.avatar || 'https://randomuser.me/api/portraits/women/10.jpg'} alt={creator.name} />
    <div className="marquee-card-overlay">
      <h3>{creator.name}</h3>
      <p>{creator.category}</p>
      {creator.isVerified && <span className="verified-dot">✓ Verified</span>}
    </div>
  </Link>
);

export default Creators;
