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

module.exports = router;