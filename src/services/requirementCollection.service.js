const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { requirementCollection } = require('../models');

const createRequirementCollection = async (requirementCollectionBody) => {
  return requirementCollection.create(requirementCollectionBody);
};

const getAllRequirementCollection = async () => {
  return requirementCollection.find({ active: true });
};

// const createSupplierBuyerwithType = async (type) => {
//   let values;
//   if (type == 'Supplier') {
//     values = await SupplierBuyer.find({ type: 'Supplier' });
//   } else if (type == 'Buyer') {
//     values = await SupplierBuyer.find({ type: 'Buyer' });
//   }else if(type == "Both") {
//     values = await SupplierBuyer.find({ type: 'Both' });
//   }
//   return values;
// };

const getAllRequirementCollectionDelete = async () => {
  return requirementCollection.find();
};

const getRequirementCollectionById = async (requirementId) => {
  const requirement = requirementCollection.findById(requirementId);
  if (!requirement) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementCollection Not Found');
  }
  return requirement;
};

const updateRequirementCollectionById = async (requirementId, updateBody) => {
  let requirementUpdate = await getRequirementCollectionById(requirementId);
  if (!requirementUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementCollection not found');
  }
  requirementUpdate = await requirementCollection.findByIdAndUpdate({ _id: requirementId }, updateBody, { new: true });
  return requirementUpdate;
};

const deleteRequirementCollectionById = async (requirementId) => {
  const requirementDelete = await getRequirementCollectionById(requirementId);
  if (!requirementDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RequirementCollection not found');
  }
  (requirementDelete.active = false), (requirementDelete.archive = true), await requirementDelete.save();
  return requirementDelete;
};

module.exports = {
  createRequirementCollection,
  getAllRequirementCollection,
  getAllRequirementCollectionDelete,
  getRequirementCollectionById,
  updateRequirementCollectionById,
  deleteRequirementCollectionById,
};
