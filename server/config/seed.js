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
import Catalog from '../api/catalog/catalog.model';
import Address from '../api/address/address.model';

var ao,
    aothun,
    somi,
    balo,
    khoac,
    vest;
var quan,
    jean,
    kaki,
    tay,
    short,
    quanthun;
var phukien,
    giay,
    dongho,
    tuixach;

Catalog
  .find({})
  .remove()
  .then(function () {
    return Catalog.create({ name: 'Áo', slug: 'ao-nam'});
  })
    .then(function (catalog) {
      ao = catalog;
      return ao.addChild({name: 'Áo thun', slug: 'ao-thun'});
    })
    .then(function (category) {
      aothun = category._id;
      return ao.addChild({name: 'Áo sơ mi', slug: 'ao-somi'});
    })
    .then(function (category) {
      somi = category._id;
      return ao.addChild({name: 'Áo ba lỗ', slug: 'ao-ba-lo'});
    })
    .then(function (category) {
      balo = category._id;
      return ao.addChild({name: 'Áo khoác', slug: 'ao-khoac'});
    })
    .then(function (category) {
      khoac = category._id;
      return ao.addChild({name: 'Áo vest', slug: 'ao-vest'});
    })
  .then(function (category) {
    vest = category._id;
    return Catalog.create({ name: 'Quần', slug: 'quan'});
  })
    .then(function (catalog) {
      quan = catalog;
      return quan.addChild({name: 'Quần jean', slug: 'quan-jean'});
    })
    .then(function (category) {
      jean = category._id;
      return quan.addChild({name: 'Quần kaki', slug: 'quan-kaki'});
    })
    .then(function (category) {
      kaki = category._id;
      return quan.addChild({name: 'Quần tây', slug: 'quan-tay'});
    })
    .then(function (category) {
      tay = category._id;
      return quan.addChild({name: 'Quần short', slug: 'quan-short'});
    })
    .then(function (category) {
      short = category._id;
      return quan.addChild({name: 'Quần lửng', slug: 'quan-thun'});
    })
  .then(function (category) {
    quanthun = category._id;
    return Catalog.create({ name: 'Phụ kiện', slug: 'phu-kien'});
  })
    .then(function (catalog) {
      phukien = catalog;
      return phukien.addChild({name: 'Giầy', slug: 'giay-dep'});
    })
    .then(function (category) {
      giay = category._id;
      return phukien.addChild({name: 'Đồng hồ', slug: 'dong-ho'});
    })
    .then(function (category) {
      dongho = category._id;
      return phukien.addChild({name: 'Túi xách', slug: 'tui-xach'});
    })
    .then(function (category) {
      tuixach = category._id;
    })
    .then(function() {
      return Product.find({}).removeAsync()
      .then(function() {
        Product.createAsync({
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f01'),
          sku: 'MS001',
          name: 'Áo thun xám',
          slug: 'ao-thun-xam',
          imageUrl: '/assets/uploads/aothun-1.jpg',
          price: 150000,
          stock: 10,
          categories: [aothun],
          description: 'Áo thun tay ngăn xám sọc xanh đen'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f02'),
          sku: 'MS002',
          name: 'Áo thun xanh',
          slug: 'ao-thun-xanh',
          imageUrl: '/assets/uploads/aothun-2.jpg',
          price: 150000,
          stock: 20,
          categories: [aothun],
          description: 'Áo thun tay ngăn xanh sọc ngang'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f03'),
          sku: 'MS003',
          name: 'Áo sơ mi trắng',
          slug: 'ao-somi-trang',
          imageUrl: '/assets/uploads/aosomi-1.jpg',
          price: 200000,
          stock: 10,
          categories: [somi],
          description: 'Áo sơ mi tay dài trắng'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f04'),
          sku: 'MS004',
          name: 'Áo sơ mi xanh',
          slug: 'ao-somi-xanh',
          imageUrl: '/assets/uploads/aosomi-2.jpg',
          price: 200000,
          stock: 20,
          categories: [somi],
          description: 'Áo sơ mi tay dài xanh'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f05'),
          sku: 'MS005',
          name: 'Áo ba lỗ xám',
          slug: 'ao-balo-xam',
          imageUrl: '/assets/uploads/aobalo-1.jpg',
          price: 100000,
          stock: 10,
          categories: [balo],
          description: 'Áo ba lỗ xám logo đen'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f06'),
          sku: 'MS006',
          name: 'Áo ba lỗ đen',
          slug: 'ao-balo-den',
          imageUrl: '/assets/uploads/aobalo-2.jpg',
          price: 100000,
          stock: 20,
          categories: [balo],
          description: 'Áo ba lỗ đen trơn'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f07'),
          sku: 'MS007',
          name: 'Áo khoác đen',
          slug: 'ao-khoac-den',
          imageUrl: '/assets/uploads/aokhoac-1.jpg',
          price: 300000,
          stock: 10,
          categories: [khoac],
          description: 'Áo khoác đen trơn'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f08'),
          sku: 'MS008',
          name: 'Áo khoác kem',
          slug: 'ao-khoac-kem',
          imageUrl: '/assets/uploads/aokhoac-2.jpg',
          price: 300000,
          stock: 20,
          categories: [khoac],
          description: 'Áo khoác kem trơn'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f09'),
          sku: 'MS009',
          name: 'Áo vest bạc',
          slug: 'ao-vest-bac',
          imageUrl: '/assets/uploads/aovest-1.jpg',
          price: 1000000,
          stock: 10,
          categories: [vest],
          description: 'Áo vest bạc lịch lãm'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f10'),
          sku: 'MS010',
          name: 'Áo vest xám',
          slug: 'ao-vest-xam',
          imageUrl: '/assets/uploads/aovest-2.jpg',
          price: 1000000,
          stock: 20,
          categories: [vest],
          description: 'Áo vest xám lịch lãm'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f11'),
          sku: 'MS011',
          name: 'Quần jean trắng',
          slug: 'quan-jean-trang',
          imageUrl: '/assets/uploads/quanjean-1.jpg',
          price: 400000,
          stock: 10,
          categories: [jean],
          description: 'Quần jean trắng cá tính'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f12'),
          sku: 'MS012',
          name: 'Quần jean đen',
          slug: 'quan-jean-den',
          imageUrl: '/assets/uploads/quanjean-2.jpg',
          price: 400000,
          stock: 20,
          categories: [jean],
          description: 'Quần jean đen cá tính'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f13'),
          sku: 'MS013',
          name: 'Quần kaki  nâu',
          slug: 'quan-kaki-nau',
          imageUrl: '/assets/uploads/quankaki-1.jpg',
          price: 200000,
          stock: 10,
          categories: [kaki],
          description: 'Quần kaki nâu mềm mại'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f14'),
          sku: 'MS014',
          name: 'Quần kaki xanh đen',
          slug: 'quan-kaki-xanh-den',
          imageUrl: '/assets/uploads/quankaki-2.jpg',
          price: 200000,
          stock: 20,
          categories: [kaki],
          description: 'Quần kaki xanh đen mềm mại'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f15'),
          sku: 'MS015',
          name: 'Quần tây đen',
          slug: 'quan-tay-den',
          imageUrl: '/assets/uploads/quantay-1.jpg',
          price: 250000,
          stock: 10,
          categories: [tay],
          description: 'Quần tây đen sang trọng'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f16'),
          sku: 'MS016',
          name: 'Quần tây xanh',
          slug: 'quan-tay-xanh',
          imageUrl: '/assets/uploads/quantay-2.jpg',
          price: 250000,
          stock: 20,
          categories: [tay],
          description: 'Quần tây xanh sang trọng'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f17'),
          sku: 'MS017',
          name: 'Quần short đen',
          slug: 'quan-short-den',
          imageUrl: '/assets/uploads/quanshort-1.jpg',
          price: 150000,
          stock: 10,
          categories: [short],
          description: 'Quần short đen dễ chịu'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f18'),
          sku: 'MS018',
          name: 'Quần short xám',
          slug: 'quan-short-xam',
          imageUrl: '/assets/uploads/quanshort-2.jpg',
          price: 150000,
          stock: 20,
          categories: [short],
          description: 'Quần short xám dễ chịu'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f19'),
          sku: 'MS019',
          name: 'Quần thun xám',
          slug: 'quan-thun-xam',
          imageUrl: '/assets/uploads/quanthun-1.jpg',
          price: 70000,
          stock: 10,
          categories: [quanthun],
          description: 'Quần thun xám thoải mái'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f20'),
          sku: 'MS020',
          name: 'Quần thun đen',
          slug: 'quan-thun-den',
          imageUrl: '/assets/uploads/quanthun-2.jpg',
          price: 70000,
          stock: 20,
          categories: [quanthun],
          description: 'Quần thun đen thoải mái'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f21'),
          sku: 'MS021',
          name: 'Giày xanh',
          slug: 'giay-xanh',
          imageUrl: '/assets/uploads/giay-1.jpg',
          price: 250000,
          stock: 10,
          categories: [giay],
          description: 'Giày xanh cá tính'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f22'),
          sku: 'MS022',
          name: 'Giày xám',
          slug: 'giay-xam',
          imageUrl: '/assets/uploads/giay-2.jpg',
          price: 250000,
          stock: 20,
          categories: [giay],
          description: 'Giày xám cá tính'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f23'),
          sku: 'MS023',
          name: 'Đồng hồ sọc pháp',
          slug: 'dong-ho-soc-phap',
          imageUrl: '/assets/uploads/dongho-1.jpg',
          price: 550000,
          stock: 10,
          categories: [dongho],
          description: 'Đồng hồ da sọc xanh trắng đỏ'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f24'),
          sku: 'MS024',
          name: 'Đồng hồ da',
          slug: 'dong-ho-da',
          imageUrl: '/assets/uploads/dongho-2.jpg',
          price: 550000,
          stock: 20,
          categories: [dongho],
          description: 'Đồng hồ da nâu'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f25'),
          sku: 'MS025',
          name: 'Túi xác nâu',
          slug: 'tui-xach-nau',
          imageUrl: '/assets/uploads/tuixach-1.jpg',
          price: 350000,
          stock: 10,
          categories: [tuixach],
          description: 'Túi xách nâu sành điệu'
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f26'),
          sku: 'MS026',
          name: 'Túi xách đen',
          slug: 'tui-xach-den',
          imageUrl: '/assets/uploads/tuixach-2.jpg',
          price: 350000,
          stock: 20,
          categories: [tuixach],
          description: 'Túi xách đen sành điệu'
        })
        .then(function() {
          console.log('Finished populating products');
        });
      });
    })
  .then(function () {
    console.log('Finished populating categories');
  });

Order.find({}).removeAsync()
  .then(() => {
    console.log('Finished remove orders');
  });

Address.find({}).removeAsync()
  .then(() => {
    console.log('Finished remove addresses');
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
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'test2'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then((user) => {
      Address.createAsync({
        uid: user[0]._id,
        name: 'Nguyễn Văn A',
        phone: '0909111111',
        city: 26,
        district: 85,
        ward: 2225,
        street: '1 QL1',
        default: false, 
      }, {
        uid: user[0]._id,
        name: 'Nguyễn Văn B',
        phone: '0909222222',
        city: 26,
        district: 119,
        ward: 1682,
        street: '1 Nguyễn Thị Minh Khai',
        default: false, 
      }, {
        uid: user[0]._id,
        name: 'Nguyễn Văn C',
        phone: '0909333333',
        city: 26,
        district: 85,
        ward: 2225,
        street: '2 QL1',
        default: true, 
      }, {
        uid: user[1]._id,
        name: 'Nguyễn Văn D',
        phone: '0909444444',
        city: 26,
        district: 119,
        ward: 1682,
        street: '2 Nguyễn Thị Minh Khai',
        default: true, 
      });

      Cart.updateAsync({_id: user[0]._id}, {
        items: [
          {
            product: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f01'),
            quantity: 2
          },
          {
            product: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f02'),
            quantity: 1
          }
        ]
      })
      .then((cart) => {
        console.log('Finished populating users');
      })
    });
  });

    