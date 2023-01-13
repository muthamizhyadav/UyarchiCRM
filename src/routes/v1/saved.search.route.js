const express = require('express');
const router = express.Router();
const SavedSearchController = require('../../controllers/saved.search.controller');
const Auth = require('../../controllers/BuyerAuth');

router.route('/').post(Auth, SavedSearchController.CreateSavedSearch);

module.exports = router;
