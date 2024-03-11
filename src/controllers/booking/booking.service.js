const Booking = require('../../models/booking');

const createBookingService = async (data) => {
  try {
    const query = {
      'roomDetails.roomNo': data.roomDetails.roomNo
    };
    const dbBooking = await findOne(query);
    if (dbBooking.status === 'confirmed' || dbBooking.status === 'pending') {
      throw new Error('this room is not available!');
    }
    const newBooking = new Booking(data);
    const newDbBooking = await newBooking.save();

    return newDbBooking || {};
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBookingsService = async (page = 1, limit = 5) => {
  try {
    const skip = (page - 1) * limit;
    const dbBookings = await Booking.find()
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    return dbBookings || [];
  } catch (error) {
    throw new Error(error);
  }
};

const getBookingByIdService = async (bookingId) => {
  try {
    const dbBooking = await findById(bookingId);
    if (!dbBooking) {
      throw new Error('Booking not found!');
    }
    return dbBooking || {};
  } catch (error) {
    throw new Error(error);
  }
};

const updateBookingService = async (bookingId, bookingData) => {
  try {
    const currentDbBooking = await findOne({ _id: bookingId });
    if (!currentDbBooking) {
      throw new Error('Booking not found!');
    }
    const dbBooking = await findByIdAndUpdate(bookingId, bookingData);

    return dbBooking || {};
  } catch (error) {
    throw new Error(error);
  }
};

const removeBookingByIdService = async (bookingId) => {
  try {
    const dbBooking = await findByIdAndDelete(bookingId);
    if (!dbBooking) {
      throw new Error('No booking found to delete!');
    }
    return dbBooking || {};
  } catch (error) {
    throw new Error(error);
  }
};

const findByIdAndDelete = async (id) => {
  try {
    const dbBooking = await Booking.findByIdAndDelete(id);

    return dbBooking;
  } catch (error) {
    throw new Error(error);
  }
};

const findByIdAndUpdate = async (bookingId, bookingData) => {
  try {
    const dbBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: bookingData },
      { new: true }
    );

    return dbBooking;
  } catch (error) {
    throw new Error(error);
  }
};

const findById = async (id) => {
  try {
    const dbBooking = await Booking.findById(id);

    return dbBooking;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async (query) => {
  try {
    const dbBooking = await Booking.findOne(query);

    return dbBooking;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  removeBookingByIdService
};
