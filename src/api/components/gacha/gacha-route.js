const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  // POST /api/gacha
  route.post('/', gachaController.postGacha);

  // POST /api/gacha/history/:username
  route.get('/history/:username', gachaController.getHistory);

  // POST /api/gacha/prizes
  route.get('/prizes', gachaController.getPrizes);

  // POST /api/gacha/winners
  route.get('/winners', gachaController.getWinners);
};
