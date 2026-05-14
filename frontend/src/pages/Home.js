import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaUsers, FaBullhorn, FaChartLine, FaCheckCircle, FaArrowRight, FaPlay, FaInstagram, FaYoutube } from 'react-icons/fa';
import satyamPhoto from '../assets/images/satyam-yadav.jpg';
import './Home.css';

const stats = [
  { number: '500+', label: 'Verified Creators', icon: <FaUsers /> },
  { number: '200+', label: 'Brand Campaigns', icon: <FaBullhorn /> },
  { number: '50M+', label: 'Total Reach', icon: <FaChartLine /> },
  { number: '98%', label: 'Client Satisfaction', icon: <FaStar /> },
];

const services = [
  { title: 'Talent Management', desc: 'We exclusively manage 50+ top talents, driving consistent growth and success for each one. End-to-end creator support.', icon: '🎯' },
  { title: 'Influencer Marketing', desc: 'Connect your brand with the perfect influencers. Authentic campaigns that drive real engagement and measurable ROI.', icon: '📣' },
  { title: 'Content Strategy', desc: 'Data-driven content strategies that resonate with your audience and build lasting brand connections.', icon: '💡' },
  { title: 'Campaign Analytics', desc: 'Real-time metrics to track ROI, reach & CPC. Track CPC, CPV, CTR across all your campaigns.', icon: '📊' },
  { title: 'Brand Collaborations', desc: 'Seamless brand-creator partnerships. We handle negotiations, contracts, and deliverables end to end.', icon: '🤝' },
  { title: 'Event Management', desc: 'From product launches to creator meetups, we manage events that create buzz and lasting impressions.', icon: '🎪' },
];

const testimonials = [
  { name: 'Rohit Malhotra', role: 'Marketing Head, StyleCo', text: 'CreatorsSampark helped us run our best Diwali campaign ever. The creators they matched us with were perfect for our brand values.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { name: 'Priti Agarwal', role: 'CEO, NutriLife', text: 'Exceptional platform! The analytics dashboard gave us real-time ROI insights. We saw a 3x return on our influencer investment.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Sameer Khanna', role: 'Founder, TechGadgets', text: 'The team is professional and the creators are top-notch. Our YouTube campaign went viral within 48 hours of launch!', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
];

const categories = [
  { name: 'Fashion & Lifestyle', icon: '👗', count: 85 },
  { name: 'Food & Travel', icon: '✈️', count: 60 },
  { name: 'Tech & Gaming', icon: '🎮', count: 72 },
  { name: 'Fitness & Health', icon: '💪', count: 55 },
  { name: 'Beauty & Skincare', icon: '💄', count: 68 },
  { name: 'Comedy & Entertainment', icon: '😂', count: 90 },
  { name: 'Education', icon: '📚', count: 45 },
  { name: 'Music & Dance', icon: '🎵', count: 50 },
];

const Home = () => {
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);

  useEffect(() => {
    axios.get('/api/creators?limit=50').then(res => setFeaturedCreators(res.data.creators || []));
    axios.get('/api/campaigns?status=active&limit=3').then(res => setActiveCampaigns(res.data.campaigns || []));
  }, []);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-circle c1"></div>
          <div className="hero-circle c2"></div>
          <div className="hero-circle c3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="badge">India's #1 Talent Management Company</span>
            <h1>
              Fueled by <span className="gold-text">Creativity</span>,<br />
              Collaboration &<br />
              <span className="gold-text">Excellence</span>
            </h1>
            <p>CreatorsSampark is a premier talent management and influencer marketing agency crafting unmatched success for brands and creators alike.</p>
            <div className="hero-btns">
              <Link to="/creators" className="btn-primary">
                Find Creators <FaArrowRight />
              </Link>
              <Link to="/register" className="btn-outline">
                Join as Brand
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                {['women/1', 'men/2', 'women/3', 'men/4', 'women/5'].map((p, i) => (
                  <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} alt="" style={{ zIndex: 5 - i }} />
                ))}
              </div>
              <p><strong>100+</strong> creators on our platform</p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card main-card">
              <img src={satyamPhoto} alt="Satyam Yadav - Founder" className="hero-founder-img" />
              <div className="card-info">
                <strong>Satyam Yadav</strong>
                <span>Fashion Influencer</span>
                <div className="platform-tags">
                  <span><FaInstagram /> 850K</span>
                  <span><FaYoutube /> 120K</span>
                </div>
              </div>
            </div>
            <div className="hero-card stat-card top-right">
              <FaChartLine className="stat-icon" />
              <strong>3.2x ROI</strong>
              <span>Avg Campaign Return</span>
            </div>
            <div className="hero-card stat-card bottom-left">
              <span className="big-num">50M+</span>
              <span>Total Reach</span>
            </div>
            <div className="hero-card play-card">
              <FaPlay />
              <span>Watch Reel</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon-wrap">{s.icon}</div>
              <h3>{s.number}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">Explore Niches</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Browse by Category</h2>
            <p className="section-subtitle">Find the perfect creator in your industry niche</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link to={`/creators?category=${encodeURIComponent(cat.name)}`} key={i} className="category-card">
                <span className="cat-icon">{cat.icon}</span>
                <h4>{cat.name}</h4>
                <p>{cat.count}+ creators</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS — Marquee */}
      <section className="featured-section home-marquee-section">

        {/* Row 1 — Right to Left */}
        {featuredCreators.length > 0 && (
          <div className="home-marquee-row">
            <div className="home-marquee-track home-marquee-left">
              {[...featuredCreators, ...featuredCreators, ...featuredCreators].map((creator, i) => (
                <Link to={`/creators/${creator._id}`} key={`r1-${i}`} className="home-marquee-card">
                  <img src={creator.avatar || 'https://randomuser.me/api/portraits/women/10.jpg'} alt={creator.name} />
                  <div className="home-marquee-overlay">
                    <h3>{creator.name}</h3>
                    <p>{creator.category}</p>
                    {creator.isVerified && <span className="home-verified-dot">✓ Verified</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Center Title */}
        <div className="home-marquee-title">
          <h2 className="home-marquee-heading">Our Top <span className="gold-text">Creators</span></h2>
        </div>

        {/* Row 2 — Left to Right */}
        {featuredCreators.length > 0 && (
          <div className="home-marquee-row">
            <div className="home-marquee-track home-marquee-right">
              {[...featuredCreators, ...featuredCreators, ...featuredCreators].map((creator, i) => (
                <Link to={`/creators/${creator._id}`} key={`r2-${i}`} className="home-marquee-card">
                  <img src={creator.avatar || 'https://randomuser.me/api/portraits/women/10.jpg'} alt={creator.name} />
                  <div className="home-marquee-overlay">
                    <h3>{creator.name}</h3>
                    <p>{creator.category}</p>
                    {creator.isVerified && <span className="home-verified-dot">✓ Verified</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">What We Offer</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Our Services</h2>
            <p className="section-subtitle">End-to-end solutions for brands and creators to thrive in the digital landscape</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">Learn More <FaArrowRight /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE CAMPAIGNS */}
      <section className="campaigns-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="badge">Live Now</span>
              <h2 className="section-title" style={{ marginTop: 12 }}>Active Campaigns</h2>
              <p style={{ color: 'var(--gray)', marginTop: 8 }}>Apply to top brand campaigns and grow your influence</p>
            </div>
            <Link to="/campaigns" className="btn-primary">All Campaigns <FaArrowRight /></Link>
          </div>
          <div className="campaigns-grid">
            {activeCampaigns.length === 0 ? (
              <p style={{ color: 'var(--gray)', gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
                Start your backend server to load campaigns.
              </p>
            ) : (
              activeCampaigns.map(campaign => (
                <div key={campaign._id} className="campaign-card">
                  {campaign.image && <img src={campaign.image} alt={campaign.title} className="campaign-img" />}
                  <div className="campaign-body">
                    <span className={`status-badge ${campaign.status}`}>{campaign.status}</span>
                    <h3>{campaign.title}</h3>
                    <p>{campaign.description?.slice(0, 100)}...</p>
                    <div className="campaign-meta">
                      <span>💰 ₹{campaign.budget?.toLocaleString()}</span>
                      <span>📱 {campaign.platform?.join(', ')}</span>
                    </div>
                    <Link to="/campaigns" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">Simple Process</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>How It Works</h2>
            <p className="section-subtitle">Get started in just a few simple steps</p>
          </div>
          <div className="steps-grid">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Sign up as a brand or creator and complete your profile with your goals and niche.' },
              { step: '02', title: 'Discover & Connect', desc: 'Browse our curated creator database or apply to brand campaigns that match your niche.' },
              { step: '03', title: 'Collaborate & Create', desc: 'Work together to craft authentic content that resonates with your target audience.' },
              { step: '04', title: 'Track & Grow', desc: 'Monitor campaign performance with real-time analytics and optimize for better ROI.' },
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">Success Stories</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>What Our Clients Say</h2>
            <p className="section-subtitle">Trusted by leading brands across India</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">
                  {Array(t.rating).fill(null).map((_, j) => <FaStar key={j} />)}
                </div>
                <p>"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-bg-shapes">
              <div className="cta-circle c1"></div>
              <div className="cta-circle c2"></div>
            </div>
            <h2>Ready to Grow Your Brand?</h2>
            <p>Join thousands of brands and creators building meaningful partnerships on CreatorsSampark</p>
            <div className="cta-btns">
              <Link to="/register?role=brand" className="btn-primary">
                Start as Brand <FaArrowRight />
              </Link>
              <Link to="/register?role=creator" className="btn-outline">
                Join as Creator
              </Link>
            </div>
            <div className="cta-features">
              {['Free to Get Started', 'Verified Creators', 'Real-Time Analytics', '24/7 Support'].map((f, i) => (
                <span key={i}><FaCheckCircle /> {f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
