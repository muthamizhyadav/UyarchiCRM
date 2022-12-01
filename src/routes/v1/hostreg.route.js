const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const hostregController = require('../../controllers/hostreg.controller');
const upload = require('../../middlewares/hostImage');
const hostImage = require('../../middlewares/hostProductImage');
const router = express.Router();
router.route('/').post(upload.array('image'), hostregController.createhostService)
router.route('/login').post(hostregController.login)
router.route('/product').post(hostImage.array('image'), hostregController.createhostProductService)
router.route('/Streamingtime').post(hostregController.createHostStremingService)
router.route('/getAllHost').get(hostregController.getAllHost)
router.route('/getAllLiveStremingDatas').get(hostregController.getAllLiveStremingDatas)
router.route('/getAllLiveStremingDatasSame/:id').get(hostregController.getAllLiveStremingDatasSame)
router.route('/getAllproductById/:id').get(hostregController.getAllproductById)
module.exports = router;