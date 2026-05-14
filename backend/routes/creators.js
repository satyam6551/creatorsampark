const express = require('express');
const router = express.Router();
const Creator = require('../models/Creator');
const { protect } = require('../middleware/auth');

// Get all creators with filters
router.get('/', async (req, res) => {
  try {
    const { category, platform, minFollowers, maxFollowers, search, page = 1, limit = 12 } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (platform) query.platform = { $in: [platform] };
    if (minFollowers || maxFollowers) {
      query.followers = {};
      if (minFollowers) query.followers.$gte = parseInt(minFollowers);
      if (maxFollowers) query.followers.$lte = parseInt(maxFollowers);
    }
    if (search) query.name = { $regex: search, $options: 'i' };
    
    const total = await Creator.countDocuments(query);
    const creators = await Creator.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ isFeatured: -1, followers: -1 });
    
    res.json({ creators, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single creator
router.get('/:id', async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id).populate('user', 'name email');
    if (!creator) return res.status(404).json({ message: 'Creator not found' });
    res.json(creator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create creator profile
router.post('/', protect, async (req, res) => {
  try {
    const creator = await Creator.create({ ...req.body, user: req.user._id });
    res.status(201).json(creator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed sample creators
router.post('/seed/data', async (req, res) => {
  try {
    await Creator.deleteMany({});
    const sampleCreators = [
      { name: 'Priya Sharma', category: 'Fashion & Lifestyle', platform: ['Instagram', 'YouTube'], followers: 850000, engagementRate: 4.2, location: 'Mumbai', bio: 'Fashion blogger & lifestyle influencer sharing daily style inspiration', tags: ['fashion', 'lifestyle', 'beauty'], pricePerPost: 25000, isVerified: true, isFeatured: true, rating: 4.8, totalCampaigns: 45, avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Rahul Verma', category: 'Tech & Gaming', platform: ['YouTube', 'Instagram'], followers: 1200000, engagementRate: 3.8, location: 'Bangalore', bio: 'Tech reviewer & gaming content creator', tags: ['tech', 'gaming', 'gadgets'], pricePerPost: 35000, isVerified: true, isFeatured: true, rating: 4.9, totalCampaigns: 62, avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Ananya Singh', category: 'Food & Travel', platform: ['Instagram', 'YouTube'], followers: 560000, engagementRate: 5.1, location: 'Delhi', bio: 'Food enthusiast and travel blogger exploring India', tags: ['food', 'travel', 'photography'], pricePerPost: 18000, isVerified: true, isFeatured: false, rating: 4.7, totalCampaigns: 33, avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { name: 'Arjun Mehta', category: 'Fitness & Health', platform: ['Instagram', 'YouTube'], followers: 980000, engagementRate: 4.5, location: 'Pune', bio: 'Certified fitness trainer and nutrition expert', tags: ['fitness', 'health', 'wellness'], pricePerPost: 28000, isVerified: true, isFeatured: true, rating: 4.9, totalCampaigns: 55, avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { name: 'Kavya Reddy', category: 'Beauty & Skincare', platform: ['Instagram', 'YouTube'], followers: 720000, engagementRate: 5.8, location: 'Hyderabad', bio: 'Beauty artist and skincare enthusiast', tags: ['beauty', 'skincare', 'makeup'], pricePerPost: 22000, isVerified: true, isFeatured: false, rating: 4.6, totalCampaigns: 40, avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { name: 'Vikram Nair', category: 'Comedy & Entertainment', platform: ['Instagram', 'YouTube', 'Facebook'], followers: 2100000, engagementRate: 6.2, location: 'Mumbai', bio: 'Comedy creator making India laugh every day', tags: ['comedy', 'entertainment', 'reels'], pricePerPost: 50000, isVerified: true, isFeatured: true, rating: 4.8, totalCampaigns: 78, avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { name: 'Shreya Patel', category: 'Education', platform: ['YouTube', 'Instagram'], followers: 430000, engagementRate: 3.9, location: 'Ahmedabad', bio: 'Teaching complex topics in simple language', tags: ['education', 'learning', 'student'], pricePerPost: 15000, isVerified: false, isFeatured: false, rating: 4.5, totalCampaigns: 25, avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
      { name: 'Dev Kumar', category: 'Music & Dance', platform: ['Instagram', 'YouTube'], followers: 640000, engagementRate: 7.1, location: 'Chennai', bio: 'Classical and contemporary dancer and musician', tags: ['music', 'dance', 'art'], pricePerPost: 20000, isVerified: true, isFeatured: false, rating: 4.7, totalCampaigns: 30, avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
    ];
    await Creator.insertMany(sampleCreators);
    res.json({ message: 'Sample creators seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
