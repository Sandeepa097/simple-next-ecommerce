import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { PORT, NODE_ENV } from './server/config/config.mjs';

import { sequelize } from './server/models/index.mjs';

const dev = NODE_ENV !== 'production';

function bootstrap() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch((error) =>
      console.error('Unable to connect to the database:', error)
    );

  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(PORT);

    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
