/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import mongoose from 'mongoose'
import User from '../api/user/user.model';
import Product from '../api/product/product.model';
import Order from '../api/order/order.model';
import Cart from '../api/cart/cart.model';

Order.find({}).removeAsync()
  .then(() => {
    console.log('Finished remove orders');
  });

Cart.find({}).removeAsync()
  .then(() => {
    console.log('Finished remove carts');
  });

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
    .then((user) => {
      Cart.createAsync({
        _id: user[0]._id,
        items: [
          {
            product: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc2'),
            quantity: 2
          },
          {
            product: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc3'),
            quantity: 1
          }
        ]
      })
      .then((cart) => {
        // console.log(cart);
      })
    });
  });

Product.find({}).removeAsync()
  .then(function() {
    Product.createAsync({
      _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc2'),
      sku: 'MS001',
      name: 'Building E-Commerce Application with MEAN',
      imageUrl: '/assets/uploads/mean-ecom-book.jpg',
      price: 25,
      stock: 250,
      description: 'Build a powerful e-commerce application with MEAN in no time'
    }, {
      _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc3'),
      sku: 'MS002',
      name: 'MEAN Web Development',
      imageUrl: '/assets/uploads/meanbook.jpg',
      price: 20,
      stock: 100,
      description: 'Getting start with the awesome MEAN stack'
    }, {
      _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc4'),
      sku: 'MS003',
      name: 'Mastering Web Application Development with Angular',
      imageUrl: '/assets/uploads/angularbook.jpg',
      price: 10,
      stock: 50,
      description: 'Angular 101'
    }, {
      _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc5'),
      sku: 'MS004',
      name: 'Node Web Development',
      imageUrl: '/assets/uploads/nodebook.png',
      price: 15,
      stock: 50,
      description: 'Nodejs 101'
    }, {
      _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36fc6'),
      sku: 'MS005',
      name: 'MongoDB the definite guide',
      imageUrl: '/assets/uploads/mongobook.jpg',
      price: 17,
      stock: 70,
      description: 'MongoDB 101'
    })
    .then(function() {
      console.log('Finished populating products');
    });
  });