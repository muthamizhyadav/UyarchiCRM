const express = require('express');
const requirementCollectionController = require('../../controllers/requirementCollectionBS.controller');
const router = express.Router();
router.route('/Buyer').post(requirementCollectionController.createRequirementBuyerService).get(requirementCollectionController.getAllBuyer)
router.route('/Supplier').post(requirementCollectionController.createRequirementSupplierService).get(requirementCollectionController.getAllSupplier)
router
  .route('/Buyer/:buyerId')
  .get(requirementCollectionController.getBuyerById)
  .put(requirementCollectionController.updateRequirementBuyerById)
  .delete(requirementCollectionController.deleteRequirementBuyerById);

  router
  .route('/Supplier/:supplierId')
  
  .get(requirementCollectionController.getSupplierById)
  .put(requirementCollectionController.updateRequirementSupplierById)
  .delete(requirementCollectionController.deleteRequirementSupplierById);

  // updateData
  router.route('/Supplier/UpdataData/:id').get(requirementCollectionController.getUpdateDataQnty)
  router.route('/Buyer/UpdataData/:id').get(requirementCollectionController.getUpdateDataBuyerQnty)
  router.route('/Supplier/UpdateModerate/:id').get(requirementCollectionController.getModerateData)

  // BuyerNotDead
  router.route('/Buyer/Live/all').get(requirementCollectionController.getAllBuyerNotDead)
  router.route('/Buyer/SameProduct/all/:id').get(requirementCollectionController.getAllBuyerProductSame)
  router.route('/Buyer/SameProduct/short/all/:id').get(requirementCollectionController.getShortclickById)
module.exports = router;