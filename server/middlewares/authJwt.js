import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

// Verify token coming through request header.
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.username = decoded.username;
    next();
  });
};

export const authJwt = {
  verifyToken
};
