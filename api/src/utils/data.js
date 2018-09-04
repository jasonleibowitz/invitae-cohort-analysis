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

module.exports = {
  groupByCreatedAt,
};
