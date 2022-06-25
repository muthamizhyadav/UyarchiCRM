const httpStatus = require('http-status');
//const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const  {requirementCollectionService} = require('../services');

const createRequirementCollectionService = catchAsync(async (req, res) => {
  const requirementCollection = await requirementCollectionService.createRequirementCollection(req.body);

  res.status(httpStatus.CREATED).send(requirementCollection);
});

// const createSupplierwithType = catchAsync (async (req, res)=>{
//   const supplier = await supplierService.createSupplierwithType(req.params.type)
//   res.send(supplier)
// })


const getAllmaxmin = catchAsync(async (req, res) => {
  const min = await requirementCollectionService.getmaxmin(req.params.product,req.params.fromprice,req.params.toprice,req.params.fromquantity,req.params.toquantity,req.params.destination,req.params.page);
  res.send(min);
});

const getproductAll = catchAsync(async(req,res) =>{
  const pro = await requirementCollectionService.productAll(req.params)
  res.send(pro);
})

const getAllRequirementCollectionStatus = catchAsync(async(req,res) =>{
  const pro = await requirementCollectionService.getAllRequirementCollectionStatus(req.params)
  res.send(pro);
})

const getAllRequirementCollection = catchAsync(async (req, res) => {
  const requirementCollection = await requirementCollectionService.getAllRequirementCollection();
  res.send(requirementCollection);
});

const getAllRequirementCollectionDeleteService = catchAsync(async (req, res) => {
  const requirementDelete = await requirementCollectionService.getAllRequirementCollectionDelete();
  res.send(requirementDelete);
});

const getRequirementCollectionByIdService = catchAsync(async (req, res) => {
  const requirement = await requirementCollectionService.getRequirementCollectionById(req.params.requirementId);
  if (!requirement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requirement Not Found');
  }
  res.send(requirement);
});

const updateRequirementCollectionByIdService = catchAsync(async (req, res) => {
  const requirement = await requirementCollectionService.updateRequirementCollectionById(req.params.requirementId, req.body);
  if (!requirement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Requirement Not Found');
  }
  res.send(requirement);
});

const deleteRequirementCollectionByIdService = catchAsync(async (req, res) => {
  const requirement = await requirementCollectionService.deleteRequirementCollectionById(req.params.requirementId);
  res.status(httpStatus.NO_CONTENT).send();
});

// thirdpartyApi's
const getUyarchiApi = catchAsync(async (req, res) => {
  const getUyarchi = await requirementCollectionService.UyarchiApi();
  res.send(getUyarchi);
});

const getUyarchiAllProductApi = catchAsync(async (req, res) => {
  const getUyarchi = await requirementCollectionService.UyarchiApiProduct();
  res.send(getUyarchi);
});
module.exports = {
  createRequirementCollectionService,
  getAllRequirementCollection,
  getAllRequirementCollectionDeleteService,
  getRequirementCollectionByIdService,
  updateRequirementCollectionByIdService,
  deleteRequirementCollectionByIdService,
  getUyarchiApi,
  getAllmaxmin,
  getproductAll,
  getUyarchiAllProductApi,
  getAllRequirementCollectionStatus,
};
