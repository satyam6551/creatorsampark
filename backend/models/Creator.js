const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  category: { type: String, required: true },
  platform: { type: [String], default: ['Instagram'] },
  followers: { type: Number, default: 0 },
  location: { type: String },
  bio: { type: String },
  motivationLine: { type: String },
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
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Creator', creatorSchema);
