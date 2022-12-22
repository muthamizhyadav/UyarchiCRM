const httpStatus = require('http-status');
const { BuyerSeller, BuyerSellerOTP, SellerPost, BuyerRentie, Buyer } = require('../models/BuyerSeller.model');
const moment = require('moment');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/RealEstate.Admin.model');
const createBuyerSeller = async (body, otp) => {
  const { email, mobile } = body;
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD') } };
  let values1 = { Otp: otp, email: email, mobile: mobile };
  const buyerSeller = await BuyerSeller.create(values);
  await BuyerSellerOTP.create(values1);
  return buyerSeller;
};

const createBuyer = async (body, otp) => {
  const { email, mobile } = body;
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD') } };
  let values1 = { Otp: otp, email: email, mobile: mobile };
  const buyerSeller = await Buyer.create(values);
  await BuyerSellerOTP.create(values1);
  return buyerSeller;
};

// Login With Mail

const LoginWithmail = async (body, otp) => {
  let values = { ...body, ...{ Otp: otp, created: moment() } };
  let OTP = await BuyerSellerOTP.create(values);
  return OTP;
};

const verifyOtp = async (body) => {
  const { email, otp } = body;
  let check = await BuyerSeller.findOne({ email: email });
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Number Not Registered');
  }
  let otpCheck = await BuyerSellerOTP.findOne({ email: email, Otp: otp, active: true }).sort({ created: -1 });
  if (!otpCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid OTP');
  }
  check = await BuyerSeller.findByIdAndUpdate({ _id: check._id }, { verified: true }, { new: true });
  otpCheck = await BuyerSellerOTP.findByIdAndUpdate({ _id: otpCheck._id }, { active: false }, { new: true });
  return check;
};

const verifyOtpBuyer = async (body) => {
  const { email, otp } = body;
  let check = await Buyer.findOne({ email: email });
  if (!check) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Number Not Registered');
  }
  let otpCheck = await BuyerSellerOTP.findOne({ email: email, Otp: otp, active: true }).sort({ created: -1 });
  if (!otpCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid OTP');
  }
  check = await Buyer.findByIdAndUpdate({ _id: check._id }, { verified: true }, { new: true });
  otpCheck = await BuyerSellerOTP.findByIdAndUpdate({ _id: otpCheck._id }, { active: false }, { new: true });
  return check;
};

// create seller Post

const createSellerPost = async (body, userId) => {
  console.log(userId);
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD'), userId: userId } };
  const sellerPost = await SellerPost.create(values);
  return sellerPost;
};

// create BuyerRentiee

const createBuyerRentiee = async (body, userId) => {
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD'), userId: userId } };
  let BR = await BuyerRentie.create(values);
  return BR;
};

// search House Or Flat for BuyerRentie

const SearchHouseFlatByBuyer_Or_Rentiee = async (id) => {
  let area = { active: true };

  let values = await SellerPost.aggregate([{}]);
  return id;
};

const DisplayAvailable_HouseOr_Flat = async (query) => {
  console.log(query);
  let location = { active: true };
  let loc = query.location;
  if (loc != null && loc != '') {
    location = { location: { $eq: loc } };
  }
  let values = await SellerPost.aggregate([
    { $match: { pineCode: { $ne: null } } },
    {
      $match: { $and: [location] },
    },
  ]);
  return values;
};

const AutoMatches_ForBuyer_rentiee = async (userId) => {
  console.log(userId);
  let values = await BuyerRentie.aggregate([
    { $match: { userId: { $eq: userId } } },

    {
      $lookup: {
        from: 'sellerposts',
        let: { locations: '$PrefferedCities' },
        pipeline: [{ $match: { $expr: { $or: [{ $eq: ['$location', '$$locations'] }] } } }],
        as: 'sellerPost',
      },
    },
  ]);
  return values;
};

// create Admin Register

const createAdmin = async (body) => {
  let values = { ...body, ...{ created: moment() } };
  const values1 = await Admin.findOne({ mobileNumber: body.mobileNumber });
  if (values1) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Already Registered');
  }
  const create = await Admin.create(values);
  return create;
};

const AdminLogin = async (body) => {
  let { mobileNumber } = body;
  let values = await Admin.findOne({ mobileNumber: mobileNumber });
  if (!values) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Registered');
  }
  return values;
};

const getSellerRenter_POST_ForAdmin = async () => {
  const data = await SellerPost.aggregate([
    {
      $match: { active: true },
    },
  ]);
  return data;
};

module.exports = {
  createBuyerSeller,
  verifyOtp,
  createSellerPost,
  LoginWithmail,
  createBuyerRentiee,
  SearchHouseFlatByBuyer_Or_Rentiee,
  DisplayAvailable_HouseOr_Flat,
  AutoMatches_ForBuyer_rentiee,
  createBuyer,
  verifyOtpBuyer,
  createAdmin,
  AdminLogin,
  getSellerRenter_POST_ForAdmin,
};
