const httpStatus = require('http-status');
const { BuyerSeller, BuyerSellerOTP, SellerPost, BuyerRentie, Buyer, PropertLikes } = require('../models/BuyerSeller.model');
const moment = require('moment');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/RealEstate.Admin.model');
const OTP = require('../config/textLocal');
const StoreOtp = require('../models/RealEstate.Otp.model');
const userPlane = require('../models/usersPlane.model');
const Axios = require('axios');

const createBuyerSeller = async (body, otp) => {
  const { email, mobile } = body;
  let values = { ...body, ...{ created: moment(), date: moment().format('YYYY-MM-DD'), plane: 2 } };
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

// Login With Mail For Buyer

const LoginWithmailBuyer = async (body, otp) => {
  let values = { ...body, ...{ Otp: otp, created: moment() } };
  let OTP = await BuyerSellerOTP.create(values);
  return { active: OTP.active, email: OTP.email, created: OTP.created, _id: OTP._id };
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
  let expiredDate = moment().toDate();
  // let userplanes = await userPlane.findOne({
  //   userId: userId,
  //   active: true,
  //   PostNumber: { $gt: 0 },
  //   PlanValidate: { $gte: expiredDate },
  // });
  // if (!userplanes) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'There Is No Plan Active');
  // }
  let values = {
    ...body,
    ...{
      created: moment(),
      date: moment().format('YYYY-MM-DD'),
      userId: userId,
      // propertyExpiredDate: expiredDate,
      // expiredDate: moment().add(6, 'days').format('YYYY-MM-DD'),
    },
  };
  // let reduceplane = userplanes.PostNumber;
  // let total = reduceplane - 1;
  // userplanes = await userPlane.findByIdAndUpdate({ _id: userplanes._id }, { PostNumber: total }, { new: true });
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

const getSellerRenter_POST_ForAdmin = async (type, propType, page) => {
  console.log(type);
  let typeMatch = { active: true };
  let proptypeMatch = { active: true };
  if (type != 'null') {
    typeMatch = { HouseOrCommercialType: type };
  }
  if (propType != 'null') {
    proptypeMatch = { Type: propType };
  }
  const data = await SellerPost.aggregate([
    {
      $match: { $and: [typeMatch, proptypeMatch] },
    },
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  const total = await SellerPost.aggregate([
    {
      $match: { $and: [typeMatch, proptypeMatch] },
    },
  ]);
  return { values: data, total: total.length };
};
const ApproveAndReject = async (id, body) => {
  let values = await SellerPost.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Not Found');
  }
  values = await SellerPost.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

const getApprover_Property = async (page, query, userId) => {
  let cityMatch = { active: true };
  let propertMatch = { active: true };
  let BHKTypeMatch = { active: true };
  let MonthlyRentFromMatch = { active: true };
  let MonthlyRentToMatch = { active: true };
  let HouseOrCommercialTypeMatch = { active: true };

  if (query.area) {
    cityMatch = { city: { $regex: query.area, $options: 'i' } };
  } else {
    cityMatch;
  }
  if (query.propertType) {
    propertMatch = { propertType: { $regex: query.propertType, $options: 'i' } };
  } else {
    propertMatch;
  }
  if (query.BHKType) {
    BHKTypeMatch = { BHKType: { $regex: query.BHKType, $options: 'i' } };
  } else {
    BHKTypeMatch;
  }
  if (query.MonthlyRentFrom) {
    let MonthlyRentFrom = parseInt(query.MonthlyRentFrom);
    console.log(MonthlyRentFrom);
    MonthlyRentFromMatch = { MonthlyRentFrom: { $gte: MonthlyRentFrom } };
  } else if (query.MonthlyRentTo) {
    let MonthlyRentTo = parseInt(query.MonthlyRentTo);
    MonthlyRentToMatch = { MonthlyRentFrom: { $gte: MonthlyRentTo } };
  }
  {
    MonthlyRentFromMatch;
  }
  if (query.HouseOrCommercialType) {
    HouseOrCommercialTypeMatch = { HouseOrCommercialType: query.HouseOrCommercialType };
  } else {
    HouseOrCommercialTypeMatch;
  }
  let today = moment().toDate();
  let values = await SellerPost.aggregate([
    {
      $match: {
        $and: [
          cityMatch,
          propertMatch,
          BHKTypeMatch,
          MonthlyRentFromMatch,
          MonthlyRentToMatch,
          HouseOrCommercialTypeMatch,
          { propStatus: 'Approved' },
        ],
      },
    },
    {
      $sort: { created: -1 },
    },
    {
      $project: {
        _id: 1,
        AdditionalDetails: 1,
        image: 1,
        active: 1,
        propertyExpired: 1,
        propStatus: 1,
        HouseOrCommercialType: 1,
        propertType: 1,
        ageOfBuilding: 1,
        BHKType: 1,
        furnishingStatus: 1,
        bathRoomCount: 1,
        landSize: 1,
        noOfFloor: 1,
        IntrestedStatus: { $map: { input: '$intrestedUsers', as: 'value', in: { $eq: ['$$value', userId] } } },
        videos: 1,
        floorNo: 1,
        IfCommercial: 1,
        Type: 1,
        BuildingName: 1,
        BuildedSize: 1,
        buildingDirection: 1,
        discription: 1,
        availability: 1,
        RentPrefer: 1,
        Address: 1,
        pineCode: 1,
        city: 1,
        locality: 1,
        parkingFacilities: 1,
        bathRoomType: 1,
        balconyCount: 1,
        roomType: 1,
        floorType: 1,
        MonthlyRentFrom: 1,
        MonthlyRentTo: 1,
        depositeAmount: 1,
        periodOfRentFrom: 1,
        periodOfRentTo: 1,
        created: 1,
        date: 1,
        userId: 1,
        propertyExpiredDate: 1,
        expiredDate: 1,
        intrestedUsers: 1,
        // liked: {
        //   $cond: { if: { $in: ['$intrestedUsers', ['792715a6-a206-49cd-a687-a51a3ff2a217']] }, then: true, else: false },
        // },
        status: {
          $cond: {
            if: { $gt: [today, '$propertyExpiredDate'] },
            then: 'Expired',
            else: 'Pending',
          },
        },
      },
    },
    {
      $project: {
        status: 1,
        videos: 1,
        floorNo: 1,
        IfCommercial: 1,
        Type: 1,
        BuildingName: 1,
        BuildedSize: 1,
        buildingDirection: 1,
        discription: 1,
        availability: 1,
        RentPrefer: 1,
        Address: 1,
        pineCode: 1,
        city: 1,
        locality: 1,
        parkingFacilities: 1,
        bathRoomType: 1,
        balconyCount: 1,
        roomType: 1,
        floorType: 1,
        MonthlyRentFrom: 1,
        MonthlyRentTo: 1,
        depositeAmount: 1,
        periodOfRentFrom: 1,
        periodOfRentTo: 1,
        created: 1,
        date: 1,
        userId: 1,
        propertyExpiredDate: 1,
        expiredDate: 1,
        intrestedUsers: 1,
        _id: 1,
        AdditionalDetails: 1,
        image: 1,
        active: 1,
        propertyExpired: 1,
        propStatus: 1,
        HouseOrCommercialType: 1,
        propertType: 1,
        ageOfBuilding: 1,
        BHKType: 1,
        furnishingStatus: 1,
        bathRoomCount: 1,
        landSize: 1,
        noOfFloor: 1,
        IntrestedStatus: { $cond: { if: { $in: [true, '$IntrestedStatus'] }, then: true, else: false } },
      },
    },
    // {
    //   $match: { status: { $eq: 'Pending' } },
    // },
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  let total = await SellerPost.aggregate([
    {
      $match: {
        $and: [
          cityMatch,
          propertMatch,
          BHKTypeMatch,
          MonthlyRentFromMatch,
          MonthlyRentToMatch,
          HouseOrCommercialTypeMatch,
          { propStatus: 'Approved' },
        ],
      },
    },
    {
      $sort: { created: -1 },
    },
    {
      $project: {
        _id: 1,
        AdditionalDetails: 1,
        image: 1,
        active: 1,
        propertyExpired: 1,
        propStatus: 1,
        HouseOrCommercialType: 1,
        propertType: 1,
        ageOfBuilding: 1,
        BHKType: 1,
        furnishingStatus: 1,
        bathRoomCount: 1,
        landSize: 1,
        noOfFloor: 1,
        videos: 1,
        floorNo: 1,
        IfCommercial: 1,
        Type: 1,
        BuildingName: 1,
        BuildedSize: 1,
        buildingDirection: 1,
        discription: 1,
        availability: 1,
        RentPrefer: 1,
        Address: 1,
        pineCode: 1,
        city: 1,
        locality: 1,
        parkingFacilities: 1,
        bathRoomType: 1,
        balconyCount: 1,
        roomType: 1,
        floorType: 1,
        MonthlyRentFrom: 1,
        MonthlyRentTo: 1,
        depositeAmount: 1,
        periodOfRentFrom: 1,
        periodOfRentTo: 1,
        created: 1,
        date: 1,
        propertyExpiredDate: 1,
        expiredDate: 1,
        status: {
          $cond: {
            if: { $gt: [today, '$propertyExpiredDate'] },
            then: 'Expired',
            else: 'Pending',
          },
        },
      },
    },
    {
      $project: {
        status: 1,
        IntrestedStatus: { $cond: { if: { $eq: [true, ['$IntrestedStatus']] }, then: true, else: false } },
      },
    },
    // {
    //   $match: { status: { $eq: 'Pending' } },
    // },
  ]);
  return { values: values, total: total.length };
};

const BuyerLike_Property = async (id, userId) => {
  let like = await SellerPost.findById(id);
  if (!like) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property Not Found');
  }
  let likes = await PropertLikes.findOne({ userId: userId, propertyId: id });
  if (likes) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already Like Submitted');
  }
  let data = { userId: userId, propertyId: id, created: moment(), status: 'Liked' };
  let values = await PropertLikes.create(data);
  return values;
};
// update Seller Renter Post
const UpdateSellerPost = async (id, updatebody) => {
  let sellerpost = await SellerPost.findById(id);
  if (!sellerpost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Post Available');
  }
  sellerpost = await SellerPost.findByIdAndUpdate({ _id: id }, updatebody, { new: true });
  return sellerpost;
};

const VideoUpload = async (id) => {
  let values = await SellerPost.findById(id);
  return values;
};
// Otp Send
const getOTP = async (body) => {
  return await OTP.Otp(body);
};

const getOtpWithRegisterNumber = async (body) => {
  let value = await Buyer.findOne({ mobile: body.number });
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Number Not Registered');
  }
  return await OTP.Otp(body);
};

const OTPVerify = async (body) => {
  let values = await StoreOtp.findOne({ otp: body.otp, active: true });
  if (!values) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Invalid OTP');
  }
  // await StoreOtp.findByIdAndUpdate({ _id: values._id }, { active: false }, { new: true });
  let value = await Buyer.findOne({ mobile: values.number });
  let value1 = { _id: value._id, userName: value.userName, mobile: value.mobile, email: value.email };
  return { Message: 'otp verified successfully message', value: value1 };
};

const VerifyOtpRealEstate = async (body) => {
  let verify = await StoreOtp.findOne({ otp: body.otp });
  let values = await Buyer.findOne({ mobile: verify.number });
  values = await Buyer.findByIdAndUpdate({ _id: values._id }, { verified: true }, { new: true });
  return values;
};

const updatePassword = async (id, body) => {
  let users = await Buyer.findById(id);
  if (!users) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found');
  }
  users = await Buyer.findByIdAndUpdate({ _id: id }, { password: body.password }, { new: true });
  return { Message: 'Password Updated SuccessFully' };
};

// create password

const createPassword = async (id, body) => {
  let { password, confirmPassword } = body;
  let values = await Buyer.findById(id);
  if (!values || values.verified == false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Verified');
  }
  // const salt = await bcrypt.genSalt(10);
  // let password1 = await bcrypt.hash(confirmPassword, salt);
  const data = await Buyer.findByIdAndUpdate({ _id: values._id }, { password: confirmPassword }, { new: true });
  return data;
};

const Login = async (body) => {
  let values = await Buyer.findOne({ userName: body.userName, password: body.password });
  if (!values) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User Not Available');
  }
  return values;
};

const LoginWithOtp = async (body) => {
  let verify = await StoreOtp.findOne({ otp: body.otp, active: true });
  if (!verify) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid OTP');
  }
  let values = await Buyer.findOne({ mobile: verify.number, verified: true });
  if (!values) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User Not Vailable');
  }
  verify = await StoreOtp.findByIdAndUpdate({ _id: verify._id }, { active: false }, { new: true });
  return values;
};

const giveInterest = async (id, userId) => {
  let users = await Buyer.findById(userId);
  console.log(userId);
  if (!users) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User Must be Logged In');
  }
  let post = await SellerPost.findById(id);
  let matchValue = await SellerPost.findOne({ _id: id, intrestedUsers: { $elemMatch: { $eq: userId } } });
  console.log(matchValue);
  if (!matchValue) {
    post = await SellerPost.findByIdAndUpdate({ _id: post._id }, { $push: { intrestedUsers: userId } }, { new: true });
    await post.save();
  } else {
    post = await SellerPost.findByIdAndUpdate({ _id: post._id }, { $pull: { intrestedUsers: userId } }, { new: true });
    await post.save();
  }

  return post;
};

const getIntrestedUsersByProperty = async (id) => {
  let users = [];
  let values = await SellerPost.findById(id);
  for (let i = 0; i < values.intrestedUsers.length; i++) {
    let ff = await Buyer.findById(values.intrestedUsers[i]);
    users.push(ff);
  }
  return users;
};

const getPostedProperty_For_IndividualSeller = async (id, page) => {
  let values = await SellerPost.aggregate([
    {
      $match: { userId: id },
    },
    {
      $skip: page * 10,
    },
    {
      $limit: 10,
    },
  ]);
  let total = await SellerPost.aggregate([
    {
      $match: { userId: id },
    },
  ]);
  return { values: values, total: total.length };
};

const createAdminLogin = async (body) => {
  let data = { ...body, ...{ created: moment() } };
  let values = await Admin.create(data);
  return values;
};

const AdminLoginFlow = async (body) => {
  let values = await Admin.find({ userName: body.userName, password: body.password });
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND);
  }
  return values;
};

const getCoordinatesByAddress = async (location) => {
  let response = await Axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDoYhbYhtl9HpilAZSy8F_JHmzvwVDoeHI`
  );
  return response.data;
};

const updatePlanes = async (id, body) => {
  let values = await Buyer.findById(id);
  return values;
};

const AddViewed_Data = async (id, userId) => {
  let values = await SellerPost.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post Not Found');
  }
  let data = await SellerPost.findOne({ _id: values._id, viewedUsers: { $in: [userId] } });
  if (!data) {
    await SellerPost.findByIdAndUpdate({ _id: values._id }, { $push: { viewedUsers: userId } }, { new: true });
  }
  return values;
};

const BuyerSeller_Profile = async (userId) => {
  let values = await BuyerSeller.findById(userId);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Fount Token Issue');
  }
  let userData = {
    verified: values.verified,
    _id: values._id,
    userName: values.userName,
    mobile: values.mobile,
    email: values.email,
    Type: values.Type,
    created: values.created,
    date: values.date,
  };
  return userData;
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
  ApproveAndReject,
  LoginWithmailBuyer,
  getApprover_Property,
  BuyerLike_Property,
  UpdateSellerPost,
  VideoUpload,
  getOTP,
  VerifyOtpRealEstate,
  createPassword,
  Login,
  LoginWithOtp,
  giveInterest,
  getIntrestedUsersByProperty,
  getPostedProperty_For_IndividualSeller,
  getOtpWithRegisterNumber,
  OTPVerify,
  updatePassword,
  createAdminLogin,
  AdminLoginFlow,
  getCoordinatesByAddress,
  updatePlanes,
  AddViewed_Data,
  BuyerSeller_Profile,
};
