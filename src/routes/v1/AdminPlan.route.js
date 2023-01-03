const express = require('express');
const router = express.Router();
const app = express();
const AdminPlanController = require('../../controllers/AdminPlan.controller');

router.route('/').post(AdminPlanController.createAdminPlane);

module.exports = router;
