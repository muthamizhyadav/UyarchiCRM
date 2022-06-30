const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { RequirementBuyer,RequirementSupplier } = require('../models/requirementCollectionBS.model');
const supplier = require('../models/supplier.model')
const axios = require('axios');


const createRequirementBuyer = async (buyerBody) => {
    const {userId} = buyerBody;
    let supp = await supplier.findById(userId);
    let values = {}
    values = {...buyerBody, ...{userId:supp._id}}
    if(supp === null){
      throw new ApiError(httpStatus.NO_CONTENT, "!oops 🖕")
    }
    return RequirementBuyer.create(values);
    };

const createRequirementSupplier = async (supplierBody)=>{
    const {userId} = supplierBody;
    let buy = await supplier.findById(userId);
    let values = {}
    values = {...supplierBody, ...{userId:buy._id}}
    if(buy === null){
      throw new ApiError(httpStatus.NO_CONTENT, "!oops 🖕")
    }
    return RequirementSupplier.create(values)
}

const getByIdBuyer = async (buyerId) => {
    return RequirementBuyer.findById(buyerId)
}

const getByIdSupplier = async (supplierId) => {
    return RequirementSupplier.findById(supplierId)
}

const getByIdBuyerAll = async () => {
    return RequirementBuyer.find()
}

const getByIdSupplierAll = async () => {
    return RequirementSupplier.find()
}

const updateRequirementBuyerById = async (buyerId, updateBody) => {
    let data = await getByIdBuyer(buyerId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer not found');
    }
    data = await RequirementBuyer.findByIdAndUpdate({ _id: buyerId }, updateBody, { new: true });
    return data;
  };

  const updateRequirementSupplierById = async (supplierId, updateBody) => {
    let data = await getByIdSupplier(buyerId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier not found');
    }
    data = await RequirementSupplier.findByIdAndUpdate({ _id: supplierId }, updateBody, { new: true });
    return data;
  };
  
  const deleteRequirementBuyerById = async (buyerId) => {
    const data = await getByIdBuyer(buyerId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer not found');
    }
    (data.active = false), (data.archive = true), await data.save();
    return data;
  };

  const deleteRequirementSupplierById = async (supplierId) => {
    const data = await getByIdSupplier(supplierId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier not found');
    }
    (data.active = false), (data.archive = true), await data.save();
    return data;
  };



    module.exports = {
        createRequirementBuyer,
        createRequirementSupplier,
        getByIdBuyer,
        getByIdSupplier,
        getByIdBuyerAll,
        getByIdSupplierAll,
        updateRequirementBuyerById,
        updateRequirementSupplierById,
        deleteRequirementBuyerById,
        deleteRequirementSupplierById,
   };

