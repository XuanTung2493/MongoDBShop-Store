const mongoose = require('mongoose');

const allowedSizes = ['S', 'M', 'L', 'XL'];

const productSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      required: [true, 'Product Id is required'],
      unique: true,
    },
    Name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [4, 'Product name length must be greater than 3'],
    },
    Quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be at least 0'],
      max: [99, 'Quantity must be less than 100'],
    },
    Price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be greater than 0'],
      max: [999.99, 'Price must be less than 1000'],
    },
    Size: {
      type: String,
      required: [true, 'Size is required'],
      enum: {
        values: allowedSizes,
        message: 'Size must be one of S, M, L, XL',
      },
    },
    Status: {
      type: Boolean,
      required: [true, 'Status is required'],
    },
    ExpirationDate: {
      type: Date,
      required: [true, 'Expiration date is required'],
    },
    ManufacturerId: {
      type: Number,
      required: [true, 'ManufacturerId is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Product', productSchema);