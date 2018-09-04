const baseController = require('../controllers/base');

exports.baseRoutes = [{
  method: 'DELETE',
  path: '/purge',
  options: {
    description: 'Purge DB',
    handler: baseController.purge,
  }
}, {
  method: 'GET',
  path: '/',
  options: {
    description: 'Hello World',
    handler: async (request, h) => ({
      data: 'Hello World',
    }),
  },
}];