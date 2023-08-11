import winston from 'winston';

// Define the logger configuration
export const logger = winston.createLogger({
  level: 'info', // Set the minimum logging level
  format: winston.format.combine(
    winston.format.colorize(), // Colorize the log output
    winston.format.timestamp(), // Add timestamp to log messages
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: 'logs/logfile.log' }) // Output logs to a file
  ]
});

// // Usage
// logger.info('This is an info message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');