'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProductSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true,
  	trim: true
  },
  sku: {
    type: String,
    unique: true
  },
  price: {
  	type: Number,
  	required: true,
  	min: 0
  },
	stock: {
		type: Number,
		default: 1	
	},
	description: String,
  imageBin: {
    data: Buffer,
    contentType: String
  },
  imageUrl: String
});

export default mongoose.model('Product', ProductSchema);
