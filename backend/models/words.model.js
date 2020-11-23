const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  wclass: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;