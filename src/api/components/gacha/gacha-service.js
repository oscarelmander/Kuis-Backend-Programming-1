const gachaRepository = require('./gacha-repository');

async function runGacha(username) {
  const gachaCount = await gachaRepository.countUserGachaToday(username);
  if (gachaCount >= 5) {
    throw new Error('DAILY_LIMIT_REACHED');
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();
  const chance = 0.3;
  const isLucky = Math.random() < chance;

  let wonPrize = null;

  if (isLucky && availablePrizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    wonPrize = availablePrizes[randomIndex];
  }

  const result = await gachaRepository.saveGachaResult(
    username,

    wonPrize ? wonPrize._id : null,
    wonPrize ? wonPrize.name : null
  );

  return result;
}

async function getPrizeStats() {
  const prizes = await gachaRepository.getAvailablePrizes();
  return prizes.map((p) => ({
    hadiah: p.name,
    sisa: p.remaining_quota,
  }));
}

async function getUserHistory(username) {
  return gachaRepository.getUserHistory(username);
}

async function getWinnersList() {
  return gachaRepository.getAllWinners();
}

module.exports = {
  runGacha,
  getPrizeStats,
  getUserHistory,
  getWinnersList,
};
