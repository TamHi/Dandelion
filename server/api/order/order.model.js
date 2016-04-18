'use strict';

var _ = require('lodash');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Braintree = require('../braintree/braintree.model');
var fx = require('money');
var request = require('request');

import User from '../user/user.model';

var convertToTUSD = function(amount, cb) {
  // console.log(amount);
  return new Promise(function(resolve, reject) {
    var url = 'https://openexchangerates.org/api/latest.json?app_id=fb0b7026d8d34bd7af5e6c008f5f5e9e'
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        fx.base = result.base;
        fx.rates = result.rates;
        var rs = fx(amount).convert({from: 'VND', to: 'USD'});
        // console.log(rs);
        resolve(rs);
      }
      else {
        reject(err);
      }
    }) 
  })
    
};

var OrderDetailsSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number,
	total: Number
});

var OrderSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now
  },

  // Buyer details
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User',
    required: true
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },

  // Price details
  items: [OrderDetailsSchema],
  total: {
  	type: Number,
  	required: true
  },
  
  paymentStatus: {
    type: Boolean,
    default: false
  },
  shippingStatus: {
    type: Boolean,
    default: false
  },
  nonce: String,
  type: String
});

OrderSchema
  .pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
  })

  .post('save', function(doc) {
    if(this.wasNew) {
      User.update({_id: doc.user}, {$inc: {numOrders: 1}}).exec();
    }
  })
  .post('remove', function(doc) {
    console.log('Remove');
    User.update({_id: doc.user}, {$inc: {numOrders: -1}}).exec();
  })


OrderSchema.pre('validate', function (next) {
  console.log('Validate');

  if(!this.nonce) { return next(); }
  executePayment(this, function (err, result) {

    console.log(result.success);
    this.paymentStatus = result;
    if(err || !result.success){
      this.paymentStatus = false;
      next(err || result.errors);
    } else {
      next();
    }
  }.bind(this));
});

function executePayment(payment, cb){
  console.log('Pay');

  if(payment.type === 'CreditCard') {
    Braintree.transaction.sale({
      amount: payment.total,
      paymentMethodNonce: payment.nonce
    }, cb);
  }

  if(payment.type === 'PayPalAccount') {
    convertToTUSD(payment.total)
      .then(function(amount) {
        Braintree.transaction.sale({
          amount: Math.round( amount * 10 ) / 10,
          paymentMethodNonce: payment.nonce,
          merchantAccountId: "dandelion"
        }, cb);
      });
  } 
};

export default mongoose.model('Order', OrderSchema);