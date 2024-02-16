const express = require('express');
const cookieSignature = require('cookie-signature');
const router = express.Router();

// Define middleware
router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Define routes
router.get('/', (req, res) => {
    const token = '12345';
    const secretKey = 'secret-key'; // Ganti dengan kunci rahasia Anda
    
    // Menggunakan cookie-signature untuk menandatangani token
    const signedToken = cookieSignature.sign(token, secretKey);
    
    res.cookie('token', signedToken);
    res.cookie('username', 'admin');
    res.send('Welcome to the admin panel');
});

module.exports = router;
