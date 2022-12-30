const express = require('express');
const router = express.Router();
const BuyerSellerController = require('../../controllers/BuyerSeller.controller');
const SellerBuyerAuth = require('../../controllers/buyerSellerAuth');
const BuyerAuth = require('../../controllers/BuyerAuth');
const sellerBuyrimg = require('../../middlewares/buyrSeller');
const Video = require('../../middlewares/videoUpload');
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
router
  .route('/getSellerRenter/POST/ForAdmin/:type/:propType/:page')
  .get(BuyerSellerController.getSellerRenter_POST_ForAdmin);
router.route('/ApproveAndReject/:id').put(BuyerSellerController.ApproveAndReject);
router.route('/Login/Buyer').post(BuyerSellerController.LoginWithmailBuyer);
router.route('/getApprover/Property/:page').get(BuyerSellerController.getApprover_Property);
router.route('/BuyerLike/Property/:id').get(BuyerAuth, BuyerSellerController.BuyerLike_Property);
router
  .route('/Update/Seller/Post/:id')
  .put(sellerBuyrimg.fields([{ name: 'image' }]), BuyerSellerController.UpdateSellerPost);
router.route('/VideoUpload/:id').put(Video.single('video'), BuyerSellerController.VideoUpload);
module.exports = router;
