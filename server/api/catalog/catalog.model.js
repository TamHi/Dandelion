'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CatalogSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  slug: {
  	type: String,
  	required: true
  },
  parent: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Catalog'
  },
  ancestor: [{
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Catalog'
  }],
  children: [{
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Catalog'
  }]
});

CatalogSchema.methods = {
	addChild: function(child) {
		var _this = this;
		child.parent = this._id;
		child.ancestor = this.ancestor.concat([this._id]);
		
		return this.model('Catalog').createAsync(child)
			.then(function(child) {
				// console.log(child);
				_this.children.push(child._id);
				_this.save();
				return child;
			});
	}
}

export default mongoose.model('Catalog', CatalogSchema);
