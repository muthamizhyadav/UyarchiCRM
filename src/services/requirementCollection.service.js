const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { requirementCollection } = require('../models');
const axios = require('axios');

const createRequirementCollection = async (requirementCollectionBody) => {
  return requirementCollection.create(requirementCollectionBody);
};

const getAllRequirementCollection = async () => {
  return requirementCollection.aggregate([
    {
      $lookup:{
          from: "suppliers",  
          localField:"name",
          foreignField:"_id", 
          as: "suppliersData" 
      }
  },
  {   $unwind:"$suppliersData" }, 
  {   
    $project:{
        _id : 1,
        type:1,
        name:'$suppliersData.primaryContactName',
        buyerpname:1,
        minrange:1,
        maxrange:1,
        minprice:1,
        maxprice:1,
        pdelivery:1,
        deliverylocation:1,
        buyerdeliverydate:1,
        supplierpname:1,
        stocklocation:1,
        stockposition:1,
        stockavailabilitydate:1,
        packtype:1,
        expquantity:1,
        expprice:1,
        paymentmode:1,
        supplierid:1,
        buyerid:1,
        selectboth:1,
        advance:1,
        Date:1,
        status:1,
        reasonCallback:1,
        dateCallback:1,
        feedbackCallback:1,
        statusAccept:1,
        aliveFeedback:1,
        deadFeedback:1,
        modificationFeedback:1,
        moderateStatus:1,
        editedPrice:1,
        moderateRejectReason:1,
        latitude:1,
        longitude:1,
        active:1,
        archive:1
    } 
}
  ])
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


// thirdpartyApi's
const UyarchiApi = async () => {
  let response = await axios.get(`https://kapture.click/v1/category/product/category`)
 return response.data
};

module.exports = {
  createRequirementCollection,
  getAllRequirementCollection,
  getAllRequirementCollectionDelete,
  getRequirementCollectionById,
  updateRequirementCollectionById,
  deleteRequirementCollectionById,
  UyarchiApi,
};
