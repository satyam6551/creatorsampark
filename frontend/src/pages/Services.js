import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './Services.css';

const services = [
  {
    icon: '🎯',
    title: 'Talent Management',
    tagline: 'Empowering creators to shine globally',
    desc: 'We exclusively manage 50+ top talents across all niches, providing end-to-end support including contract negotiations, brand deals, content strategy, and personal branding.',
    features: ['Dedicated talent manager', 'Contract & legal support', 'Revenue optimization', 'Personal brand building', 'Media kit creation', 'PR & publicity'],
    color: '#7c3aed',
  },
  {
    icon: '📣',
    title: 'Influencer Marketing',
    tagline: 'Authentic campaigns that drive real results',
    desc: 'Connect your brand with the perfect influencers. We handle everything from creator discovery and outreach to campaign execution and performance reporting.',
    features: ['Creator discovery & vetting', 'Campaign strategy', 'Content approval workflow', 'Multi-platform execution', 'Real-time tracking', 'ROI reporting'],
    color: '#db2777',
  },
  {
    icon: '💡',
    title: 'Content Strategy',
    tagline: 'Stories that capture and convert',
    desc: 'Our expertise in campaign strategy and creative storytelling ensures your brand stands out. We design campaigns that build communities and leave lasting impact.',
    features: ['Content calendar planning', 'Brand voice development', 'Trending formats & hooks', 'Viral content frameworks', 'Platform-specific strategies', 'A/B content testing'],
    color: '#0891b2',
  },
  {
    icon: '📊',
    title: 'Campaign Analytics',
    tagline: 'Real-time metrics to track ROI',
    desc: 'Track CPC, CPV, CTR across all your campaigns with our advanced analytics dashboard. Make data-driven decisions to optimize spend and maximize returns.',
    features: ['Real-time dashboard', 'CPC, CPV, CTR tracking', 'Audience insight reports', 'Competitor analysis', 'Monthly performance reports', 'ROI optimization tips'],
    color: '#059669',
  },
  {
    icon: '🤝',
    title: 'Brand Collaborations',
    tagline: 'Perfect brand-creator matchmaking',
    desc: 'We match brands with creators whose values and audiences align perfectly. From barter collaborations to large-scale paid partnerships, we manage end to end.',
    features: ['Creator-brand matching', 'Collaboration structuring', 'NDA & contract drafting', 'Deliverable tracking', 'Payment management', 'Post-campaign analysis'],
    color: '#d97706',
  },
  {
    icon: '🎪',
    title: 'Event Management',
    tagline: 'Events that create buzz and lasting impressions',
    desc: 'From product launches and brand activations to creator meetups and award nights, we manage events that generate viral content and media coverage.',
    features: ['Event conceptualization', 'Venue & logistics', 'Creator invitations', 'Live social coverage', 'Media coordination', 'Post-event reporting'],
    color: '#dc2626',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '₹15,000',
    period: '/month',
    desc: 'Perfect for small brands looking to start with influencer marketing',
    features: ['5 Creator connections/month', 'Campaign setup support', 'Basic analytics', 'Email support', '1 Campaign per month'],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '₹45,000',
    period: '/month',
    desc: 'For growing brands ready to scale their influencer programs',
    features: ['20 Creator connections/month', 'Full campaign management', 'Advanced analytics & ROI', 'Priority support', '5 Campaigns per month', 'Content review & approval', 'Monthly strategy call'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large brands with complex influencer marketing needs',
    features: ['Unlimited creator access', 'Dedicated account manager', 'Custom analytics dashboard', '24/7 support', 'Unlimited campaigns', 'Legal & contract support', 'Quarterly strategy sessions', 'Event management included'],
    highlighted: false,
  },
];

const Services = () => {
  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <span className="badge">What We Offer</span>
          <h1>Our <span className="gold-text">Services</span></h1>
          <p>End-to-end solutions for brands and creators to thrive in the digital landscape</p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="services-detail-section">
        <div className="container">
          <div className="services-detail-grid">
            {services.map((s, i) => (
              <div key={i} className="service-detail-card" style={{ '--accent': s.color }}>
                <div className="sd-icon-wrap">
                  <span className="sd-icon">{s.icon}</span>
                  <div className="sd-icon-bg" style={{ background: s.color }}></div>
                </div>
                <div className="sd-body">
                  <span className="sd-tagline" style={{ color: s.color }}>{s.tagline}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="sd-features">
                    {s.features.map((f, j) => (
                      <li key={j}><FaCheckCircle style={{ color: s.color }} /> {f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section-page">
        <div className="container">
          <div className="text-center">
            <span className="badge">Transparent Pricing</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Choose Your Plan</h2>
            <p className="section-subtitle">Simple, transparent pricing with no hidden fees</p>
          </div>
          <div className="plans-grid">
            {plans.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.highlighted && <div className="popular-tag">Most Popular</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <ul className="plan-features">
                  {plan.features.map((f, j) => (
                    <li key={j}><FaCheckCircle /> {f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={plan.highlighted ? 'btn-primary' : 'btn-plan-outline'}>
                  Get Started <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
