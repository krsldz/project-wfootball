const { Router } = require('express');
const Player = require('../models/player.model');

const router = Router();

router.get('/', async (req, res) => {
  const player = await Player.find().sort({ _id: -1 });
  res.render('players', { player });
});

router.get('/:id/info', async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('card', { player });
});


router.get('/:id/edit', async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.render('edit', { player });
});

router.patch('/:id/edit', async (req, res) => {
  const player = await Player.findByIdAndUpdate(req.params.id, {
    img: req.body.img,
    name: req.body.name,
    birthdate: req.body.birthdate,
    nationality: req.body.nationality,
    height: req.body.height,
    position: req.body.position,
    club: req.body.club,
    trophy: req.body.trophy,
    transfer: req.body.transfer,
  }, { new: true });
  return res.json({ isUpdateSuccessful: true, player: player._id });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Player.findByIdAndRemove(id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
