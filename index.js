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

app.get('/admin', (req, res) => {
  res.send('Admin page');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with actual admin credentials validation logic
  const isAdmin = username === 'admin' && password === 'admin123';

  if (isAdmin) {
    res.send({ success: true, message: 'Logged in as admin' });
  } else {
    res.status(401).send({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/admin/books', (req, res) => {
  const { username, password } = req.headers;
  // Replace with actual admin credentials validation logic
  const isAdmin = username === 'admin' && password === 'admin123';

  if (isAdmin) {
    res.send(books);
  } else {
    res.status(401).send({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { title, author, id: books.length + 1 };
  books.push(newBook);
  res.send(newBook);
});

app.get('/books', (req, res) => {
  res.send(books);
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

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const index = books.findIndex(book => book.id === Number(id));
  if (index > -1) {
    books[index] = { title, author, id: Number(id) };
    res.send(books[index]);
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
