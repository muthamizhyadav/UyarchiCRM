const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { RequirementBuyer,RequirementSupplier } = require('../models/requirementCollectionBS.model');
const {SupplierRequirementUpdate,BuyerRequirementUpdate} = require('../models/requirementUpdateBS')
const supplier = require('../models/supplier.model')
const axios = require('axios');


const createRequirementBuyer = async (buyerBody) => {
    const {userId} = buyerBody;
    let supp = await supplier.findById(userId);
    let values = {}
    values = {...buyerBody, ...{userId:supp._id}}
    if(supp === null){
      throw new ApiError(httpStatus.NO_CONTENT, "!oops 🖕")
    }
    return RequirementBuyer.create(values);
    };

const createRequirementSupplier = async (supplierBody)=>{
    const {userId} = supplierBody;
    let buy = await supplier.findById(userId);
    let values = {}
    values = {...supplierBody, ...{userId:buy._id}}
    if(buy === null){
      throw new ApiError(httpStatus.NO_CONTENT, "!oops 🖕")
    }
    return RequirementSupplier.create(values)
}

const getByIdBuyer = async (buyerId) => {
    return RequirementBuyer.aggregate([
      {
        $match:{
          $and:[{_id:{$eq:buyerId}}]
        }
    },
    {
      $lookup:{
        from:'suppliers',
        localField:'userId',
        foreignField:'_id',
        as:'suppliersData'
      }
    },
    {
      $unwind:'$suppliersData'
    },
    {
      $project:{
        name:'$suppliersData.primaryContactName',
        secretName:'$suppliersData.secretName',
        _id:1,
        minrange:1,
        maxrange:1,
        minprice:1,
        maxprice:1,
        pdelivery:1,
        deliverylocation:1,
        deliveryDate:1,
        deliveryTime:1,
        requirementAddBy:1,
        date:1,
        time:1,
        lat:1,
        lang:1,
        status:1,
        product:1,
      }
    },
    ])
}

const getByIdSupplier = async (supplierId) => {
    return RequirementSupplier.aggregate([
      {
          $match:{
            $and:[{_id:{$eq:supplierId}}]
          }
      },
      {
        $lookup:{
          from:'suppliers',
          localField:'userId',
          foreignField:'_id',
          as:'suppliersData'
        }
      },
      {
        $unwind:'$suppliersData'
      },
      {
        $project:{
          name:'$suppliersData.primaryContactName',
          secretName:'$suppliersData.secretName',
          _id:1,
          product:1,
          stockLocation:1,
          stockPosition:1,
          packType:1,
          expectedPrice:1,
          expectedQnty:1,
          paymentMode:1,
          requirementAddBy:1,
          stockAvailabilityDate:1,
          stockAvailabilityTime:1,
          date:1,
          time:1,
          lat:1,
          lang:1,
          status:1,
          advance:1,
        }
      },
    ])
}

const getByIdBuyerAll = async () => {
    return RequirementBuyer.aggregate([
      {
        $match:{
          $and:[{active:{$eq:true}}]
        }
    },
    {
      $lookup:{
        from:'suppliers',
        localField:'userId',
        foreignField:'_id',
        as:'suppliersData'
      }
    },
    {
      $unwind:'$suppliersData'
    },
    {
      $project:{
        name:'$suppliersData.primaryContactName',
        secretName:'$suppliersData.secretName',
        _id:1,
        minrange:1,
        maxrange:1,
        minprice:1,
        maxprice:1,
        pdelivery:1,
        deliverylocation:1,
        deliveryDate:1,
        deliveryTime:1,
        requirementAddBy:1,
        date:1,
        time:1,
        lat:1,
        lang:1,
        status:1,
        product:1,
      }
    },
    ])
}

const getByIdSupplierAll = async () => {
    return RequirementSupplier.aggregate([
      {
        $match:{
          $and:[{active:{$eq:true}}]
        }
      },
      {
        $lookup:{
          from:'suppliers',
          localField:'userId',
          foreignField:'_id',
          as:'suppliersData'
        }
      },
      {
        $unwind:'$suppliersData'
      },
      {
        $project:{
          name:'$suppliersData.primaryContactName',
          secretName:'$suppliersData.secretName',
          _id:1,
          product:1,
          stockLocation:1,
          stockPosition:1,
          packType:1,
          expectedPrice:1,
          expectedQnty:1,
          paymentMode:1,
          date:1,
          time:1,
          lat:1,
          lang:1,
          status:1,
          advance:1,
        }
      },
    ])
}

const updateRequirementBuyerById = async (buyerId, updateBody) => {
    let data = await getByIdBuyer(buyerId);
  console.log(data)
  let values = {}
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer not found');
    }
    values = {...{userId:data.userId , buyerReqId:data._id, QtyMin:data.minrange, QtyMax:data.maxrange, priceMin:data.minprice ,priceMax:data.maxprice ,deliveryLocation:data.deliverylocation ,date:data.date ,time:data.time}}
    BuyerRequirementUpdate.create(values)
    data = await RequirementBuyer.findByIdAndUpdate({ _id: buyerId }, updateBody, { new: true });

    return data;
  }; 


const updateRequirementSupplierById = async (supplierId, updateBody) => {
    let data = await getByIdSupplier(supplierId);

    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier not found');
    }
    let values ={}
    values = {...{userId:data.userId, supplierReqId:data._id, updatedQty:data.expectedQnty, price:data.expectedPrice, stockLocation:data.stockLocation, date:data.date, time:data.time}}
    SupplierRequirementUpdate.create(values)

    data = await RequirementSupplier.findByIdAndUpdate({ _id: supplierId }, updateBody, { new: true });
    return data;
  };
  
const deleteRequirementBuyerById = async (buyerId) => {
    const data = await getByIdBuyer(buyerId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementBuyer not found');
    }
    (data.active = false), (data.archive = true), await data.save();
    return data;
  };

  const deleteRequirementSupplierById = async (supplierId) => {
    const data = await getByIdSupplier(supplierId);
    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'RequirementSupplier not found');
    }
    (data.active = false), (data.archive = true), await data.save();
    return data;
  };



    module.exports = {
        createRequirementBuyer,
        createRequirementSupplier,
        getByIdBuyer,
        getByIdSupplier,
        getByIdBuyerAll,
        getByIdSupplierAll,
        updateRequirementBuyerById,
        updateRequirementSupplierById,
        deleteRequirementBuyerById,
        deleteRequirementSupplierById,
   };

