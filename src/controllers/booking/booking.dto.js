const Joi = require('joi');
const {
  bookingStatus,
  paymentStatus: paymentStatusEnum,
  roomType: roomTypeEnum
} = require('../../utils/constants');
const { findOne } = require('../../models/booking');

class BookingDto {
  constructor(data) {
    this.data = data;
  }

  createBookingDto() {
    const addressSchema = Joi.object({
      addressLine1: Joi.string().required(),
      addressLine2: Joi.string().optional(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      zipCode: Joi.string().required()
    });

    const customerDetailsSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNo: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      address: addressSchema.required()
    });

    const schema = Joi.object({
      customerDetails: customerDetailsSchema.required(),
      roomDetails: Joi.object({
        roomType: Joi.string().required(),
        roomNo: Joi.string().required()
      }).required(),
      checkInDate: Joi.date().required(),
      checkOutDate: Joi.date().required(),
      price: Joi.number().required(),
      status: Joi.string()
        .valid(...Object.values(bookingStatus))
        .required(),
      paymentStatus: Joi.string()
        .valid(...Object.values(paymentStatusEnum))
        .required()
    });

    const { error } = schema.validate(this.data);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new Error(errors);
    }

    if (new Date(this.data.checkInDate) >= new Date(this.data.checkOutDate)) {
      throw new Error('Check-in date must be before check-out date!');
    }

    return [];
  }

  updateBookingDto() {
    const schema = Joi.object({
      customerDetails: Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phoneNo: Joi.string()
          .pattern(/^[0-9]{10}$/)
          .optional(),
        address: Joi.object({
          addressLine1: Joi.string().optional(),
          addressLine2: Joi.string().optional(),
          city: Joi.string().optional(),
          country: Joi.string().optional(),
          zipCode: Joi.string().optional()
        }).optional()
      }).optional(),
      roomDetails: Joi.object({
        roomType: Joi.string()
          .valid(...Object.values(roomTypeEnum))
          .optional(),
        roomNo: Joi.string().optional()
      }).optional(),
      checkInDate: Joi.date().optional(),
      checkOutDate: Joi.date().optional(),
      price: Joi.number().min(0).optional(),
      status: Joi.string()
        .valid(...Object.values(bookingStatus))
        .optional(),
      paymentStatus: Joi.string()
        .valid(...Object.values(paymentStatusEnum))
        .optional()
    });

    const { error } = schema.validate(this.data);
    if (error) {
      const errors = error.details.map((detail) => detail.message);

      throw new Error(errors);
    }

    // if(this.data.checkInDate || this.data.checkOutDate){
    //     const dbBooking = await findOne({})
    // }
    // if (new Date(this.data.checkInDate) >= new Date(this.data.checkOutDate)) {
    //   throw new Error('Check-in date must be before check-out date!');
    // }

    return [];
  }
}

module.exports = {
  BookingDto
};
