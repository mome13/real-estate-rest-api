const authController = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  signupValidator,
  signinValidator,
} = require('../validators/authValidator');
const { validate } = require('express-validation');

authController.post('/signup', validate(signupValidator), async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });

    if (isExisting) {
      return res
        .status(500)
        .json({ msg: 'Email is already taken by another user.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });

    const { _id, email } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.status(201).json({ _id, email, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

authController.post('/signin', validate(signinValidator), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json({ msg: 'Wrong credentials. Try again!' });
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(500).json({ msg: 'Wrong credentials. Try again!' });
    }

    const { _id, email } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.status(200).json({ _id, email, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;
