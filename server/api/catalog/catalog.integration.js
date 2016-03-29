'use strict';

var app = require('../..');
import request from 'supertest';

var newCatalog;

describe('Catalog API:', function() {

  describe('GET /api/catalogs', function() {
    var catalogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          catalogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(catalogs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/catalogs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/catalogs')
        .send({
          name: 'New Catalog',
          info: 'This is the brand new catalog!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCatalog = res.body;
          done();
        });
    });

    it('should respond with the newly created catalog', function() {
      expect(newCatalog.name).to.equal('New Catalog');
      expect(newCatalog.info).to.equal('This is the brand new catalog!!!');
    });

  });

  describe('GET /api/catalogs/:id', function() {
    var catalog;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalogs/' + newCatalog._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          catalog = res.body;
          done();
        });
    });

    afterEach(function() {
      catalog = {};
    });

    it('should respond with the requested catalog', function() {
      expect(catalog.name).to.equal('New Catalog');
      expect(catalog.info).to.equal('This is the brand new catalog!!!');
    });

  });

  describe('PUT /api/catalogs/:id', function() {
    var updatedCatalog;

    beforeEach(function(done) {
      request(app)
        .put('/api/catalogs/' + newCatalog._id)
        .send({
          name: 'Updated Catalog',
          info: 'This is the updated catalog!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCatalog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCatalog = {};
    });

    it('should respond with the updated catalog', function() {
      expect(updatedCatalog.name).to.equal('Updated Catalog');
      expect(updatedCatalog.info).to.equal('This is the updated catalog!!!');
    });

  });

  describe('DELETE /api/catalogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/catalogs/' + newCatalog._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when catalog does not exist', function(done) {
      request(app)
        .delete('/api/catalogs/' + newCatalog._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
