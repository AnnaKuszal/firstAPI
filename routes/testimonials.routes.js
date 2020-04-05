const express = require('express');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length + 0)]);
}); 


router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();

  const newTestimonial = {
    id: id, 
    author: author, 
    text: text
  }

  db.testimonials.push(newTestimonial);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;

  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
  }

  const item = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item);

  db.testimonials[index] = changedTestimonial;

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const item = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item);
  db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});


module.exports = router;