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
	description: {
    type: String,
    default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  // imageBin: {
  //   data: Buffer,
  //   contentType: String
  // },
  imageUrl: [String],
  categories: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Catalog',
      index: true
    }

}).index({
  'title': 'text',
  'description': 'text'
});

export default mongoose.model('Product', ProductSchema);
