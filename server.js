const express = require('express');
const cors = require('cors');

const uuidv4 = require('uuid/v4');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 4, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 5, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 6, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const randomId = Math.floor(Math.random() * 6 + 0)

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db);
}); 

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length + 0)]);
}); 

app.get('/testimonials/:id', (req, res) => {
  //res.json(db[req.params.id - 1]);
  res.json(db.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();

  const newTestimonial = {
    id: id, 
    author: author, 
    text: text
  }

  db.push(newTestimonial);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;

  const changedTestimonial = {
    id: req.params.id, 
    author: author, 
    text: text
  }

  const opinion = db.find(item => item.id == req.params.id);
  const index = db.indexOf(opinion);

  db[index] = changedTestimonial;

  res.json({ message: 'OK' });
});


app.delete('/testimonials/:id', (req, res) => {
  const opinion = db.find(item => item.id == req.params.id);
  const index = db.indexOf(opinion);
  db.splice(index, 1);

  res.json({ message: 'OK' });
});
  

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })
  
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

