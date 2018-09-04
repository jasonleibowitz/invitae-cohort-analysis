const moment = require('moment');
const { WEEK_KEY } = require('../utils/enums');
const { convertOrdersToCohortOrderMap, getCohortOrdersByDate } = require('./order');
const {
  orders,
  groupedOrders,
  groupedOrdersByDate,
  groupedOrdersByDateWithFillers,
} = require('../fixtures/order');

describe('order utils', () => {
  describe('convertOrdersToCohortOrderMap', () => {
    let result;
    beforeAll(() => {
      result = convertOrdersToCohortOrderMap(groupedOrders);
    });

    test('converts list of orders to a list of cohortOrdersObjects', () => {
      expect(result).toEqual(groupedOrdersByDate);
    });
  });

  describe('getCohortOrdersByDate', () => {
    let result;
    beforeAll(() => {
      result = getCohortOrdersByDate(orders, moment('2015_30', WEEK_KEY));
    });
    test('groups a list of orders by createdAt', () => {
      expect(result).toEqual(groupedOrdersByDateWithFillers);
    });

    test('it fills in empty data for weeks with no orders', () => {
      expect(result).toHaveLength(groupedOrdersByDateWithFillers.length);
    })
  });
});
