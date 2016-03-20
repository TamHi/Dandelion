/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('Finished populating users');
    });
  });

Product.find({}).removeAsync()
  .then(function() {
    Product.createAsync({
      title: 'Building E-Commerce Application with MEAN',
      imageUrl: '/assets/uploads/mean-ecom-book.jpg',
      price: 25,
      stock: 250,
      description: 'Build a powerful e-commerce application with MEAN in no time'
    }, {
      title: 'MEAN Web Development',
      imageUrl: '/assets/uploads/meanbook.jpg',
      price: 20,
      stock: 100,
      description: 'Getting start with the awesome MEAN stack'
    }, {
      title: 'Mastering Web Application Development with Angular',
      imageUrl: '/assets/uploads/angularbook.jpg',
      price: 10,
      stock: 50,
      description: 'Angular 101'
    }, {
      title: 'Node Web Development',
      imageUrl: '/assets/uploads/nodebook.png',
      price: 15,
      stock: 50,
      description: 'Nodejs 101'
    }, {
      title: 'MongoDB the definite guide',
      imageUrl: '/assets/uploads/mongobook.jpg',
      price: 17,
      stock: 70,
      description: 'MongoDB 101'
    })
    .then(function() {
      console.log('Finished populating products');
    });
  });