const httpStatus = require('http-status');
//const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const  requirementCollectionService = require('../services/requirementCollectionBS.service');

const createRequirementBuyerService = catchAsync(async (req, res) => {
  const data = await requirementCollectionService.createRequirementBuyer(req.body);
  res.status(httpStatus.CREATED).send(data);
});


const createRequirementSupplierService = catchAsync(async (req, res) => {
    const data = await requirementCollectionService.createRequirementSupplier(req.body);
    res.status(httpStatus.CREATED).send(data);
  });

const getBuyerById = catchAsync (async (req, res)=>{
  const buyer = await requirementCollectionService.getByIdBuyer(req.params.buyerId)
  if(!buyer || buyer.active == false){
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer Not Found');
  }
  res.send(buyer)
})

// updateData
  
const getUpdateDataQnty = catchAsync (async (req, res)=>{
   const data = await requirementCollectionService.getUpdateDataQty(req.params.id)
   if(!data){
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier Not Found');
  }
  res.send(data)
})

const getUpdateDataBuyerQnty = catchAsync (async (req, res)=>{
  const data = await requirementCollectionService.getUpdateDataBuyerQty(req.params.id)
  if(!data){
   throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier Not Found');
 }
 res.send(data)
})

const getSupplierById = catchAsync (async (req, res)=>{
    const data = await requirementCollectionService.getByIdSupplier(req.params.supplierId)
    if(!data || data.active == false){
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier Not Found');
    }
    res.send(data)
  })


const getAllBuyer = catchAsync (async (req, res)=>{
  const buyer = await requirementCollectionService.getByIdBuyerAll(req.params)
  res.send(buyer)
})


const getAllSupplier = catchAsync (async (req, res)=>{
    const data = await requirementCollectionService.getByIdSupplierAll(req.params)
    res.send(data)
  })

const updateRequirementBuyerById = catchAsync(async (req, res) => {
  const requirement = await requirementCollectionService.updateRequirementBuyerById(req.params.buyerId, req.body);
  if (!requirement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer Not Found');
  }
  res.send(requirement);
});


const updateRequirementSupplierById = catchAsync(async (req, res) => {
    const requirement = await requirementCollectionService.updateRequirementSupplierById(req.params.supplierId, req.body);
    if (!requirement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier Not Found');
    }
    res.send(requirement);
  });
  

const deleteRequirementBuyerById = catchAsync(async (req, res) => {
    const requirement = await requirementCollectionService.deleteRequirementBuyerById(req.params.buyerId);
    res.status(httpStatus.NO_CONTENT).send(requirement);
  });


const deleteRequirementSupplierById = catchAsync(async (req, res) => {
  const requirement = await requirementCollectionService.deleteRequirementSupplierById(req.params.supplierId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createRequirementBuyerService,
    createRequirementSupplierService,
    getBuyerById,
    getSupplierById,
    getAllBuyer,
    getAllSupplier,
    updateRequirementBuyerById,
    updateRequirementSupplierById,
    deleteRequirementBuyerById,
    deleteRequirementSupplierById,
    getUpdateDataQnty,
    getUpdateDataBuyerQnty,
};