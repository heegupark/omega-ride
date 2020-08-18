const mongoose = require('mongoose');

const gramSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  imgUrl: {
    type: String,
    required: false,
    trim: true
  },
  thumbnailImgUrl: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

const Ride = mongoose.model('Ride', gramSchema);

module.exports = Ride;
