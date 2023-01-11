const express = require('express');
const propertyVisitController = require('../../controllers/propertyVisit.Controller');
const router = express.Router();

router.route('/').post(propertyVisitController.createPropertyVisit);

module.exports = router;
