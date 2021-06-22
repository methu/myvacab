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

router.route('/:id').get((req, res) => {
  Word.findById(req.params.id)
    .then(word => res.json(word))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').put((req, res) => {
  Word.findById(req.params.id)
    .then(word => {
      word.title = req.body.title;
      word.wclass = req.body.wclass;
      word.quote = req.body.quote;

      word.save()
        .then(() => res.json('Word updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
})

router.route('/:id').delete((req, res) => {
  Word.findByIdAndDelete({_id:req.params.id})
    .then(() => res.json('Word deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;