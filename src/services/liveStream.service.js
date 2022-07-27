const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const liveStream = require('../models/liveStream.model');
const Agora = require("agora-access-token");

const createLiveStream = async (userBody) => {

  const appID = "50c7493877764c85aa44d921a68f2b38";
  const appCertificate = "deb15b1b53e44c46abf51172bc552daa";

  // const user = req.body.user;
  // const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, "live", expirationTimestamp);
  return liveStream.create({ token: token, userId: userBody.userId, requirementId: userBody.requirementId });
};

const getliveStream = async (id) => {
  const data = await liveStream.aggregate([
    {
      $match: {
        $and: [{ _id: { $eq: id } }],
      },
    },
    {
      $lookup: {
        from: "requirementsuppliers",
        localField: "requirementId",
        foreignField: "_id",
        as: "requirementsuppliers"
      }
    },
    { $unwind: "$requirementsuppliers" },
    {
      $lookup: {
        from: "suppliers",
        localField: "userId",
        foreignField: "_id",
        as: "suppliers"
      }
    },
    { $unwind: "$suppliers" },
    {
      $project: {
        liveStreamDate: "$requirementsuppliers.liveStreamDate",
        liveStreamTime: "$requirementsuppliers.liveStreamTime",
        date: "$requirementsuppliers.date",
        product: "$requirementsuppliers.product",
        expectedPrice: "$requirementsuppliers.expectedPrice",
        expectedQnty: "$requirementsuppliers.expectedQnty",
        billId: "$requirementsuppliers.billId",
        userId: 1,
        secretName: "$suppliers.secretName",
        adminAprove: 1,
        streaming: 1,
        expiry: 1,
        token: 1
      }
    }
  ])
  return data;
};
const getAllliveStriming = async () => {
  const data = await liveStream.aggregate([
    {
      $lookup: {
        from: "requirementsuppliers",
        localField: "requirementId",
        foreignField: "_id",
        as: "requirementsuppliers"
      }
    },
    { $unwind: "$requirementsuppliers" },
    {
      $lookup: {
        from: "suppliers",
        localField: "userId",
        foreignField: "_id",
        as: "suppliers"
      }
    },
    { $unwind: "$suppliers" },
    {
      $project: {
        liveStreamDate: "$requirementsuppliers.liveStreamDate",
        liveStreamTime: "$requirementsuppliers.liveStreamTime",
        date: "$requirementsuppliers.date",
        product: "$requirementsuppliers.product",
        billId: "$requirementsuppliers.billId",
        userId: 1,
        secretName: "$suppliers.secretName",
        adminAprove: 1,
        streaming: 1,
        expiry: 1,
      }
    }
  ]);
  return data;
};
const updatetoken = async (id, bodydata) => {
  const data = await liveStream.findByIdAndUpdate({ _id: id }, bodydata, { new: true });
  return data;
};


const getAllliveStrimingapproved = async (id) => {
  const data = await liveStream.aggregate([
    {
      $match: {
        $and: [{ adminAprove: { $eq: "Approved" } }, { userId: { $eq: id } }],
      },
    },
    {
      $lookup: {
        from: "requirementsuppliers",
        localField: "requirementId",
        foreignField: "_id",
        as: "requirementsuppliers"
      }
    },
    { $unwind: "$requirementsuppliers" },
    {
      $lookup: {
        from: "suppliers",
        localField: "userId",
        foreignField: "_id",
        as: "suppliers"
      }
    },
    { $unwind: "$suppliers" },
    {
      $project: {
        liveStreamDate: "$requirementsuppliers.liveStreamDate",
        liveStreamTime: "$requirementsuppliers.liveStreamTime",
        date: "$requirementsuppliers.date",
        product: "$requirementsuppliers.product",
        expectedPrice: "$requirementsuppliers.expectedPrice",
        expectedQnty: "$requirementsuppliers.expectedQnty",
        billId: "$requirementsuppliers.billId",
        userId: 1,
        secretName: "$suppliers.secretName",
        adminAprove: 1,
        streaming: 1,
        expiry: 1,
      }
    }
  ]);
  return data;
};
const getBuyerWatch = async (id) => {
  const data = await liveStream.aggregate([
    {
      $match: {
        $and: [{ adminAprove: { $eq: "Approved" } }, { streaming: { $eq: "Online" } }],
      },
    },
    {
      $lookup: {
        from: "requirementsuppliers",
        localField: "requirementId",
        foreignField: "_id",
        as: "requirementsuppliers"
      }
    },
    { $unwind: "$requirementsuppliers" },
    {
      $lookup: {
        from: "suppliers",
        localField: "userId",
        foreignField: "_id",
        as: "suppliers"
      }
    },
    { $unwind: "$suppliers" },
    {
      $project: {
        liveStreamDate: "$requirementsuppliers.liveStreamDate",
        liveStreamTime: "$requirementsuppliers.liveStreamTime",
        date: "$requirementsuppliers.date",
        product: "$requirementsuppliers.product",
        expectedPrice: "$requirementsuppliers.expectedPrice",
        expectedQnty: "$requirementsuppliers.expectedQnty",
        billId: "$requirementsuppliers.billId",
        userId: 1,
        secretName: "$suppliers.secretName",
        adminAprove: 1,
        streaming: 1,
        expiry: 1,
        _id:1,
      }
    }
  ]);
  return data;
};

module.exports = { createLiveStream, getliveStream, getAllliveStriming, updatetoken, getAllliveStrimingapproved,getBuyerWatch };