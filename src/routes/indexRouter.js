const { Router } = require('express');
// const unirest = require('unirest');
const Address = require('../models/map.model');

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

// const req = unirest('GET', 'https://api-football-v1.p.rapidapi.com/v3/leagues');

// req.query({
//   country: 'RUSSIA',
// });

// req.headers({
//   'x-rapidapi-key': 'd18fddd587msh7b7e34a728042aep18e31djsnfcae24ff79ef',
//   'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
//   useQueryString: true,
// });

// req.end((res) => {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body.response[9].seasons[1]);
// });

router.get('/error', (req, res) => {
  res.render('error');
});

router.get('/map', async (req, res) => {
  const address = await Address.find();
  res.render('map', { address });
});

router.post('/map', async (req, res) => {
  const allMaps = await Address.find();
  res.json(allMaps);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie(req.app.get('cookieName'));
  res.redirect('/');
});

router.get('/news', (req, res) => {
  res.render('news');
});

module.exports = router;
