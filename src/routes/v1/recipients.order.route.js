const express = require('express');
const router = express.Router();
const RecipentOrdersController = require('../../controllers/recipients.order.controller');

router.route('/').post(RecipentOrdersController.createRecipientsOrders);

module.exports = router;
