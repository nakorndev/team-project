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

app.get('/member', (req, res) => {
  res.send('Member page');
});

const users = [];

app.post('/sign-up', (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    res.status(400).send('The user already exist');
  } else {
    const newUser = { name, email, password, id: users.length + 1 };
    users.push(newUser);
    res.send(newUser);
  }
});

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(user => user.email === email && user.password === password);
  if (existingUser) {
    res.send(existingUser);
  } else {
    res.status(400).send('Wrong credential');
  }
});

app.get('/admin', (req, res) => {
  res.send('Admin page');
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
