const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const jobEnquiryRoute = require('./jobEnquiry.route');
const supplierRoute = require('./supplier.route');
const requirementCollectionRoute = require('./requirementCollection.route');
const supplierAppUserRoute = require('./supplierAppUser.route');
const slotandSlotsubmitRoute = require('./slotandSlotsubmit.route');
const requirementCollectionBSRoute = require('./requirementCollectionBS.route');
const interestTableRoute = require('./interestTable.route');
const manageTelecallerRoute = require('./manageTelecaller.route');
const liveStreamRoute = require('./liveStream.route');
const paymentDataRoute = require('./paymentData.route');
const adminRegistrationRoute = require('./adminRegistration.route');
const chattingRoute = require('./chating.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/chating',
    route: chattingRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/jobenquiry',
    route: jobEnquiryRoute,
  },
  {
    path: '/supplier',
    route: supplierRoute,
  },
  {
    path: '/requirementCollection',
    route: requirementCollectionRoute,
  },
  {
    path: '/supplierAppUser',
    route: supplierAppUserRoute,
  },
  {
    path: '/slotandSlotsubmit',
    route: slotandSlotsubmitRoute,
  },
  {
    path: '/requirementCollectionBS',
    route: requirementCollectionBSRoute,
  },
  {
    path: '/interestTable',
    route: interestTableRoute,
  },
  {
    path: '/manageTelecaller',
    route: manageTelecallerRoute,
  },
  {
    path: '/liveStream',
    route: liveStreamRoute,
  },
  {
    path: '/paymentData',
    route: paymentDataRoute,
  },
  {
    path: '/adminRegistration',
    route: adminRegistrationRoute,
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
