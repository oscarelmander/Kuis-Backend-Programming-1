const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const Prize = require('../models/prize-schema');
const config = require('../core/config');

const prizes = [
  { name: 'Emas 10 gram', total_quota: 1, remaining_quota: 1 },
  { name: 'Smartphone X', total_quota: 5, remaining_quota: 5 },
  { name: 'Smartwatch Y', total_quota: 10, remaining_quota: 10 },
  { name: 'Voucher Rp100.000', total_quota: 100, remaining_quota: 100 },
  { name: 'Pulsa Rp50.000', total_quota: 500, remaining_quota: 500 },
];

async function seedDB() {
  try {
    const dbUri = config.database.url;
    const dbName = config.database.name || 'demo-db';

    if (!dbUri) {
      throw new Error('Database URL tidak ditemukan di config');
    }

    await mongoose.connect(dbUri, { dbName });

    await Prize.deleteMany({});
    await Prize.insertMany(prizes);

    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}

seedDB();
