const express = require('express');
const db = require('./database');
const routes = require('./auth/router');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",  
    credentials: true, 
  })
);

// Parse JSON requests
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});