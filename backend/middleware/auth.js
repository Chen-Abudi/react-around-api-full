const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/key');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(ERROR_CODE.UNAUTHORIZED_ERROR)
      .send(ERROR_MESSAGE.UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    res.status(ERROR_CODE.UNAUTHORIZED_ERROR).send(ERROR_MESSAGE.UNAUTHORIZED);
  }

  req.user = payload; // payload assigned to request object

  return next();
};

module.exports = auth;
