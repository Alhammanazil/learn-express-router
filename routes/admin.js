const express = require('express');
const router = express.Router();

// Define middleware
router.use((req, res, next) => {
    if (req.query.api_key) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to the admin panel');
});

module.exports = router;