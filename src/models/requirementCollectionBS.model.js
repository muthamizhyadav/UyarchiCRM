const mongoose = require('mongoose');
const { v4 } = require('uuid');

const requirementBuyerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  product: {
    type: String,
  },
  minrange: {
    type: Number,
  },
  maxrange: {
    type: Number,
  },
  minprice: {
    type: Number,
  },
  maxprice: {
    type: Number,
  },
  pdelivery: {
    type: String,
  },
  deliverylocation: {
    type: String,
  },
  deliveryDate:{
    type:String,
  },
  deliveryTime:{
    type:Number,
  },
  date:{
    type:String,
  },
  time:{
    type:Number,
},
lat:{
    type:Number,
},
lang:{
    type:Number,
},
status:{
    type:String,
  },
requirementAddBy:{
    type:String,
  },
 active: {
    type: Boolean,
    default: true,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const RequirementBuyer = mongoose.model('requirementBuyer', requirementBuyerSchema);
const requirementSupplierSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
    },
    userId: {
      type: String,
    },
    product: {
      type: String,
    },
   stockLocation:{
    type:String,
   },
   requirementAddBy:{
    type:String,
  },
   stockAvailabilityDate:{
    type:String,
   },
   stockAvailabilityTime:{
    type:Number,
   },
   stockPosition:{
    type:String,
   },
   packType:{
    type:String,
   },
   expectedQnty:{
    type:Number,
   },
   expectedPrice:{
    type:Number,
   },
   paymentMode:{
    type:String,
   },
   advance:{
    type:String,
   },

    date:{
      type:String,
    },
    time:{
  type:String,
  },
  lat:{
      type:Number,
  },
  lang:{
      type:Number,
  },
  status:{
    type:String,
  },
   active: {
      type: Boolean,
      default: true,
    },
    archive: {
      type: Boolean,
      default: false,
    },
  });
  
  const RequirementSupplier = mongoose.model('requirementSupplier', requirementSupplierSchema);

module.exports = {
    RequirementBuyer,
    RequirementSupplier,
}
