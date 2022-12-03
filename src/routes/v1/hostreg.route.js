const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const hostregController = require('../../controllers/hostreg.controller');
const upload = require('../../middlewares/hostImage');
const hostImage = require('../../middlewares/hostProductImage');
const router = express.Router();
const authorization = require('../../controllers/authorization.controller');

router.route('/').post(upload.array('image'), hostregController.createhostService);
router.route('/login').post(hostregController.login);
router.route('/product').post(hostImage.array('image'), hostregController.createhostProductService);
router.route('/Streamingtime').post(hostregController.createHostStremingService);
router.route('/getAllHost').get(hostregController.getAllHost);
router.route('/RecipentAll').get(hostregController.RecipentAll);
router.route('/getAllLiveStremingDatas').get(authorization, hostregController.getAllLiveStremingDatas);
router.route('/getAllLiveStremingDatasSame/:id').get(hostregController.getAllLiveStremingDatasSame);
router.route('/getAllproductById/:id').get(hostregController.getAllproductById);
router.route('/getAllStreamingId/:id').get(hostregController.getAllStreamingId);
router.route('/getAll').get(hostregController.getAll);
router.route('/getAllStreamingToken/:id').get(hostregController.getAllStreamingToken);
router.route('/getlive/Product').get(hostregController.getliveProduct);
router.route('/live/updation/:id').put(hostregController.liveUpdations);
router.route('/user/product/live').get(authorization, hostregController.getUserProductLive);
router.route('/get/product/:id').get(hostregController.getproductById);
module.exports = router;