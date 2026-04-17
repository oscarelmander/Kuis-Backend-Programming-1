const mongoose = require('mongoose');

const gachaLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  prize_name: { type: String, default: null },
  is_winner: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GachaLog', gachaLogSchema);
