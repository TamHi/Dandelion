'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AddressSchema = new mongoose.Schema({
  uid: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User',
  	require: true
  },
  name: { type: String, require: true},
  phone: { type: String, require: true},
  city: { 
    type: {
      id: Number,
      title: String
    },
    require: true
  },
  district: { 
    type: {
      id: Number,
      title: String
    },
  },
  ward: { 
    type: {
      id: Number,
      title: String
    },
  },
  street: { type: String, require: true},
  default: Boolean
});

AddressSchema
  .post('save', function(doc, next) {
    // console.log(doc.name);
    if(doc.default === true) {
      this.unDefaulOther(doc._id, doc.uid);
      next();
    }
  })

AddressSchema.methods = {
  
  unDefaulOther(id, uid) {
    // console.log('unDefaulOther');
    this.model('Address').update({
      uid: uid, 
      _id: { $ne: id} ,
      default: true
    }, {
      $set: { default: false }
    })
    .exec();
  }
}

export default mongoose.model('Address', AddressSchema);
