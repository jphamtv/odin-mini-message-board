// app.js

const express = require('express');
const path = require('node:path');
const formatDate = require('./utils/date_format_utils');

// Create express app
const app = express();

// Enable EJS as view engine and look for templates in 'views' directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Enable static assets and look for assets in the 'public' directory
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// Parses form payloads and sets it to the 'req.body'
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: 'Vamos!',
    user: 'Charlie',
    added: formatDate(new Date())
  },
  {
    text: 'Come on!',
    user: 'Stanley',
    added: formatDate(new Date())
  },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messages: messages });
});

app.get('/new', (req, res) => {
  res.render('new_message', { title: "New Message" });
});

app.post('/new', (req, res) => {
  messages.push({ text: req.body.messageText, user: req.body.messageUser, added: formatDate(new Date()) });
  res.redirect('/');
});

// Set port for server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));