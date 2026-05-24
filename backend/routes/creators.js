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
      { name: 'Nancy Tyagi', category: 'Fashion & Lifestyle', platform: ['Instagram', 'YouTube'], followers: 850000, location: 'Mumbai', bio: 'Fashion blogger & lifestyle influencer sharing daily style inspiration', motivationLine: 'Fashion is not about brands, it\'s about confidence — wear your dreams, stitch your story.', tags: ['fashion', 'lifestyle', 'beauty'], isFeatured: true, avatar: '/uploads/avatars/nancy-tyagi.jpg', socialLinks: { instagram: 'https://www.instagram.com/nancytyagi___/', youtube: 'https://www.youtube.com/@nancytyagi_' } },
      { name: 'carryminati', category: 'roast, reaction, and commentary videos', platform: ['YouTube', 'Instagram'], followers: 1200000, location: 'Faridabad', bio: 'Indian YouTuber and streamer', motivationLine: 'Toh kaise hain aap log? Sapne dekho nahi, jeeo — keyboard warriors se legends bante hain.', tags: ['gaming', 'roast', 'commentary'], isFeatured: true, avatar: '/uploads/avatars/carryminati.jpg', socialLinks: { instagram: 'https://www.instagram.com/carryminati/', youtube: 'https://www.youtube.com/@CarryMinati' } },
      { name: 'brindasharma', category: 'Food & Travel', platform: ['Instagram', 'YouTube'], followers: 560000, location: 'Delhi', bio: 'Food enthusiast and travel blogger exploring India', motivationLine: 'Har gali ka khana aur har safar ki kahani — zindagi ka asli swad yahi hai.', tags: ['food', 'travel', 'photography'], isFeatured: false, avatar: '/uploads/avatars/brinda-sharma.jpg', socialLinks: { instagram: 'https://www.instagram.com/brindasharma/', youtube: 'https://www.youtube.com/@BrindaSharma' } },
      { name: 'Elvish Yadav', category: 'vlogger, singer, and reality TV personality', platform: ['Instagram', 'YouTube'], followers: 980000, location: 'Gurugram', bio: 'Bigg Boss OTT2 winner, Haryanvi rapper and singer-songwriter.', motivationLine: 'Chhore apna time aayega — mehnat ka koi shortcut nahi hota, bas lage raho.', tags: ['vlogger', 'rapper', 'reality TV personality'], isFeatured: true, avatar: '/uploads/avatars/elvish-yadav.jpg', socialLinks: { instagram: 'https://www.instagram.com/elvish_yadav/', youtube: 'https://www.youtube.com/@TheSocialFactory' } },
      { name: 'Khesari Lal Yadav', category: 'Indian singer and actor', platform: ['Instagram', 'YouTube'], followers: 720000, location: 'Patna', bio: 'Bhojpuri superstar — singing songs and acting in movies', motivationLine: 'Gaon se nikle the sapne lekar, aaj stage duniya hai — talent ki koi seema nahi hoti.', tags: ['singer', 'actor', 'Bhojpuri'], isFeatured: false, avatar: '/uploads/avatars/khesari-lal-yadav.jpg', socialLinks: { instagram: 'https://www.instagram.com/khesari_yadav/?hl=en', youtube: 'https://www.youtube.com/@KhesariMusicWorld' } },
      { name: 'Lakshay chaudhary', category: 'roast, reaction, and commentary videos', platform: ['Instagram', 'YouTube'], followers: 2100000, location: 'Delhi', bio: 'Comedy creator making India laugh every day', motivationLine: 'Sach bolne ki himmat rakho — duniya hasegi bhi aur sunegi bhi.', tags: ['comedy', 'entertainment', 'reels'], isFeatured: true, avatar: '/uploads/avatars/lakshay-chaudhary.jpg', socialLinks: { instagram: 'https://www.instagram.com/lakshayonly/', youtube: 'https://www.youtube.com/@lakshaychaudhary' } },
      { name: 'Nitish Rajput', category: 'YouTuber, Social Media Influencer, Author, Entrepreneur', platform: ['YouTube', 'Instagram'], followers: 430000, location: 'Delhi', bio: 'Informative content creator spreading knowledge and awareness', motivationLine: 'Knowledge is the real wealth — padho, samjho, aur duniya badlo.', tags: ['education', 'learning', 'awareness'], isFeatured: false, avatar: '/uploads/avatars/nitish-rajput.jpg', socialLinks: { instagram: 'https://www.instagram.com/nitishrajpute/', youtube: 'https://www.youtube.com/@NitishRajput' } },
      { name: 'vikanshu tomar', category: 'humorous videos', platform: ['Instagram', 'YouTube'], followers: 514000, location: 'Delhi', bio: 'Creating funny content that makes your day better', motivationLine: 'Hasi sabse badi dawai hai — roz hasao, roz haso, life set hai.', tags: ['comedian', 'entertainment'], isFeatured: false, avatar: '/uploads/avatars/vikanshu-tomar.jpg', socialLinks: { instagram: 'https://www.instagram.com/vikanshuh/', youtube: 'https://www.youtube.com/@VikanshuTomar777' } },
    ];
    await Creator.insertMany(sampleCreators);
    res.json({ message: 'Sample creators seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
