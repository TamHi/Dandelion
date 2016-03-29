/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/catalogs              ->  index
 * POST    /api/catalogs              ->  create
 * GET     /api/catalogs/:id          ->  show
 * PUT     /api/catalogs/:id          ->  update
 * DELETE  /api/catalogs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Catalog from './catalog.model';

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

// Gets a list of Catalogs
export function index(req, res) {
  Catalog.find()
    .populate('children')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Catalog from the DB
export function show(req, res) {
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Catalog in the DB
export function create(req, res) {
  Catalog.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Catalog in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Catalog from the DB
export function destroy(req, res) {
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
