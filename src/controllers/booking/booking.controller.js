const { BookingDto } = require('./booking.dto');
const {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  removeBookingByIdService
} = require('./booking.service');

// create new booking
const create = async (req, res) => {
  // we are supposing user is authorized
  try {
    const { body: data } = req;
    // data validation
    new BookingDto(data).createBookingDto();
    const dbBooking = await createBookingService(data);

    return res.status(201).json({ status: 'success', data: dbBooking });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// get all bookings with pagination
const getAll = async (req, res) => {
  // we are supposing user is authorized
  try {
    const { page, limit } = req.query;
    const dbBookings = await getAllBookingsService(page, limit);

    return res.status(200).json({ status: 'success', data: dbBookings });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// get one booking by id
const getById = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const dbBooking = await getBookingByIdService(bookingId);

    return res.status(200).json({ status: 'success', data: dbBooking });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// update multiple bookings
const update = async (req, res) => {
  try {
    const { body: bookingsData } = req;
    const finalDbBookings = [];
    for (const bookingData of bookingsData) {
      const { id: bookingId, data: updatedBookingData } = bookingData;
      new BookingDto(updatedBookingData).updateBookingDto();
      const dbBooking = await updateBookingService(
        bookingId,
        updatedBookingData
      );
      finalDbBookings.push(dbBooking);
    }

    return res.status(200).json({ status: 'success', data: finalDbBookings });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// updaet booking by id
const updateById = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const { body: bookingData } = req;
    new BookingDto(bookingData).updateBookingDto();

    const dbBooking = await updateBookingService(bookingId, bookingData);

    return res.status(200).json({ status: 'success', data: dbBooking });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// remove multiple bookings
const remove = async (req, res) => {
  try {
    const { body: bookingIds } = req;
    const dbBookings = [];
    for (const bookingId of bookingIds) {
      const dbBooking = await removeBookingByIdService(bookingId);
      dbBookings.push(dbBooking);
    }

    return res.status(200).json({ status: 'success', data: dbBookings });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

// delete booking by id
const removeById = async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    const dbBooking = await removeBookingByIdService(bookingId);

    return res.status(200).json({ status: 'success', data: dbBooking });
  } catch (error) {
    return res.status(500).json({ status: 'failed!', message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  updateById,
  remove,
  removeById
};
