// const winston = require('winston');
// const expressWinston = require('express-winston');

// const fs = require('fs');

// const logDir = './logs';

// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

// const requestLogger = expressWinston.logger({
//   transports: [new winston.transports.File({ filename: './logs/request.log' })],
//   format: winston.format.json(),
// });

// const errorLogger = expressWinston.errorLogger({
//   transports: [new winston.transports.File({ filename: './logs/error.log' })],
//   format: winston.format.json(),
// });

// module.exports = {
//   requestLogger,
//   errorLogger,
// };

const winston = require('winston');
const expressWinston = require('express-winston');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'data', 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'request.log'),
    }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
