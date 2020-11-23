const mongoose = require('mongoose');
const { model } = require('./words.model');

const Schema = mongoose.Schema;

const phraseSchema = new Schema({
  words: {
    type: [String],
    required: true,
    minlength: 2,
  },
  wildcard_pos: {
    type: Number,
    required: true,
  },
  wildcard_class: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Phrase = mongoose.model('Phrase', phraseSchema);

module.exports = Phrase;