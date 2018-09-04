const Boom = require('boom');
const async = require('async');
const moment = require('moment-timezone');
const { Customer, Order } = require('../../models');

exports.index = async (request, h) => {
  try {
    const orders = await Order.findAll({
      attributes: [
        'createdAt',
        'orderNumber',
        'customerId',
        'firstOrder',
      ]
    });
    return {
      orders,
    }
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

// NOTE: Due to Postgres Performance issues, i.e. TimeOut we are not
// using Order.bulkCreate. Instead we're using the async library's
// queue to create multiple threads in which to save Order objects.
const bulkSave = orders => {
  return new Promise(async (resolve, reject) => {
    let createdOrders = [];
    let numOrdersSkipped = 0;

    const asyncQueue = async.queue(async order => {
      const customerExists = await Customer.count({
        where: {
          invitaeId: order.user_id,
        },
      });

      if (customerExists) {
        const newOrder = await Order.create({
          createdAt: moment(order.created).tz('America/Los_Angeles'),
          customerId: order.user_id,
          invitaeId: order.id,
          orderNumber: order.order_number,
        });
        createdOrders.push(newOrder);
      } else {
        numOrdersSkipped++;
      }
    }, 19);

    asyncQueue.drain = () => {
      resolve({ createdOrders, numOrdersSkipped });
    }

    asyncQueue.error = (err) => {
      console.error(err);
      reject(err);
    }

    asyncQueue.push(orders);
  });
}

exports.seedOrders = async (request, h) => {
  const startTime = Date.now();
  try {
    const { createdOrders: orders, numOrdersSkipped } = await bulkSave(request.payload);
    const endTime = Date.now();
    return {
      duration: `${(((endTime - startTime) % 60000) / 1000)} seconds`,
      orders,
      numOrdersSkipped,
    };
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}
