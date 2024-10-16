// app.js

const express = require('express');
const path = require('node:path');
const db = require('./db/queries');
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

// Routes
app.get('/', async (req, res) => {
  try {
    const messages = await db.getAllMessages();

    // Format the date for each message
    const formattedMessages = messages.map(message => ({ ...message, formatted_date: formatDate(message.date_added) }));

    console.log('Formatted Messages: ', formattedMessages);
    // const reversedMessages = [...messages].reverse();
    res.render('index', { title: "Mini Message Board", messages: formattedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('An error occurred while fetching messages');
  }
});

app.get('/new', (req, res) => {
  res.render('new_message', { title: "New Message" });
});

app.post('/new', async (req, res) => {
  const { username, message } = req.body;

  try {
    await db.insertMessage(username, message);
    res.redirect('/');
  } catch (error) {
    console.log('Error inserting message: ', error);
    res.status(500).send('An error occurred while storing message');
  }
});

app.get('/messages/:id', async (req, res) => {
  const messageId = parseInt(req.params.id);

  try {
    const message = await db.getMessage(messageId);
    if (message) {
      const formattedMessage = { ...message, formatted_date: formatDate(message.date_added) };
      res.render('message_details', { title: 'Message Details', message: formattedMessage });
    } else {
      res.status(404).send('Message not found');
    }
  } catch (error) {
    console.log('Error fetching message: ', error);
    res.status(500).send('An error occurred while fetching the message');
  }
});

// Set port for server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));