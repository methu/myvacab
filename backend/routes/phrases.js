const router = require('express').Router();
let Phrase = require('../models/phrases.model');

router.route('/').get((req, res) => {
  Phrase.find()
    .then(phrases => res.json(phrases))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const words = req.body.words;
  const wildcard_pos = req.body.wildcard_pos;
  const wildcard_class = req.body.wildcard_class;
  const newPhrase = new Phrase({words, wildcard_pos, wildcard_class});

  newPhrase.save()
    .then(() => res.json('Phrase added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Phrase.findById(req.params.id)
    .then(phrase => res.json(phrase))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  Phrase.findById(req.params.id)
    .then(phrase => {
      phrase.words = req.body.words;
      phrase.wildcard_pos = req.body.wildcard_pos;
      phrase.wildcard_class = req.body.wildcard_class;

      phrase.save()
        .then(() => res.json('Phrase updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
})

router.route('/:id').delete((req, res) => {
  Phrase.findOneAndDelete({_id:req.params.id})
    .then(() => res.json('Phrase deleted.'))
    .catch(err => res.status(400).json('Error: '));
});

module.exports = router;