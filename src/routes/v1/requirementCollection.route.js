const express = require('express');
const requirementCollectionController = require('../../controllers/requirementCollection.controller');
const router = express.Router();
router.route('/').post(requirementCollectionController.createRequirementCollectionService).get(requirementCollectionController.getAllRequirementCollection)
router.route('/allData').get(requirementCollectionController.getAllRequirementCollectionDeleteService)
router
  .route('/:requirementId')
  .get(requirementCollectionController.getRequirementCollectionByIdService)
  .put(requirementCollectionController.updateRequirementCollectionByIdService)
  .delete(requirementCollectionController.deleteRequirementCollectionByIdService);

// router.route('/type/getName/:type').get(supplierController.createSupplierwithType)

module.exports = router;