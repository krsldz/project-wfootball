const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  balloon: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
});



module.exports = mongoose.model('Map', mapSchema);
