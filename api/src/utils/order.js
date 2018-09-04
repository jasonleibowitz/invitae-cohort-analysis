const moment = require('moment-timezone');
const { groupByCreatedAt } = require('../utils/data');
const { WEEK_KEY } = require('../utils/enums');

const getCohortOrdersByDate = (orders, cohortDate) => {
  // group orders by week key
  const groupedOrders = groupByCreatedAt(orders);

  // get order info by week
  const test = Object.keys(groupedOrders)
    .map(orderGroup => {
      const numOrders = groupedOrders[orderGroup].length;
      const firstOrders = groupedOrders[orderGroup].filter(order => order.firstOrder).length;
      const subsequentOrders = numOrders - firstOrders;

      return {
        week: orderGroup,
        numOrders,
        firstOrders,
        subsequentOrders
      };
    }).sort((a, b) => a.week.localeCompare(b.week));

  // fill in empty weeks
  const distanceBetweenStartAndEnd = moment(test[test.length - 1].week, WEEK_KEY).diff(cohortDate, "weeks");

  return  Array.apply(null, Array(distanceBetweenStartAndEnd + 1)).map((item, index) => {
    const currentWeek = cohortDate
      .clone()
      .add(index, "week")
      .format("YYYY_w");
    const weekExists = test.some(i => i.week === currentWeek);
    if (weekExists) {
      return test.find(i => i.week === currentWeek);
    } else {
      return {
        week: currentWeek,
        numOrders: 0,
        firstOrders: 0,
        subsequentOrders: 0,
      }
    }
  });
};

module.exports = {
  getCohortOrdersByDate,
};
