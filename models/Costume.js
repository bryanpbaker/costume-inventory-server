const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CostumeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  piecesOwned: {
    type: [String]
  },
  piecesNeeded: {
    type: [String]
  },
  complete: {
    type: Boolean,
    default: false
  }
});

const Costume = mongoose.model('Costume', CostumeSchema);
module.exports = Costume;
