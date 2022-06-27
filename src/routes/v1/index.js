const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const jobEnquiryRoute = require('./jobEnquiry.route');
const supplierRoute = require('./supplier.route');
const requirementCollectionRoute = require('./requirementCollection.route')
const supplierAppUserRoute = require('./supplierAppUser.route')
const slotandSlotsubmitRoute = require('./slotandSlotsubmit.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path :'/jobenquiry',
    route : jobEnquiryRoute,
  },
  {
    path:'/supplier',
    route : supplierRoute,
  },
  {
    path:'/requirementCollection',
    route: requirementCollectionRoute,
  },
  {
     path:'/supplierAppUser',
    route: supplierAppUserRoute,
  },
  {
    path:'/slotandSlotsubmit',
    route: slotandSlotsubmitRoute,
  },

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
