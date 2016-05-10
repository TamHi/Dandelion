'use strict';

import _ from 'lodash';
import Product from '../product/product.model';
import User from '../user/user.model';
import Order from '../order/order.model';

exports.week = function(req, res) {
  // Find all complete order in the time range
  var today = new Date();
	console.log(today);
	var startday = new Date(today - 7*86400000);
	console.log(startday);

	var data = {};
	Order.count().then(count => {
		console.log('Order');
		console.log(count);
		data.order = count;

		User.count().then(count => {
			console.log('Customer');
			console.log(count);
			data.customer = count;

			Product.count().then(count => {
				console.log('Product');
				console.log(count);
				data.product = count;

				Order.aggregate({
					$group: {
						_id: null,
						total: { 
							$sum: {
								$cond: [
									// Condition
									{ $eq: ["$shippingStatus", true] },
									"$total",
									0
								]
							}
						}
					}
				}, function(err, result) {
					console.log(result);
					console.log(data);
					if(err) {
						res.status(500).send(err);
					}
					else {
						data.total = result.length ? result[0].total : 0;
						res.json(data);
					}
				})
			})
		})
	});
}

exports.month = function(req, res) {
  // res.send('month');
}

exports.year = function(req, res) {
  // res.send('year');
}

