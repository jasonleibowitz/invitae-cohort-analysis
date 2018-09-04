const {baseRoutes} = require('./base');
const {customerRoutes} = require('./customers');
const {orderRoutes} = require('./orders');

exports.configureRoutes = server => server.route([
  ...baseRoutes,
  ...customerRoutes,
  ...orderRoutes,
])