const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model('Tournament', tourSchema);
