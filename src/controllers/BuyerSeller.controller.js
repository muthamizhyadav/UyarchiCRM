const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const buyersellerService = require('../services/BuyerSeller.service');
const mailService = require('../services/email.service');
const { BuyerSeller, BuyerSellerOTP } = require('../models/BuyerSeller.model');
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

module.exports = {
  createBuyerSeller,
  verifyOtp,
  createSellerPost,
  LoginWithmail,
  createBuyerRentiee,
  SearchHouseFlatByBuyer_Or_Rentiee,
};
