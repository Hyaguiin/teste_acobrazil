require('dotenv').config();
const app = require('./app');
const { PORT } = require('../utils/url');
const sequelize = require('../config/database/db'); 

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err instanceof Error) {
        console.error('[Server error]:', err.message);
      } else {
        console.error('[Unknown server error]');
      }
      process.exit(1);
    });

  } catch (err) {
    if (err instanceof Error) {
      console.error('[Error starting server]:', err.message);
    } else {
      console.error('[Unknown error starting server]');
    }
    process.exit(1);
  }
}

startServer();
