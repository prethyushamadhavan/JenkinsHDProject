const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public_html directory
app.use(express.static(path.join(__dirname, '../public_html')));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/Website.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export the app for testing
