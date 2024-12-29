const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { PORT, NODE_ENV } = require('./server/config/config');
const { sequelize } = require('./server/models');

const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await app.prepare();
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('Shutting down gracefully...');
      await sequelize.close();
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error('Error during server initialization:', error);
    process.exit(1);
  }
}

bootstrap();
