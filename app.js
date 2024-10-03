// app.js

const express = require('express');
const path = require('node:path');

// Create express app
const app = express();

// Enable EJS as view engine and look for templates in 'views' directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Parses form payloads and sets it to the 'req.body'
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: 'Vamos!',
    user: 'Charlie',
    added: new Date()
  },
  {
    text: 'Come on!',
    user: 'Stanley',
    added: new Date()
  },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: "New Message", links: links });
});

app.post('/new', (req, res) => {
  messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });
  res.redirect('/');
});

// Set port for server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));