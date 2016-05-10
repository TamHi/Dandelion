/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Order from './order.model';
import Product from '../product/product.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    console.log('Updates');
    console.log(updates);
    console.log('Entity');
    console.log(entity);

    var updated = _.merge(entity, updates);

    console.log('Updated');
    console.log(updated);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  // if(err.message == 'Out of stock')
  // console.log(err);
  // statusCode = err.statusCode || statusCode || 500;
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    // if(err.message == 'Out of stock') statusCode = 422;
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orders
export function index(req, res) {
  Order.find()
    .populate('user')
    .populate('shippingAddress')
    .populate('items.product')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Orders
export function userOrder(req, res) {
  Order.find({user: req.params.id})
    // .then((orders) => {
    //   console.log(req.params.id);
    //   console.log(orders);
    // })
    .populate('user')
    .populate('shippingAddress')
    .populate('items.product')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

var checkQuantity = function(items) {
  var arrayLength = items.length;
  console.log(arrayLength);

  return new Promise(function(resolve, reject) {
    var outOfStock = false;
    var itemsProcessed = 0;

    _.forEach(items, function(item) {
      console.log('forEach');

      Product.findByIdAsync(item.product, 'stock')
        .then(product => {
          itemsProcessed++;
          console.log(product);
          if(product.stock < item.quantity) {
            console.log('Not save');
            outOfStock = true;
          }
          if(itemsProcessed === arrayLength) {
            console.log('End array');
            resolve(outOfStock);
          }
        })
    })
  });
};
// Creates a new Order in the DB
export function create(req, res) {

  checkQuantity(req.body.items)
    .then(rs => {
      if(!rs) {
        console.log('Not out of stock');
        Order.createAsync({
          user: req.user._id,
          shippingAddress: req.body.shippingAddress,
          items: req.body.items,
          total: req.body.total,
          type: req.body.type,
          nonce: req.body.nonce
        })
          .then(respondWithResult(res, 201))
          .catch(handleError(res));
      }
      else {
        console.log('Out of stock');
        res.status(422).json({
          message:'Out of stock'
        });
      }
    })
}

// Updates an existing Order in the DB
export function update(req, res) {
  // console.log(req.body);
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
