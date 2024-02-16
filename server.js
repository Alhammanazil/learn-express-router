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
    cookie: { secure: true }
}));

// Define routes
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

app.use('/theater', require('./routes/theater'));
app.use('/movies', require('./routes/movies'));
app.use('/admin', require('./routes/admin'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});