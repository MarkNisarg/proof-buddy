import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';

// Verify token coming through request header.
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(403).send({
      message: 'A token is required for authentication.'
    });
  }

  const bearerToken = bearerHeader.split(' ')[1];
  if (!bearerToken) {
    return res.status(403).send({
      message: 'No token provided.'
    });
  }

  jwt.verify(bearerToken, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized token provided.'
      });
    }
    req.username = decoded.username;
    next();
  });
};

export const authenticateToken = {
  verifyToken
};
