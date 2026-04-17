const GachaLog = require('../../../models/gacha-log-schema');
const Prize = require('../../../models/prize-schema');

async function countUserGachaToday(username) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return GachaLog.countDocuments({
    username,
    created_at: { $gte: startOfDay, $lte: endOfDay },
  });
}

async function getAvailablePrizes() {
  const prizes = await Prize.find({ remaining_quota: { $gt: 0 } });
  return prizes;
}

async function saveGachaResult(username, prizeId, prizeName) {
  if (prizeId) {
    await Prize.updateOne({ _id: prizeId }, { $inc: { remaining_quota: -1 } });
  }

  return GachaLog.create({
    username,
    prize_name: prizeName,
    is_winner: !!prizeName,
  });
}

async function getUserHistory(username) {
  return GachaLog.find({ username }).sort({ created_at: -1 });
}

async function getAllWinners() {
  return GachaLog.find({ is_winner: true }).select(
    'username prize_name created_at'
  );
}

module.exports = {
  countUserGachaToday,
  getAvailablePrizes,
  saveGachaResult,
  getUserHistory,
  getAllWinners,
};
