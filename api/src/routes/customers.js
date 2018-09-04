const customerController = require('../controllers/customer');

exports.customerRoutes = [{
  method: 'GET',
  path: '/customers',
  options: {
    description: 'Fetch Customers',
    handler: customerController.index,
  }
}, {
  method: 'GET',
  path: '/customers/analyze',
  options: {
    description: 'Analyze Customer Cohort Purchasing Behavior',
    handler: customerController.analyze,
  }
}, {
  method: 'POST',
  path: '/customers/seed',
  options: {
    description: 'Seed Customers',
    cors: {
      origin: ['*'],
    },
    handler: customerController.seed,
    payload: {
      maxBytes: 10485760,
    }
  },
}];
