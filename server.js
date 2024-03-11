require('dotenv').config();
const express = require('express');
const app = express();

const allRoutes = require('./src/routes');
const connectDB = require('./src/config/db');

// json/body parser
app.use(express.json());

//db connection
connectDB();

// route handler
app.use('/api/v1', allRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
