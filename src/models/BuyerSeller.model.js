const { boolean } = require('joi');
const mongoose = require('mongoose');
const { v4 } = require('uuid');

// seller and buyer register Schema

const BuyerSchema = new mongoose.Schema({
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

const Buyer = mongoose.model('buyers', BuyerSchema);

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

const BuyerSeller = mongoose.model('buyer', BuyerSellerSchema);

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
  HouseOrCommercialType: {
    type: String,
  },
  MonthlyRent: {
    type: Number,
  },
  RentPrefer: {
    type: String,
  },
  IfCommercial: {
    type: String,
  },
  Negociable: {
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
  homeOrflat: {
    type: String,
  },
  homeFlatType: {
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
  active: {
    type: Boolean,
    default: true,
  },
  BHKType: {
    type: String,
  },
  price: {
    type: Number,
  },
  floorNo: {
    type: Number,
  },
  noOfFloor: {
    type: Number,
  },
  udsArea: {
    type: String,
  },
  propStatus: {
    type: String,
    default: 'Pending',
  },
});

const SellerPost = mongoose.model('sellerPost', sellerPostSchema);

const BuyerRentieSchema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  Type: {
    // like Buye or Rentiee
    type: String,
  },
  TyoesOfProperty: {
    type: String,
  },
  HouseOrCommercialType: {
    type: String,
  },
  PropertyStatus: {
    type: String,
  },
  PrefferedState: {
    type: String,
  },
  PrefferedCities: {
    type: String,
  },
  Area: {
    type: String,
  },
  BHKType: {
    type: String,
  },
  userId: {
    type: String,
  },
  FromPrice: {
    type: Number,
  },
  ToPrice: {
    type: Number,
  },
  ParkingPreference: {
    type: String,
  },
  FurnishingStatus: {
    type: String,
  },
  PreferenceList: {
    type: String,
  },
  propStatus: {
    type: String,
    default: 'Pending',
  },
  active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
  },
  date: {
    type: String,
  },
});

const BuyerRentie = mongoose.model('buyerrentie', BuyerRentieSchema);

module.exports = {
  BuyerSeller,
  BuyerSellerOTP,
  SellerPost,
  BuyerRentie,
  Buyer,
};
