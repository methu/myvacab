const router = require('express').Router();
let Word = require('../models/words.model');

router.route('/').get((req, res) => {
  Word.find()
    .then(words => res.json(words))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const wclass = req.body.wclass;
  const quote = req.body.quote;
  const newWord = new Word({title, wclass, quote});

  newWord.save()
    .then(() => res.json('Word added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;