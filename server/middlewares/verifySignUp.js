import db from '../models/index.js';

const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for existing username.
    const userWithUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userWithUsername) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Check for existing email.
    const userWithEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userWithEmail) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: error.message,
    });
  }
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};
