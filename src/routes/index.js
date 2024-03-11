const express = require('express');
const router = express.Router();

const bookingRoutes = require('./booking.routes.js');

router.use('/booking', bookingRoutes);

module.exports = router;