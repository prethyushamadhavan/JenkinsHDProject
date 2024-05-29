const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set the public_html folder as the default home directory
app.use(express.static(path.join(__dirname, 'public_html')));

// Serve a static message when accessing http://localhost:3000
app.get('/', (req, res) => {
    res.send('Welcome to SIT774! This page was served dynamically from the express server.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
