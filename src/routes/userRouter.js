const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const saltRound = 10;

const router = Router();

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  const {
    username, email, password,
  } = req.body;
  if (username && email && password) {
    const hash = await bcrypt.hash(password, saltRound);
    const newUser = await User.create({
      username,
      email,
      password: hash,
    });
    if (newUser) {
      req.session.user = {
        id: newUser._id, username: newUser.username,
      };
      return res.redirect('/');
    }
  }
  return res.status(418).redirect('/error');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const currentUser = await User.findOne({ email });
    const checkPass = await bcrypt.compare(password, currentUser.password);
    if (checkPass) {
      req.session.user = {
        id: currentUser._id,
        username: currentUser.username,
      };
    } return res.redirect('/');
  } return res.status(418).redirect('/user/signin');
});

router.get('/signin', async (req, res) => {
  res.render('signin');
});

module.exports = router;
