const express = require('express');
const liveStreamController = require('../../controllers/liveStream.controller');

const router = express.Router();
router.route('/').post(liveStreamController.createliveStream)
router.route('/:id').get(liveStreamController.getliveStreamId)
router.route('/:id').put(liveStreamController.updatetoken)
router.route('/getAll/token').get(liveStreamController.getAllliveStriming)

module.exports = router;