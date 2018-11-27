const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const mongoose = require('mongoose');
const locks = require('./routes/locks');
const users = require('./routes/users');
const auth = require('./routes/auth');
const events = require('./routes/events');

const app = express();

mongoose.connect('mongodb://localhost/smartlock', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(__dirname, {dotfiles: 'allow'} ));
app.use(express.json());
app.use('/api/locks', locks);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sdsmartlock.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sdsmartlock.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sdsmartlock.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
