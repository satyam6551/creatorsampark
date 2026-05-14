const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  category: { type: String, required: true },
  platform: { type: [String], default: ['Instagram'] },
  followers: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 },
  location: { type: String },
  bio: { type: String },
  avatar: { type: String },
  coverImage: { type: String },
  socialLinks: {
    instagram: String,
    youtube: String,
    twitter: String,
    facebook: String,
    tiktok: String
  },
  tags: [String],
  pricePerPost: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  totalCampaigns: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Creator', creatorSchema);
