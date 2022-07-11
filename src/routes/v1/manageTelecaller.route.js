const express = require('express');
const manageTelecallerController = require('../../controllers/manageTelecaller.controller');
const router = express.Router();

router.route('/').post(manageTelecallerController.createmanageTelecallerService);
router.route('/:id').get(manageTelecallerController.getmanageTeleServiceById).put(manageTelecallerController.updateManageAttendance).delete(manageTelecallerController.deletemanageAttendanceService)
router.route('/login').post(manageTelecallerController.login)

module.exports = router;