const orderController = require('../controllers/order');

exports.orderRoutes = [{
  method: 'GET',
  path: '/orders',
  options: {
    description: 'Fetch Orders',
    handler: orderController.index,
  }
}, {
  method: 'POST',
  path: '/orders/seed',
  options: {
    description: 'Seed Orders',
    cors: {
      origin: ['*'],
    },
    handler: orderController.seedOrders,
    payload: {
      maxBytes: 10485760,
    }
  },
}];
