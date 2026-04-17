const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default.
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

// Environment variables should be saved in a file named `.env` in the `./config` directory.
// See `.env.example` for example.
const envFound = dotenv.config({ path: '.env' });
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
  env: process.env.NODE_ENV,
  api: {
    prefix: '/api',
  },
  port: process.env.PORT || 5000,
  database: {
    url:
      process.env.DB_CONNECTION ||
      'mongodb+srv://KuisBackEndPro1:password123456@cluster0.e1q7wf1.mongodb.net/demo-db',
    name: process.env.DB_NAME || 'demo-db',
  },
};
