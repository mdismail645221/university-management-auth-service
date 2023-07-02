import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf, prettyPrint } = format;
// custom formet
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${date.toString()} :  ${hour} (H) :  ${minutes} (M) :  ${second} (S) [${label}] ${level}: ${message}`;
});

const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UNIVERSITY MANAGEMENT APPLICATIONS LOGGER' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        `logs`,
        `winston`,
        `successes`,
        `UM-%DATE%-success.log`
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UNIVERSITY MANAGEMENT APPLICATIONS LOGGER' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        `logs`,
        `winston`,
        `errors`,
        `UM-%DATE%-error.log`
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { errorLogger, infoLogger };
