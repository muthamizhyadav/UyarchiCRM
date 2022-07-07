const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const SupplierInterest =  require('../models/interestTable.model')
const supplier = require('../models/supplier.model')

const createinterest = async (interestBody) => {

    interestBody.data.forEach(async (e) => {
        let values = {matchedBuyerId:interestBody.BId, supplierReqId:e, interestStatus:"interest"}
        await SupplierInterest.create(values)
      });
      return "success"
};

const getInterestById = async (interestId) => {
    return SupplierInterest.findById(interestId);
  };

const getAllInterest = async () => {
  return SupplierInterest.find({active:'true'});
}

const updateInterestId = async (supplierId, updateBody) => {
    let Manage = await getInterestById(supplierId);

    if (!Manage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'interest not found');
    }
    Manage = await SupplierInterest.findByIdAndUpdate({ _id: supplierId }, updateBody, { new: true });
    return Manage;
  };
  
  const deleteInterestById = async (interestId) => {
    const Manage = await getInterestById(interestId);
    if (!Manage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'interest not found');
    }
    (Manage.active = false), (Manage.archive = true), await Manage.save();
    return Manage;
  };

  module.exports = { 
    createinterest,
    getInterestById,
    getAllInterest,
    updateInterestId,
    deleteInterestById,
  };