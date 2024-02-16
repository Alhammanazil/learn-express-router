const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const session = require('express-session');

// Define port
const port = 3000;

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret-key'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Define routes
app.use('/theater', require('./routes/theater'));
app.use('/movies', require('./routes/movies'));
app.use('/admin', require('./routes/admin'));
app.get('/signingcookie', (req, res) => {
    res.cookie('paket', 'ransel', { signed: true });
    res.send('Cookie has been signed');
});

app.get('/count', (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`Count: ${req.session.count}`);
});

app.get('/verifycookie', (req, res) => {
    const cookies = req.signedCookies;
    res.send(cookies);
});

app.get('/register', (req, res) => {
    const { username } = req.query;
    if (username) {
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.send('Register failed, please provide a username');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome to dashboard ${req.session.username} 👋`);
    } else {
        res.send('You need to login first');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});