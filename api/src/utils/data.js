const moment = require('moment-timezone');
const R = require('ramda');
const { WEEK_KEY } = require('./enums');

/**
 * Group any list of objects by createdAt prop
 * @param {Array} Iterable with createdAt property
 * @returns {Object} objects grouped by signup date in YYYY_w format
 */
const groupByCreatedAt = R.groupBy(obj =>
  moment(obj['createdAt']).format(WEEK_KEY));

/**
 * Group any list of objects by customerId prop
 * @param {Array} Iterable with customerId property
 * @returns {Object} objects grouped by customerId
 */
const groupByCustomerId = R.groupBy(obj => obj.customerId);

/**
 * Get the number of unique items by customerId
 * @param {Array} Iterable with customerId property
 * @returns {number} Number of unique items by customerId
 */
const uniqueItemsByCustomerId = R.pipe(groupByCustomerId, R.keys, R.length);

module.exports = {
  groupByCreatedAt,
  groupByCustomerId,
  uniqueItemsByCustomerId,
};
