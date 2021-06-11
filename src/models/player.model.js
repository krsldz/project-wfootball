const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  trophy: {
    type: String,
    required: true,
  },
  transfer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Player', playerSchema);
