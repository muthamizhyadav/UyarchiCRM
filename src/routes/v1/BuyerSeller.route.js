const express = require('express');
const router = express.Router();
const BuyerSellerController = require('../../controllers/BuyerSeller.controller');
const SellerBuyerAuth = require('../../controllers/buyerSellerAuth');
const sellerBuyrimg = require('../../middlewares/buyrSeller');

router.route('/Register').post(BuyerSellerController.createBuyerSeller);
router.route('/verify').post(BuyerSellerController.verifyOtp);
router
  .route('/createSellerPost')
  .post(SellerBuyerAuth, sellerBuyrimg.array('image'), BuyerSellerController.createSellerPost);
router.route('/login').post(BuyerSellerController.LoginWithmail);
router.route('/buyer/render').post(SellerBuyerAuth, BuyerSellerController.createBuyerRentiee);
router.route('/SearchHouse').get(SellerBuyerAuth, BuyerSellerController.SearchHouseFlatByBuyer_Or_Rentiee);
router.route('/DisplayAvailable/HouseOr/Flat').get(BuyerSellerController.DisplayAvailable_HouseOr_Flat);
router.route('/AutoMatches/ForBuyer/rentiee').get(SellerBuyerAuth, BuyerSellerController.AutoMatches_ForBuyer_rentiee);
router.route('/createBuyer').post(BuyerSellerController.createBuyer);
router.route('/verifyOtpBuyer').post(BuyerSellerController.verifyOtpBuyer);
router.route('/createAdmin').post(BuyerSellerController.createAdmin);
router.route('/AdminLogin').post(BuyerSellerController.AdminLogin);
router.route('/getSellerRenter/POST/ForAdmin').get(BuyerSellerController.getSellerRenter_POST_ForAdmin);
module.exports = router;
