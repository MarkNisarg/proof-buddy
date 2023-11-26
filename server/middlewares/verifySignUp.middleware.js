import db from '../models/index.js';

const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for existing username.
    const userWithUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (userWithUsername) {
      return res.status(400).send({
        message: 'Username is already exists. Try another?'
      });
    }

    // Check for existing email.
    const userWithEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userWithEmail) {
      return res.status(400).send({
        message: 'Email is already exists. Try another? '
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: 'Error verifying sign-up information'
    });
  }
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail
};
