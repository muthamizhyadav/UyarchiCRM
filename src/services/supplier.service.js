const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { supplier } = require('../models');

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
  return  supplier.find();
};

const getSupplierById = async (id) => {
    console.log(id)
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
  sup = await  supplier.findByIdAndUpdate({ _id: supplierId }, updateBody, { new: true });
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

module.exports = {
  createSupplier,
  getAllSupplier,
  getSupplierById,
  createSupplierwithType,
  updateSupplierById,
  deleteSupplierById,
  getAllSupplierDelete,
  loginUserEmailAndPassword,
};