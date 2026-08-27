const asyncHandler = require('../utils/asyncHandler');
const { Badge } = require('../models');

const list = asyncHandler(async (req, res) => {
  const badges = await Badge.find().sort({ createdAt: 1 });
  res.json({ success: true, data: { badges } });
});

module.exports = { list };
