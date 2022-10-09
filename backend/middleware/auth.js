const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/key');
const UnauthorizeError = require('../errors/UnauthorizeError');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizeError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizeError(ERROR_MESSAGE.UNAUTHORIZED));
  }

  req.user = payload; // payload assigned to request object

  return next();
};

module.exports = auth;
