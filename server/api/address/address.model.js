'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import User from '../user/user.model';

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
  .pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
  })

  .post('save', function(doc, next) {
    if(this.wasNew){
      User.update({_id: doc.uid}, {$inc: {numAddresses: 1}}).exec();
    }

    if(doc.default === true) {
      this.unDefaulOther(doc._id, doc.uid);
      next();
    }
  })

  .post('remove', function(doc) {
    User.update({_id: doc.uid}, {$inc: {numAddresses: -1}}).exec();
  })

AddressSchema.methods = {
  
  unDefaulOther(id, uid) {
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
