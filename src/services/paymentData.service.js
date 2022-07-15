const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const paymentData =  require('../models/paymentData.model')


const createpaymentData = async (paymentBody) => {
    return paymentData.create(paymentBody);
};

const getpaymentDataById = async (paymentId) => {
    return paymentData.findById(paymentId);
  };

const getAllpaymentData = async () => {
  return paymentData.find({active:'true'});
}

const updatepaymentDataId = async (paymentId, updateBody) => {
    let Manage = await getpaymentDataById(paymentId);

    if (!Manage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'paymentData not found');
    }
    Manage = await paymentData.findByIdAndUpdate({ _id: paymentId }, updateBody, { new: true });
    return Manage;
  };
  
  const deletepaymentDataById = async (paymentId) => {
    const Manage = await getpaymentDataById(paymentId);
    if (!Manage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'paymentData not found');
    }
    (Manage.active = false), (Manage.archive = true), await Manage.save();
    return Manage;
  };

  module.exports = { 
    createpaymentData,
    getpaymentDataById,
    getAllpaymentData,
    updatepaymentDataId,
    deletepaymentDataById,
  };