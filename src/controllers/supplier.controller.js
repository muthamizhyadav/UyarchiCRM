const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const supplierService = require('../services/supplier.service');

const createSupplierService = catchAsync(async (req, res) => {
  const supplier = await supplierService.createSupplier(req.body);
  res.status(httpStatus.CREATED).send(supplier);
});

const createSupplierwithType = catchAsync (async (req, res)=>{
  const supplier = await supplierService.createSupplierwithType(req.params.type)
  res.send(supplier)
})

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
  getAllSupplierDeleteService
};
