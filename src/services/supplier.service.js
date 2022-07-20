const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { supplier } = require('../models');
const TextLocal = require('../config/OTP');
const { CreateSupplierOtp } = require('../models/supplier.OTP.model');
const bcrypt = require('bcryptjs');
const createSupplier = async (supplierBody) => {
  return supplier.create(supplierBody);
};

const getAllSupplier = async () => {
  return supplier.find({ active: true });
};

const loginUserEmailAndPassword = async (email, dateOfBirth) => {
  const data = await supplier.find({ email: email });

  let dob = data[0].dateOfBirth.replace(/[^0-9\.]+/g, '');
  if (data != '') {
    if (dob == dateOfBirth) {
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'DOB Not Match');
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email Not Registored');
  }

  return data;
};

const createSupplierwithType = async (type) => {
  let values;
  if (type == 'supplier') {
    values = await supplier.find({ type: 'supplier' });
  } else if (type == 'buyer') {
    values = await supplier.find({ type: 'buyer' });
  }
  return values;
};

const getAllSupplierDelete = async () => {
  return supplier.find();
};

const getSupplierById = async (id) => {
  console.log(id);
  const sup = supplier.findById(id);
  if (!sup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier Not Found');
  }
  return sup;
};

const updateSupplierById = async (supplierId, updateBody) => {
  let sup = await getSupplierById(supplierId);
  if (!sup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'supplier not found');
  }
  sup = await supplier.findByIdAndUpdate({ _id: supplierId }, updateBody, { new: true });
  return sup;
};

const updateSupplierChangeById = async (supplierId, updateBody) => {
  let sup = await getSupplierById(supplierId);
  if (!sup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'supplier not found');
  }
  let  {oldPassword,newPassword} = updateBody
  let dob = sup.dateOfBirth.replace(/[^0-9\.]+/g, '');
  if(dob == oldPassword){
  }else{
    throw new ApiError(httpStatus.NOT_FOUND, 'OldPassword Not Same');
  }
    sup = await supplier.findByIdAndUpdate({ _id: supplierId }, { dateOfBirth: newPassword }, { new: true });
   return sup;
};

const deleteSupplierById = async (supplierId) => {
  const supplier = await getSupplierById(supplierId);
  if (!supplier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier not found');
  }
  (supplier.active = false), (supplier.archive = true), await supplier.save();
  return supplier;
};

const forgetPassword = async (body) => {
  console.log(body);
  let supplierdata = await supplier.findOne({ primaryContactNumber: body.mobileNumber });
  if (!supplierdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Suplier Not Found');
  }
  return await TextLocal.Otp(body, supplierdata);
};

const otpVerification = async (body) => {
  let otp = await CreateSupplierOtp.findOne({ OTP: body.otp });
  if (!otp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Otp is Not Valid');
  }
  let supplierData = await supplier.findById(otp.supplierId);
  await CreateSupplierOtp.findByIdAndUpdate({ _id: otp._id }, { verify: true }, { new: true });
  console.log(otp);
  return supplierData;
};

const updatePasswordByIdSupplierId = async (id, updateBody) => {
  let suppliers = await supplier.findById(id);
  if (!suppliers) {
    throw new ApiError(httpStatus.NOT_FOUND, 'suppliers Not found');
  }
  let optverify = await CreateSupplierOtp.findOne({ supplierId: id });
  if (!optverify) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Otp Is Not Valid Or Expired');
  }
  let { password } = updateBody;
  // const salt = await bcrypt.genSalt(10);
  // password = await bcrypt.hash(password, salt);
  suppliers = await supplier.findByIdAndUpdate({ _id: id }, { dateOfBirth: password }, { new: true });
  await CreateSupplierOtp.deleteOne({ supplierId: id });
  return suppliers;
};

module.exports = {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  createSupplierwithType,
  updateSupplierById,
  deleteSupplierById,
  getAllSupplierDelete,
  loginUserEmailAndPassword,
  forgetPassword,
  otpVerification,
  updatePasswordByIdSupplierId,
  updateSupplierChangeById,
};
