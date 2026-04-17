const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  total_quota: { type: Number, required: true },
  remaining_quota: { type: Number, required: true },
});

module.exports = mongoose.model('Prize', prizeSchema, 'prizes');
