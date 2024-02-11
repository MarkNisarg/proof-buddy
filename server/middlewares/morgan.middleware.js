import morgan from 'morgan';
import logger from '../config/logger.config.js';

const morganAPILogger = (app) => {
  // A custom logging format for Morgan.
  const morganFormat = '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';

  // Configure Morgan to log HTTP requests using Winston.
  app.use(morgan(morganFormat, {
    stream: {
      write: (message) => logger.http(message.trim())
    }
  }));
};

export default morganAPILogger;
