const gachaService = require('./gacha-service');

const { maskName } = require('../../../utils/masking');

async function getHistory(req, res, next) {
  try {
    const { username } = req.params;
    const history = await gachaService.getUserHistory(username);
    return res.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const winners = await gachaService.getWinnersList();
    const maskedWinners = winners.map((w) => ({
      username: maskName(w.username),
      hadiah: w.prize_name,
      tanggal: w.created_at,
    }));
    return res.status(200).json(maskedWinners);
  } catch (error) {
    return next(error);
  }
}

async function postGacha(req, res, next) {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const result = await gachaService.runGacha(username);

    if (result.is_winner) {
      return res.status(200).json({
        message: 'Selamat! Anda menang.',
        hadiah: result.prize_name,
      });
    }
    return res.status(200).json({
      message: 'Maaf, coba lagi besok!',
      hadiah: 'Zonks',
    });
  } catch (error) {
    if (error.message === 'DAILY_LIMIT_REACHED') {
      return res
        .status(403)
        .json({ error: 'Batas harian tercapai (maksimal 5 kali)' });
    }
    return next(error);
  }
}

async function getPrizes(req, res, next) {
  try {
    const prizes = await gachaService.getPrizeStats();
    return res.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  postGacha,
  getWinners,
  getHistory,
  getPrizes,
};
