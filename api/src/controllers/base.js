const Boom = require('boom');
const { Customer, Order } = require('../../models');

exports.purge = async (request, h) => {
  try {
    await Promise.all([
      Customer.destroy({
        where: {},
      }),
      Order.destroy({
        where: {},
      }),
    ]);

    return {
      message: 'Success',
    }
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}