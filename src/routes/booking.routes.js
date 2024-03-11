const express = require('express');
const {
  create,
  getAll,
  getById,
  update,
  updateById,
  remove,
  removeById
} = require('../controllers/booking/booking.controller');
const router = express.Router();

// create new booking
router.post('/', create);

// get all bookings
router.get('/', getAll);

// get booking by id
router.get('/:id', getById);

// update multiple bookings
router.put('/', update);

// update booking by id
router.put('/:id', updateById);

// delete multiple bookings
router.delete('/', remove);

// delete booking by id
router.delete('/:id', removeById);

module.exports = router;
