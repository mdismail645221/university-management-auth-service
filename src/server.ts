import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, infoLogger } from './shared/logger';

process.on('uncaughtException', error => {
  infoLogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.path, () => {
      infoLogger.info(`Application app listening on port ${config.path}`);
    });
  } catch (error) {
    errorLogger.error(`Server is error now`, error);
  }

  process.on('unhandledRejection', error => {
    console.log(`unhandleRejection`);
    server.close(() => {
      if (server) {
        errorLogger.error(error);
        process.exit(1);
      } else {
        process.exit(1);
      }
    });
  });
}

bootstrap();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM hitted and server is closed');
  if (server) {
    server.close();
  }
});
