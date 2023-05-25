const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    // currentOwner: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    address: {
      type: String,
      required: true,
      min: 6,
    },
    // type: {
    //   type: String,
    //   enum: ['house', 'apartment'],
    //   required: true,
    // },
    type: {
      type: String,
      enum: ['rent', 'sale'],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    parkings: {
      type: Number,
      required: false,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
      min: 6,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);
