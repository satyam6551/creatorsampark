import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './About.css';

const team = [
  { name: 'Aryan Kapoor', role: 'Founder & CEO', bio: 'Ex-Google, serial entrepreneur with 10+ years in digital marketing', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { name: 'Nisha Gupta', role: 'Head of Creators', bio: 'Former talent manager at a leading Bollywood production house', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
  { name: 'Rajan Mehta', role: 'Chief Marketing Officer', bio: '15 years experience in brand strategy and influencer marketing', avatar: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'Priyanka Joshi', role: 'Head of Analytics', bio: 'Data scientist passionate about measuring creator marketing ROI', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const values = [
  { icon: '🎯', title: 'Authenticity First', desc: 'Every partnership we facilitate is built on genuine alignment between creator values and brand identity.' },
  { icon: '🚀', title: 'Excellence Always', desc: 'We set the highest standards for every campaign, ensuring brands get exceptional results consistently.' },
  { icon: '🤝', title: 'Creator-First', desc: 'We believe in empowering creators. Their success is our success, and we invest in their long-term growth.' },
  { icon: '📊', title: 'Data Driven', desc: 'Every decision is backed by real data. We track, measure, and optimize to maximize your ROI.' },
];

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <span className="badge">Our Story</span>
          <h1>About <span className="gold-text">CreatorsSampark</span></h1>
          <p>Fueled by creativity, collaboration, and excellence</p>
        </div>
      </div>

      {/* Mission */}
      <section className="mission-section">
        <div className="container mission-grid">
          <div className="mission-text">
            <span className="badge">Our Mission</span>
            <h2 style={{ marginTop: 14 }}>Crafting Unmatched Success for Brands & Creators</h2>
            <p>CreatorsSampark connects creators, influencers, brands, and businesses in a vibrant community focused on growth. We empower talent with exclusive opportunities and collaborations.</p>
            <p>Our expertise in campaign strategy and creative storytelling ensures your brand stands out. We design and execute influencer campaigns that do more than just reach an audience — they build communities and leave a lasting impact.</p>
            <div className="mission-points">
              {['50+ exclusively managed top talents', '200+ successful brand campaigns', '98% client satisfaction rate', 'Real-time ROI tracking & analytics'].map((p, i) => (
                <div key={i} className="mission-point"><FaCheckCircle /> {p}</div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
              Work With Us <FaArrowRight />
            </Link>
          </div>
          <div className="mission-visual">
            <div className="about-stats-card">
              {[
                { num: '500+', label: 'Creators' },
                { num: '200+', label: 'Campaigns' },
                { num: '50M+', label: 'Total Reach' },
                { num: '98%', label: 'Satisfaction' },
              ].map((s, i) => (
                <div key={i} className="about-stat">
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" alt="Team" className="about-image" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">What Drives Us</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="text-center">
            <span className="badge">The People</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Meet Our Team</h2>
            <p className="section-subtitle">Passionate professionals dedicated to your success</p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <img src={member.avatar} alt={member.name} />
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-box">
            <h2>Ready to Collaborate?</h2>
            <p>Join our growing community of top brands and creators</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn-primary">Get Started Free <FaArrowRight /></Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
