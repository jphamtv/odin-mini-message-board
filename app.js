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
    id: 1,
    text: 'Vamos!',
    user: 'Charlie',
    added: formatDate(new Date())
  },
  {
    id: 2,
    text: 'Come on!',
    user: 'Stanley',
    added: formatDate(new Date())
  },
];

let lastMessageId = 2;

// Routes
app.get('/', (req, res) => {
  const reversedMessages = [...messages].reverse();
  res.render('index', { title: "Mini Message Board", messages: reversedMessages });
});

app.get('/new', (req, res) => {
  res.render('new_message', { title: "New Message" });
});

app.post('/new', (req, res) => {
  const { messageText, messageUser } = req.body;

  lastMessageId++;
  const newMessage = {
    id: lastMessageId,
    text: messageText,
    user: messageUser,
    added: formatDate(new Date())
  };

  messages.push(newMessage);
  res.redirect('/');
});

app.get('/messages/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find(message => message.id === messageId);

  if (message) {
    res.render('message_details', { title: 'Message Details', message: message });
  } else {
    res.status(404).send('Message not found');
  }
});

// Set port for server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));