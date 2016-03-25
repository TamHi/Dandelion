'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CartDetailsSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product'
	},
	quantity: Number
}, {_id: false});

var CartSchema = new mongoose.Schema({
  items: [CartDetailsSchema]
});

export default mongoose.model('Cart', CartSchema);
