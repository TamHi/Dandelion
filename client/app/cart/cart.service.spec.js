'use strict';

describe('Service: cart', function () {

  // load the service's module
  beforeEach(module('dandelionApp'));

  // instantiate service
  var cart;
  beforeEach(inject(function (_cart_) {
    cart = _cart_;
  }));

  it('should do something', function () {
    expect(!!cart).to.be.true;
  });

});
