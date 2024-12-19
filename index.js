const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const filesDir = path.join(__dirname, 'files');
const publicDir = path.join(__dirname, 'public');

// Serve static files (CSS, JS, etc.)
app.use(express.static(publicDir));

// Serve files from the "files" directory
app.use('/files', express.static(filesDir));

// API to get the list of files
app.get('/api/files', (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan files directory.' });
    }
    res.json(files);
  });
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
