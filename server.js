// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Dummy user data
const users = require('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');

// Endpoint to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
