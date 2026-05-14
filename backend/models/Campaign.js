const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  category: { type: String },
  budget: { type: Number },
  platform: [String],
  status: { type: String, enum: ['active', 'completed', 'draft'], default: 'active' },
  startDate: Date,
  endDate: Date,
  requirements: String,
  image: String,
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
