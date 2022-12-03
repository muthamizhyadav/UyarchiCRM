const express = require('express');
const router = express.Router();
const RecipentOrdersController = require('../../controllers/recipients.order.controller');
const authorization = require('../../controllers/authorization.controller');

router.route('/').post(RecipentOrdersController.createRecipientsOrders);
router.route('/orders/:id').get(authorization, RecipentOrdersController.getRecipientOrdered_data);

module.exports = router;
