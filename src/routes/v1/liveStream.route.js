const express = require('express');
const liveStreamController = require('../../controllers/liveStream.controller');

const router = express.Router();
router.route('/').post(liveStreamController.createliveStream)
router.route('/:id').get(liveStreamController.getliveStreamId)
router.route('/:id').put(liveStreamController.updatetoken)
router.route('/getAll/token').get(liveStreamController.getAllliveStriming)
router.route('/getAll/token/approved/:uId').get(liveStreamController.getAllliveStrimingapproved)
router.route('/getAll/token/approved/buyer/:uId').get(liveStreamController.getBuyerWatch)
router.route('/getAll/token/approved/buyerData/:id').get(liveStreamController.getAllBuyerMatch)
router.route('/getAll/token/approved/supplierData/:id').get(liveStreamController.getAllSUpplierMatch)
router.route('/updateBuyerId/:id').put(liveStreamController.updateBuyer)
module.exports = router;