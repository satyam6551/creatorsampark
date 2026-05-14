import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: '', status: 'All', category: 'All', platform: 'All' });
  const [applyMsg, setApplyMsg] = useState('');
  const [applyType, setApplyType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => { fetchCampaigns(); }, [filters.status, filters.category, filters.platform]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== 'All') params.append('status', filters.status);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.platform && filters.platform !== 'All') params.append('platform', filters.platform);
      if (filters.search) params.append('search', filters.search);
      const { data } = await axios.get(`/api/campaigns?${params}&limit=12`);
      setCampaigns(data.campaigns || []);
      setTotal(data.total || 0);
    } catch { }
    setLoading(false);
  };

  const seedAndFetch = async () => {
    await axios.post('/api/campaigns/seed/data');
    fetchCampaigns();
  };

  const handleApply = (campaign) => {
    if (campaign.status === 'completed') return;
    const token = localStorage.getItem('token');
    if (!token) {
      setApplyType('error');
      setApplyMsg('⚠️ Please login first to apply for campaigns!');
      setTimeout(() => setApplyMsg(''), 3500);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setApplyType('success');
      setApplyMsg(`✅ Applied for "${campaign.title}" successfully!`);
      setTimeout(() => setApplyMsg(''), 3500);
    }
  };

  return (
    <div className="campaigns-page">
      <div className="page-header">
        <div className="container">
          <span className="badge">Opportunities</span>
          <h1>Brand <span className="gold-text">Campaigns</span></h1>
          <p>Apply to active brand campaigns and monetize your influence</p>
          <div className="search-bar">
            <input type="text" placeholder="Search campaigns..." value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} />
            <button onClick={fetchCampaigns}><FaSearch /></button>
          </div>
        </div>
      </div>

      <div className="container campaigns-layout">
        {/* Filters */}
        <div className="camp-filters">
          <div className="filter-chips-row">
            {['All', 'active', 'completed'].map(s => (
              <button key={s} className={`chip ${filters.status === s ? 'active' : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, status: s }))}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <div className="filter-right">
            <select value={filters.category} onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))} className="filter-select">
              {['All', 'Fashion', 'Food & Health', 'Travel & Tech', 'Fitness', 'Beauty', 'Technology'].map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={filters.platform} onChange={e => setFilters(prev => ({ ...prev, platform: e.target.value }))} className="filter-select">
              {['All', 'Instagram', 'YouTube', 'Facebook', 'Twitter'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="results-count">{total} campaigns found</div>

        {/* Toast message */}
        {applyMsg && (
          <div className={`apply-toast ${applyType}`}>{applyMsg}</div>
        )}

        {loading ? (
          <div className="page-loader"><div className="spinner"></div></div>
        ) : campaigns.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📣</div>
            <h3>No campaigns found</h3>
            <p>Start your backend server and seed sample data to see campaigns.</p>
            <button className="btn-primary" onClick={seedAndFetch}>Load Sample Campaigns</button>
          </div>
        ) : (
          <div className="campaigns-full-grid">
            {campaigns.map(c => (
              <div key={c._id} className="campaign-full-card">
                {c.image && <div className="camp-img-wrap"><img src={c.image} alt={c.title} /></div>}
                <div className="camp-content">
                  <div className="camp-header">
                    <span className={`status-badge ${c.status}`}>{c.status}</span>
                    <span className="camp-category">{c.category}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="camp-details">
                    <div className="camp-detail-item">
                      <span>💰 Budget</span>
                      <strong>₹{c.budget?.toLocaleString()}</strong>
                    </div>
                    <div className="camp-detail-item">
                      <span>📱 Platform</span>
                      <strong>{c.platform?.join(', ')}</strong>
                    </div>
                    {c.requirements && (
                      <div className="camp-detail-item full-width">
                        <span>📋 Requirements</span>
                        <strong>{c.requirements}</strong>
                      </div>
                    )}
                  </div>
                  <div className="camp-actions">
                    <button
                      className="btn-primary"
                      disabled={c.status === 'completed'}
                      style={c.status === 'completed' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      onClick={() => handleApply(c)}
                    >
                      {c.status === 'completed' ? '🔒 Closed' : 'Apply Now'}
                    </button>
                    <button className="btn-save">Save</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
