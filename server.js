const express = require('express');
const cors = require('cors');

const uuidv4 = require('uuid/v4');
const db = require('./db');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
}); 

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length + 0)]);
}); 

app.get('/testimonials/:id', (req, res) => {
  //res.json(db[req.params.id - 1]);
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
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

app.put('/testimonials/:id', (req, res) => {
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


app.delete('/testimonials/:id', (req, res) => {
  const item = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item);
  db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});



app.get('/concerts', (req, res) => {
  res.json(db.concerts);
}); 

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts.filter(item => item.id == req.params.id));
});

app.post('/concerts', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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



app.delete('/concerts/:id', (req, res) => {
  const item = db.concerts.find(item => item.id == req.params.id);
  const index = db.concerts.indexOf(item);
  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

app.get('/seats', (req, res) => {
  res.json(db.seats);
}); 

app.get('/seats/:id', (req, res) => {
  res.json(db.seats.filter(item => item.id == req.params.id));
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();

  const newSeat = {
    id: id, 
    day: day,
    seat: seat,
    client: client,
    email: email
  }

  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});


app.put('/seats', (req, res) => {
  const { id, day, seat, client, email } = req.body;

  const changedSeat = {
    id: id, 
    day: day,
    seat: seat,
    client: client,
    email: email
  }

  const item = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(item);

  db.seats[index] = changedSeat;

  res.json({ message: 'OK' });
});


app.delete('/seats/:id', (req, res) => {
  const item = db.seats.find(item => item.id == req.params.id);
  const index = db.seats.indexOf(item);
  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

 

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })
  
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

