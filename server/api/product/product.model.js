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
  slug: String,
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
  imageUrl: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catalog',
      index: true
    }
  ]
}).index({
  'title': 'text',
  'description': 'text'
});

export default mongoose.model('Product', ProductSchema);
