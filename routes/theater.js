const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Welcome to the theater');
});

router.get('/create', (req, res) => {
    res.send('Create a new movie');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('Movie has been added to the theater');
});

router.get('/:id', (req, res) => {
    res.send(`Movie with ID ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Update movie with ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete movie with ID ${req.params.id}`);
});

// Error handling
router.use((req, res, next) => {
    res.status(404).send('Route not found');
});

module.exports = router;