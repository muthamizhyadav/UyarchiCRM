const express = require('express');
const supplierAppUserController = require('../../controllers/supplierAppUser.controller');
const router = express.Router();

router.route('/').post(supplierAppUserController.createsupplierAppUserService);
router.route('/').get(supplierAppUserController.getsupplierAppUserServiceAll);
router.route('/login').post(supplierAppUserController.login);
router
  .route('/:supplierAppUserId')
  .get(supplierAppUserController.getsupplierAppUserServiceById)
  .put(supplierAppUserController.updateSupplierAppUserService)
  .delete(supplierAppUserController.deleteSupplierAppUserService);

module.exports = router;