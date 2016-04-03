'use strict';

var _ = require('lodash');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Braintree = require('../braintree/braintree.model');

var OrderDetailsSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number,
	total: Number
});

var OrderSchema = new mongoose.Schema({
  // Buyer details
  name: String,
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  },
  shippingAddress: String,
  billingAddress: String,

  // Price details
  items: [OrderDetailsSchema],
  // shipping: {
  // 	type: Number,
  // 	default: 0
  // },
  // tax: {
  // 	type: Number,
  // 	default: 0
  // },
  // discount: {
  // 	type: Number,
  // 	default: 0
  // },
  subTotal: Number,
  total: {
  	type: Number,
  	required: true
  },

  // Payment Info
  status: {
  	type: String,
  	default: 'pending' // pending, paid, failed, deliverd, cancelled, refunded
  },
  paymentType: {
  	type: String,
  	default: 'braintree'
  },
  paymentStatus: mongoose.Schema.Types.Mixed,
  nonce: String,
  type: String
});

OrderSchema.pre('validate', function (next) {
  if(!this.nonce) { return next(); }
  executePayment(this, function (err, result) {
    this.paymentStatus = result;
    if(err || !result.success){
      this.status = 'failed. ' + result.errors + err;
      next(err || result.errors);
    } else {
      this.status = 'paid';
      next();
    }
  }.bind(this));
});

function executePayment(payment, cb){
	console.log('model');
  Braintree.transaction.sale({
    amount: payment.total,
    paymentMethodNonce: payment.nonce,
  }, cb);
}

export default mongoose.model('Order', OrderSchema);
