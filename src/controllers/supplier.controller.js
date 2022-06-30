const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const supplierService = require('../services/supplier.service');
const { supplier } = require('../models');

const createSupplierService = catchAsync(async (req, res) => {
  const Buy = await supplier.find({ type: req.body.type });
  let center = '';
  // console.log(Buy.length);
  if (Buy.length < 9) {
    center = '0000';
  }
  if (Buy.length < 99 && Buy.length >= 9) {
    center = '000';
  }
  if (Buy.length < 999 && Buy.length >= 99) {
    center = '00';
  }
  if (Buy.length < 9999 && Buy.length >= 999) {
    center = '0';
  }
  // console.log(center, 0);
  let userId = '';
  let totalcount = Buy.length + 1;
  if (req.body.type == 'Buyer') {
    userId = 'BU' + center + totalcount;
  }
  if (req.body.type == 'Supplier') {
    userId = 'SU' + center + totalcount;
  }
  let supplierss;
  if(userId !=''){
    supplierss = await supplierService.createSupplier(req.body);
  }
  supplierss.secretName = userId;
  // console.log(supplierss)
  res.status(httpStatus.CREATED).send(supplierss);
  await supplierss.save();
});

const createSupplierwithType = catchAsync(async (req, res) => {
  const supplier = await supplierService.createSupplierwithType(req.params.type);
  res.send(supplier);
});

const getAllSupplierService = catchAsync(async (req, res) => {
  const supplier = await supplierService.getAllSupplier();
  res.send(supplier);
});

const getAllSupplierDeleteService = catchAsync(async (req, res) => {
  const supplier = await supplierService.getAllSupplierDelete();
  res.send(supplier);
});

const getSupplierByIdService = catchAsync(async (req, res) => {
  const supplier = await supplierService.getSupplierById(req.params.supplierId);
  if (!supplier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier Not Found');
  }
  res.send(supplier);
});

const updateSupplierByIdService = catchAsync(async (req, res) => {
  const supplier = await supplierService.updateSupplierById(req.params.supplierId, req.body);
  if (!supplier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier Not Found');
  }
  res.send(supplier);
});

const deleteSupplierByIdService = catchAsync(async (req, res) => {
  const supplier = await supplierService.deleteSupplierById(req.params.supplierId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSupplierService,
  getAllSupplierService,
  getSupplierByIdService,
  updateSupplierByIdService,
  deleteSupplierByIdService,
  createSupplierwithType,
  getAllSupplierDeleteService,
};
