const express = require("express");
const cors = require("cors");
const https = require('https');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require("./config/db.js"); // Import your database connection from db.js
const app = express();





// parse requests of content-type - application/json
// Configure CORS
app.use(cors({
    origin: '*', // Allows all domains
    optionsSuccessStatus: 200,
    credentials: true, // Allows cookies to be sent from the client
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Other middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));




// Endpoint to fetch hashtags for dropdown
app.get('/male', (req, res) => {
    db.query('SELECT * FROM hashtags', (err, results) => {
        if (err) res.status(500).send(err);
        res.json(results);
    });
});


// Endpoint to fetch platforms for dropdown
app.get('/applications', (req, res) => {
    db.query('SELECT * FROM Week_four', (err, results) => {
        if (err) res.status(500).send(err);
        res.json(results);
    });
});





// POST endpoint for form submissions
app.post('/registration', (req, res) => {
    const { fullname, facebook_handle, phone, gender, district, business_idea } = req.body;
    
    if (!fullname || !facebook_handle || !phone || !gender || !district || !business_idea) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    const sql = 'INSERT INTO Week_four (fullname, facebook_handle, phone, gender, district, business_idea) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [fullname, facebook_handle, phone, gender, district, business_idea];

    db.query(sql, values, (error, results, fields) => {
        if (error) {
            return res.status(500).send({ message: error.message });
        }
        res.status(201).send({ message: 'Application submitted successfully!', id: results.insertId });
        console.log("success");
    });
});

// set port, listen for requests
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    
});

