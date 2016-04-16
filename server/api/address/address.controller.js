/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addresses              ->  index
 * POST    /api/addresses              ->  create
 * GET     /api/addresses/:id          ->  show
 * PUT     /api/addresses/:id          ->  update
 * DELETE  /api/addresses/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Address from './address.model';
import request from 'request';

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
    var updated = _.merge(entity, updates);
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
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Cities
export function city(req, res) {
  var url = 'https://thongtindoanhnghiep.co/api/city';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.status(response.statusCode).send(body);
    }
  })
}

// Gets a list of districts
export function district(req, res) {
  var url = 'https://thongtindoanhnghiep.co/api/city/' + req.params.id + '/district';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.status(response.statusCode).send(body);
    }
  })
}

// Gets a list of districts
export function ward(req, res) {
  var url = 'https://thongtindoanhnghiep.co/api/district/' + req.params.id + '/ward';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      res.status(response.statusCode).send(body);
    }
  })
}

// Gets a list of Addresss
export function index(req, res) {
  Address.findAsync()
    // .populate('uid')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Addresss
export function userAddress(req, res) {
  // console.log(req.user._id);
  Address.findAsync({ uid: req.params.id })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Address from the DB
export function show(req, res) {
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Address in the DB
export function create(req, res) {
  Address.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Address in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Address from the DB
export function destroy(req, res) {
  Address.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
