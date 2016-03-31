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
  city: { type: Number, require: true},
  district: { type: Number, require: true},
  ward: { type: Number, require: true},
  street: { type: String, require: true},
  default: Boolean
});

AddressSchema
  .post('save', function(doc) {
    // console.log(doc.name);
    if(doc.default === true) {
      this.unDefaulOther(doc._id, doc.uid);
    }
  })

AddressSchema.methods = {
  
  unDefaulOther(id, uid) {
    console.log('unDefaulOther');
    this.model('Address').update({
      uid: uid, 
      _id: { $ne: id} ,
      default: true
    }, {
      $set: { default: false }
    })
    .then((docs) => {console.log(docs)});

    // this.model('Address').updateAsync({
    //   uid: uid, 
    //   _id: { $ne: id} 
    // }, {$set: {default: false}})
    //   .then((addresses) => {
    //     console.log(addresses);
    //   });
  }
}

export default mongoose.model('Address', AddressSchema);
