const express = require('express');
const router = express.Router();

// Define middleware
router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.status(401).send('Unauthorized');
});

// Define routes
router.get('/', (req, res) => {
    res.cookie('token', '12345')
    res.cookie('username', 'admin')
    res.send('Welcome to the admin panel');
});

module.exports = router;