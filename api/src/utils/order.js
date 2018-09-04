const moment = require('moment-timezone');
const { groupByCreatedAt, uniqueItemsByCustomerId } = require('../utils/data');
const { WEEK_KEY } = require('../utils/enums');

/**
 * Convert groupedOrders to a list of cohortOrderObjects
 * @param {Object} groupedOrders
 * @returns {Array} list of cohortOrderObjects for which we have orders
 */
const convertOrdersToCohortOrderMap = groupedOrders => Object.keys(groupedOrders).map(orderGroup => {
  const numOrders = groupedOrders[orderGroup].length;
  const firstOrders = groupedOrders[orderGroup].filter(order => order.firstOrder).length;
  const uniqueOrderers = uniqueItemsByCustomerId(groupedOrders[orderGroup]);

  return {
    firstOrders,
    numOrders,
    uniqueOrderers,
    week: orderGroup,
  };
}).sort((a, b) => a.week.localeCompare(b.week));;

/**
 * Given a list of orders and a start date for a cohort, return a sorted list of
 * cohortOrdersObjects, including filling in empty weeks between cohortDate and last
 * order date
 * @param {Array} orders List of order objects
 * @param {Object} cohortDate Moment Object for start of cohort
 * @returns {Array} cohortOrdersByDate list of cohort order objects by date
 */
const getCohortOrdersByDate = (orders, cohortDate) => {
  // group orders by week key
  const groupedOrders = groupByCreatedAt(orders);
  // get cohortOrderObjects by week
  const cohortOrdersByWeek = convertOrdersToCohortOrderMap(groupedOrders);

  // fill in empty weeks
  const distanceBetweenStartAndEnd = moment(cohortOrdersByWeek[cohortOrdersByWeek.length - 1].week, WEEK_KEY).diff(cohortDate, "weeks");

  return  Array.apply(null, Array(distanceBetweenStartAndEnd + 1)).map((item, index) => {
    const currentWeek = cohortDate
      .clone()
      .add(index, "week")
      .format(WEEK_KEY);
    const weekExists = cohortOrdersByWeek.some(i => i.week === currentWeek);
    if (weekExists) {
      return cohortOrdersByWeek.find(i => i.week === currentWeek);
    } else {
      return {
        firstOrders: 0,
        numOrders: 0,
        uniqueOrderers: 0,
        week: currentWeek,
      }
    }
  });
};

module.exports = {
  convertOrdersToCohortOrderMap,
  getCohortOrdersByDate,
};
