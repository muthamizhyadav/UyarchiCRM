const mongoose = require('mongoose');
const { v4 } = require('uuid');

// seller and buyer register Schema

const BuyerSellerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  Type: {
    type: String,
  },
  active: {
    type: String,
  },
  created: {
    type: Date,
  },
  date: {
    type: String,
  },
  password: {
    type: String,
  },
});

const BuyerSeller = mongoose.model('buyerseller', BuyerSellerSchema);

// seller and buyer Otp Schema

const BuyerSellerOTPSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  Otp: {
    type: Number,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  created: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const BuyerSellerOTP = mongoose.model('buyersellerotp', BuyerSellerOTPSchema);

// Seller Post Requirement Schema
const sellerPostSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  location: {
    type: String,
  },
  pineCode: {
    type: Number,
  },
  Type: {
    // type like seller render
    type: String,
  },
  propertType: {
    type: String,
  },
  propertStatus: {
    type: String,
  },
  ageOfBuilding: {
    type: String,
  },
  userId: {
    type: String,
  },
  home: {
    type: String,
  },
  flat: {
    type: String,
  },
  Address: {
    type: String,
  },
  landMark: {
    type: String,
  },
  furnishingStatus: {
    type: String,
  },
  parkingFacilities: {
    type: String,
  },
  bathRoom: {
    type: String,
  },
  image: {
    type: Array,
  },
  videos: {
    type: String,
  },
  landSize: {
    type: String,
  },
  squareFT: {
    type: String,
  },
  buildingDirection: {
    type: String,
  },
  created: {
    type: Date,
  },
  date: {
    type: String,
  },
});

const SellerPost = mongoose.model('sellerPost', sellerPostSchema);

module.exports = {
  BuyerSeller,
  BuyerSellerOTP,
  SellerPost,
};
