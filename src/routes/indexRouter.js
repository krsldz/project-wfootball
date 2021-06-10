const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
  res.render('index');
});

router.get('/error', async (req, res) => {
  res.render('error');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get('cookieName'));
  res.redirect('/');
});

module.exports = router;
