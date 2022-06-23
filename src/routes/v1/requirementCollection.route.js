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

router.route('/thirdPartyApi/category').get(requirementCollectionController.getUyarchiApi)



router.route('/supplier/productName/').get(requirementCollectionController.getAllmaxmin)
router.route('/buyer/productAll').get(requirementCollectionController.getproductAll)

module.exports = router;