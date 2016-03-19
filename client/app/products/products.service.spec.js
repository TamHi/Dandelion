'use strict';

describe('Service: Product', function () {

  // load the service's module
  beforeEach(module('dandelionApp'));

  // instantiate service
  var Product;
  beforeEach(inject(function (_Product_) {
    Product = _Product_;
  }));

  it('should do something', function () {
    expect(!!Product).to.be.true;
  });

});
