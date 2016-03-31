'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var AddressSchema = new mongoose.Schema({
  uid: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User',
  	require: true
  },
  phone: { type: String, require: true},
  city: { type: String, require: true},
  district: { type: String, require: true},
  ward: { type: String, require: true},
  street: { type: String, require: true},
  default: Boolean
});

AddressSchema
  .post('save', function(doc) {
    if(doc.default === true) {
      this.unDefaulOther(doc._id, doc.uid);
    }
  })

AddressSchema.methods = {
  
  unDefaulOther(id, uid) {
    this.model('Address').findAsync({uid: uid, _id: { $ne: id} })
      .then((doc) => {
        console.log(doc);
      });
  }
}

export default mongoose.model('Address', AddressSchema);
