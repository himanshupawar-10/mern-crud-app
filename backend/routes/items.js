const express = require('express');
const router = express.Router();
const Item = require('../models/item.models.js');


//To CREATE a new note..
router.post('/add', (req, res) => {
  const { title, content, status } = req.body;

  const newNote = new Item({
    title,
    content,
    status: status || 'active',
  });

  newNote.save()
    .then(() => res.json('Note added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

////To READ all exiting notes..
router.get('/', (req, res) => {
  Item.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//To UPDATE an exiting note..
router.put('/update/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(note => {
      note.title = req.body.title;
      note.content = req.body.content;
      note.status = req.body.status || note.status;
      note.save()
        .then(() => res.json('Note updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//To DELETE an exiting note..
router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;