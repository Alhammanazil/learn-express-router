const express = require('express');
const app = express();
const port = 3000;

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/theater', require('./routes/theater'));
app.use('/movies', require('./routes/movies'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});