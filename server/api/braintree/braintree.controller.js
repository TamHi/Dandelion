/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/braintree              ->  index
 * POST    /api/braintree              ->  create
 * GET     /api/braintree/:id          ->  show
 * PUT     /api/braintree/:id          ->  update
 * DELETE  /api/braintree/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Braintree from './braintree.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleResponse(res) {
  return function(err, result) {
    if(err) {
      return handleError(res)(err);
    }
    respondWithResult(res)(result);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

exports.clientToken = function(req, res) {
  Braintree.clientToken.generate({}, function(err, data) {
    return handleResponse(res)(err, data.clientToken);
  });
}

exports.checkout = function(req, res) {
  console.log('controller');
  Braintree.transaction.sale({
    amount: req.body.total,
    paymentMethodNonce: req.body.nonce
  }, function cb(err, result) {
    if(err) {
      return handleError(res)(result);
    }
    if(result.success) {
      respondWithResult(res)(result);
    }
    else {
      handleError(res)(result.errors);
    }
  })
}