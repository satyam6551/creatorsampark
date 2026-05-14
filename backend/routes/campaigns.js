const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { status, category, platform, page = 1, limit = 9 } = req.query;
    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (platform) query.platform = { $in: [platform] };
    
    const total = await Campaign.countDocuments(query);
    const campaigns = await Campaign.find(query)
      .populate('brand', 'name company')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    res.json({ campaigns, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('brand', 'name company');
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const campaign = await Campaign.create({ ...req.body, brand: req.user._id });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed/data', async (req, res) => {
  try {
    await Campaign.deleteMany({});
    const sampleCampaigns = [
      { title: 'Festival Season Fashion Campaign', description: 'Looking for fashion influencers to showcase our festive collection. Create 3 Instagram posts and 2 reels featuring our traditional wear.', category: 'Fashion', budget: 150000, platform: ['Instagram'], status: 'active', requirements: 'Min 100K followers, Fashion niche', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600' },
      { title: 'Healthy Snacks YouTube Review', description: 'Partner with us to review our new range of healthy snacks. Create an honest review video showcasing taste and nutrition benefits.', category: 'Food & Health', budget: 80000, platform: ['YouTube'], status: 'active', requirements: 'Food/Health niche, 50K+ subscribers', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600' },
      { title: 'Travel App Launch Campaign', description: 'Help us launch our new travel planning app. Create engaging content about your travel experiences using our app.', category: 'Travel & Tech', budget: 200000, platform: ['Instagram', 'YouTube'], status: 'active', requirements: 'Travel niche, 200K+ followers', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600' },
      { title: 'Fitness Equipment Unboxing', description: 'Unbox and review our premium home gym equipment. Show your workout routine using our products.', category: 'Fitness', budget: 120000, platform: ['YouTube', 'Instagram'], status: 'active', requirements: 'Fitness influencer, 75K+ followers', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600' },
      { title: 'Beauty Brand Collaboration', description: 'Create tutorials using our new skincare line. Share your honest experience and skincare routine.', category: 'Beauty', budget: 95000, platform: ['Instagram', 'YouTube'], status: 'completed', requirements: 'Beauty niche, female audience', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600' },
      { title: 'Tech Gadget Review Series', description: 'Review our latest smartphone accessories across 3 videos. Detailed tech breakdown required.', category: 'Technology', budget: 180000, platform: ['YouTube'], status: 'active', requirements: 'Tech reviewer, 100K+ YouTube subscribers', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600' },
    ];
    await Campaign.insertMany(sampleCampaigns);
    res.json({ message: 'Sample campaigns seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
