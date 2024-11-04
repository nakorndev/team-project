const express = require('express');
const app = express();

const books = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/contact', (req, res) => {
  res.send('Contact page');
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { title, author, id: books.length + 1 };
  books.push(newBook);
  res.send(newBook);
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const foundBook = books.find(book => book.id === Number(id));
  if (foundBook) {
    res.send(foundBook);
  } else {
    res.status(404).send({});
  }
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id === Number(id));
  if (index > -1) {
    books.splice(index, 1);
    res.send({ success: true });
  } else {
    res.status(404).send({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
