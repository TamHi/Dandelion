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
    non,
    tuixach,
    matkinh,
    daynich;

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
      return phukien.addChild({name: 'Nón', slug: 'non'});
    })
    .then(function (category) {
      non = category._id;
      return phukien.addChild({name: 'Túi xách', slug: 'tui-xach'});
    })
    .then(function (category) {
      tuixach = category._id;
      return phukien.addChild({name: 'Mắt kính', slug: 'mat-kinh'});
    })
    .then(function (category) {
      matkinh = category._id;
      return phukien.addChild({name: 'Dây nịch', slug: 'day-nich'});
    })
    .then(function (category) {
      daynich = category._id;
    })
    .then(function() {
      return Product.find({}).removeAsync()
      .then(function() {
        Product.createAsync({
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f01'),
          sku: 'MS001',
          name: 'Áo thun 1',
          slug: 'ao-thun-1',
          imageUrl: '/assets/uploads/aothun-1.jpg',
          price: 150000,
          stock: 10,
          categories: [aothun]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f02'),
          sku: 'MS002',
          name: 'Áo thun 2',
          slug: 'ao-thun-2',
          imageUrl: '/assets/uploads/aothun-2.jpg',
          price: 150000,
          stock: 20,
          categories: [aothun]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f03'),
          sku: 'MS003',
          name: 'Áo sơ mi 1',
          slug: 'ao-somi-1',
          imageUrl: '/assets/uploads/aosomi-1.jpg',
          price: 200000,
          stock: 10,
          categories: [somi]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f04'),
          sku: 'MS004',
          name: 'Áo sơ mi 2',
          slug: 'ao-somi-2',
          imageUrl: '/assets/uploads/aosomi-2.jpg',
          price: 200000,
          stock: 20,
          categories: [somi]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f05'),
          sku: 'MS005',
          name: 'Áo ba lỗ 1',
          slug: 'ao-balo-1',
          imageUrl: [
            '/assets/uploads/aobalo-1.1.jpg',
            '/assets/uploads/aobalo-1.2.jpg',
            '/assets/uploads/aobalo-1.3.jpg',
            '/assets/uploads/aobalo-1.4.jpg',
            '/assets/uploads/aobalo-1.5.jpg',
            '/assets/uploads/aobalo-1.6.jpg',
            '/assets/uploads/aobalo-1.7.jpg'
          ],
          price: 100000,
          stock: 10,
          categories: [balo]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f06'),
          sku: 'MS006',
          name: 'Áo ba lỗ 2',
          slug: 'ao-balo-2',
          imageUrl: '/assets/uploads/aobalo-2.jpg',
          price: 100000,
          stock: 20,
          categories: [balo]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f07'),
          sku: 'MS007',
          name: 'Áo khoác 1',
          slug: 'ao-khoac-1',
          imageUrl: '/assets/uploads/aokhoac-1.jpg',
          price: 300000,
          stock: 10,
          categories: [khoac]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f08'),
          sku: 'MS008',
          name: 'Áo khoác 2',
          slug: 'ao-khoac-2',
          imageUrl: '/assets/uploads/aokhoac-2.jpg',
          price: 300000,
          stock: 20,
          categories: [khoac]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f09'),
          sku: 'MS009',
          name: 'Áo vest 1',
          slug: 'ao-vest-1',
          imageUrl: '/assets/uploads/aovest-1.jpg',
          price: 1000000,
          stock: 10,
          categories: [vest]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f10'),
          sku: 'MS010',
          name: 'Áo vest 2',
          slug: 'ao-vest-2',
          imageUrl: '/assets/uploads/aovest-2.jpg',
          price: 1000000,
          stock: 20,
          categories: [vest]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f11'),
          sku: 'MS011',
          name: 'Quần jean 1',
          slug: 'quan-jean-1',
          imageUrl: '/assets/uploads/quanjean-1.jpg',
          price: 400000,
          stock: 10,
          categories: [jean]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f12'),
          sku: 'MS012',
          name: 'Quần jean 2',
          slug: 'quan-jean-2',
          imageUrl: '/assets/uploads/quanjean-2.jpg',
          price: 400000,
          stock: 20,
          categories: [jean]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f13'),
          sku: 'MS013',
          name: 'Quần kaki  1',
          slug: 'quan-kaki-1',
          imageUrl: '/assets/uploads/quankaki-1.jpg',
          price: 200000,
          stock: 10,
          categories: [kaki]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f14'),
          sku: 'MS014',
          name: 'Quần kaki 2',
          slug: 'quan-kaki-2',
          imageUrl: '/assets/uploads/quankaki-2.jpg',
          price: 200000,
          stock: 20,
          categories: [kaki]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f15'),
          sku: 'MS015',
          name: 'Quần tây 1',
          slug: 'quan-tay-1',
          imageUrl: '/assets/uploads/quantay-1.jpg',
          price: 250000,
          stock: 10,
          categories: [tay]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f16'),
          sku: 'MS016',
          name: 'Quần tây 2',
          slug: 'quan-tay-2',
          imageUrl: '/assets/uploads/quantay-2.jpg',
          price: 250000,
          stock: 20,
          categories: [tay]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f17'),
          sku: 'MS017',
          name: 'Quần short 1',
          slug: 'quan-short-1',
          imageUrl: '/assets/uploads/quanshort-1.jpg',
          price: 150000,
          stock: 10,
          categories: [short]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f18'),
          sku: 'MS018',
          name: 'Quần short 2',
          slug: 'quan-short-2',
          imageUrl: '/assets/uploads/quanshort-2.jpg',
          price: 150000,
          stock: 20,
          categories: [short]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f19'),
          sku: 'MS019',
          name: 'Quần thun 1',
          slug: 'quan-thun-1',
          imageUrl: '/assets/uploads/quanthun-1.jpg',
          price: 70000,
          stock: 10,
          categories: [quanthun]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f20'),
          sku: 'MS020',
          name: 'Quần thun 2',
          slug: 'quan-thun-2',
          imageUrl: '/assets/uploads/quanthun-2.jpg',
          price: 70000,
          stock: 20,
          categories: [quanthun]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f21'),
          sku: 'MS021',
          name: 'Giày 1',
          slug: 'giay-1',
          imageUrl: '/assets/uploads/giay-1.jpg',
          price: 250000,
          stock: 10,
          categories: [giay]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f22'),
          sku: 'MS022',
          name: 'Giày 2',
          slug: 'giay-2',
          imageUrl: '/assets/uploads/giay-2.jpg',
          price: 250000,
          stock: 20,
          categories: [giay]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f23'),
          sku: 'MS023',
          name: 'Nón 1',
          slug: 'non-1',
          imageUrl: '/assets/uploads/non-1.jpg',
          price: 150000,
          stock: 10,
          categories: [non]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f24'),
          sku: 'MS024',
          name: 'Nón 2',
          slug: 'non-2',
          imageUrl: '/assets/uploads/non-2.jpg',
          price: 250000,
          stock: 20,
          categories: [non]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f25'),
          sku: 'MS025',
          name: 'Túi xác 1',
          slug: 'tui-xach-1',
          imageUrl: '/assets/uploads/tuixach-1.jpg',
          price: 350000,
          stock: 10,
          categories: [tuixach]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f26'),
          sku: 'MS026',
          name: 'Túi xách 2',
          slug: 'tui-xach-2',
          imageUrl: '/assets/uploads/tuixach-2.jpg',
          price: 350000,
          stock: 20,
          categories: [tuixach]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f27'),
          sku: 'MS027',
          name: 'Mắt kính 1',
          slug: 'Mat-kinh-1',
          imageUrl: '/assets/uploads/matkinh-1.jpg',
          price: 200000,
          stock: 10,
          categories: [matkinh]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f28'),
          sku: 'MS028',
          name: 'Mắt kính 2',
          slug: 'mat-kinh-2',
          imageUrl: '/assets/uploads/matkinh-2.jpg',
          price: 300000,
          stock: 20,
          categories: [matkinh]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f29'),
          sku: 'MS029',
          name: 'Dây nịch 1',
          slug: 'day-nich-1',
          imageUrl: '/assets/uploads/daynich-1.jpg',
          price: 200000,
          stock: 10,
          categories: [daynich]
        }, {
          _id: mongoose.Types.ObjectId('56f3e1fd37e1945010c36f30'),
          sku: 'MS030',
          name: 'Dây nịch 2',
          slug: 'day-nich-2',
          imageUrl: '/assets/uploads/daynich-2.jpg',
          price: 350000,
          stock: 20,
          categories: [daynich]
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
      name: 'Bùi Lê Vũ Tâm',
      email: 'blvtam@example.com',
      password: 'vutam'
    }, {
      provider: 'local',
      name: 'Đào Kim Thư',
      email: 'dkthu@example.com',
      password: 'kimthu'
    }, {
      provider: 'local',
      name: 'Lê Cẩm Thoa',
      email: 'lcthoa@example.com',
      password: 'camthoa'
    }, {
      provider: 'local',
      name: 'Trần Chí Khang',
      email: 'tckhang@example.com',
      password: 'chikhang'
    }, {
      provider: 'local',
      name: 'Lê Minh Trí',
      email: 'lmtri@example.com',
      password: 'minhtri'
    }, {
      provider: 'local',
      name: 'Nguyễn Thành Đạt',
      email: 'ntdat@example.com',
      password: 'thanhdat'
    }, {
      provider: 'local',
      name: 'Bùi Hữu Sáng',
      email: 'bhsang@example.com',
      password: 'huusang'
    }, {
      provider: 'local',
      name: 'Huỳnh Tấn Sang',
      email: 'htsang@example.com',
      password: 'tansang'
    }, {
      provider: 'local',
      name: 'Lâm Tấn Lộc',
      email: 'ltloc@example.com',
      password: 'tanloc'
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
        city: {
          id: 26,
          title: 'Cần Thơ'
        },
        district: {
          id: 85,
          title: 'Quận Cái Răng'
        },
        ward: {
          id: 2225,
          title: 'Phường Lê Bình'
        },
        street: '1 QL1',
        default: false, 
      }, {
        uid: user[0]._id,
        name: 'Nguyễn Văn B',
        phone: '0909222222',
        city: {
          id: 26,
          title: 'Cần Thơ'
        },
        district: {
          id: 119,
          title: 'Quận Ninh Kiều'
        },
        ward: {
          id: 1682,
          title: 'Phường An Lạc'
        },
        street: '1 Nguyễn Thị Minh Khai',
        default: false, 
      }, {
        uid: user[0]._id,
        name: 'Nguyễn Văn C',
        phone: '0909333333',
        city: {
          id: 26,
          title: 'Cần Thơ'
        },
        district: {
          id: 85,
          title: 'Quận Cái Răng'
        },
        ward: {
          id: 2225,
          title: 'Phường Lê Bình'
        },
        street: '2 QL1',
        default: true, 
      }, {
        uid: user[1]._id,
        name: 'Nguyễn Văn D',
        phone: '0909444444',
        city: {
          id: 26,
          title: 'Cần Thơ'
        },
        district: {
          id: 119,
          title: 'Quận Ninh Kiều'
        },
        ward: {
          id: 1682,
          title: 'Phường An Lạc'
        },
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

    