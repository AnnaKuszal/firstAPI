const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();

  const newConcert = {
    id: id, 
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image
  }

  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const changedConcert = {
    id: id, 
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image
  }

  const item = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(item);

  db.concerts[index] = changedConcert;

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const item = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(item);
  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;