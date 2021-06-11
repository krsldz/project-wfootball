const { Router } = require('express');
const Tournament = require('../models/tournament.model');

const router = Router();

router.get('/', async (req, res) => {
  const tour = await Tournament.find();
  res.render('tournament', { tour });
});

router.get('/:id/info', async (req, res) => {
  const tour = await Tournament.findById(req.params.id);
  res.render('tourdetail', { tour });
});

module.exports = router;
