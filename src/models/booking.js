const mongoose = require('mongoose');
const {
  roomType,
  bookingStatus,
  paymentStatus: paymentStatusConstant
} = require('../utils/constants');

const { Schema } = mongoose;

const customerDetailSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  }
});

const bookingSchema = new Schema(
  {
    customerDetails: customerDetailSchema,
    roomDetails: {
      roomType: { type: String, enum: Object.values(roomType), required: true },
      roomNo: { type: String, required: true }
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(bookingStatus),
      required: true
    },
    paymentStatus: {
      type: String,
      enum: Object.values(paymentStatusConstant),
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
