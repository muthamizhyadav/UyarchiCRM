const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const buyersellerService = require('../services/BuyerSeller.service');
const mailService = require('../services/email.service');
const { BuyerSeller, BuyerSellerOTP, Buyer } = require('../models/BuyerSeller.model');
const tokenService = require('../services/token.service');

const createBuyerSeller = catchAsync(async (req, res) => {
  const { email, mobile } = req.body;
  const checkemail = await BuyerSeller.findOne({ email: email });
  if (checkemail) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email Already Registered');
  }
  const checkmobile = await BuyerSeller.findOne({ mobile: mobile });
  if (checkmobile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Already registered');
  }
  let values = await mailService.sendEmail(req.body.email);
  const data = await buyersellerService.createBuyerSeller(req.body, values.otp);
  res.send(data);
});

const verifyOtp = catchAsync(async (req, res) => {
  const data = await buyersellerService.verifyOtp(req.body);
  const tokens = await tokenService.generateAuthTokens(data);
  res.send({ data: data, tokens: tokens });
});

const verifyOtpBuyer = catchAsync(async (req, res) => {
  const data = await buyersellerService.verifyOtpBuyer(req.body);
  const token = await tokenService.generateAuthTokens(data);
  res.send({ data: data, tokens: token });
});

const createSellerPost = catchAsync(async (req, res) => {
  let userId = req.userId;
  console.log(userId);
  const data = await buyersellerService.createSellerPost(req.body, userId);
  if (req.files) {
    let path = '';
    req.files.forEach(function (files, index, arr) {
      path = 'images/buyrSeller/' + files.filename;
    });
    data.image = path;
  }
  res.status(httpStatus.CREATED).send(data);
  await data.save();
});

const LoginWithmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  let val = await BuyerSeller.findOne({ email: email, verified: true });
  if (!val) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email Not Registered');
  }
  let values = await mailService.sendEmail(email);
  const data = await buyersellerService.LoginWithmail(req.body, values.otp);
  res.send(data);
});

const createBuyerRentiee = catchAsync(async (req, res) => {
  let userId = req.userId;
  const data = await buyersellerService.createBuyerRentiee(req.body, userId);
  res.send(data);
});

const SearchHouseFlatByBuyer_Or_Rentiee = catchAsync(async (req, res) => {
  let userId = req.userId;
  let type = req.type;
  const data = await buyersellerService.SearchHouseFlatByBuyer_Or_Rentiee(userId);
  res.send(data);
});

const DisplayAvailable_HouseOr_Flat = catchAsync(async (req, res) => {
  let querydata = req.query;
  const data = await buyersellerService.DisplayAvailable_HouseOr_Flat(querydata);
  res.send(data);
});

const AutoMatches_ForBuyer_rentiee = catchAsync(async (req, res) => {
  let userId = req.userId;
  const data = await buyersellerService.AutoMatches_ForBuyer_rentiee(userId);
  res.send(data);
});

const createBuyer = catchAsync(async (req, res) => {
  const { email, mobile } = req.body;
  const checkemail = await Buyer.findOne({ email: email });
  if (checkemail) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email Already Registered');
  }
  const checkmobile = await Buyer.findOne({ mobile: mobile });
  if (checkmobile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Already registered');
  }
  let values = await mailService.sendEmail(req.body.email);
  const data = await buyersellerService.createBuyer(req.body, values.otp);
  res.send(data);
});

// create Admin

const createAdmin = catchAsync(async (req, res) => {
  const data = await buyersellerService.createAdmin(req.body);
  res.send(data);
});

// admin Login

const AdminLogin = catchAsync(async (req, res) => {
  const data = await buyersellerService.AdminLogin(req.body);
  res.send(data);
});

const getSellerRenter_POST_ForAdmin = catchAsync(async (req, res) => {
  const data = await buyersellerService.getSellerRenter_POST_ForAdmin(req.params.page);
  res.send(data);
});

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
