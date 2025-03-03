
const express = require('express');
const db = require('./database');
const routes = require('./auth/router');
const cors=require('cors');

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",  
    credentials: true, 
  })
);
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api', routes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});