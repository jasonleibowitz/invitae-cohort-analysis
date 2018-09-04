// modules
const Boom = require('boom');
const moment = require('moment-timezone');
const R = require('ramda');

// models
const { Customer, Order } = require('../../models');

// utils
const { WEEK_KEY } = require('./enums');
const { getCohortOrdersByDate } = require('../utils/order.js');

/**
 * Fetches Customers with their associated orders from the DB
 * @returns {Array} list of customer objects
 */
const fetchCustomersWithOrders = async () => await Customer.findAll({
  attributes: [
    'createdAt',
    'invitaeId',
  ],
  include: [{
    model: Order,
    as: 'Orders',
    attributes: [
      'customerId',
      'createdAt',
      'firstOrder',
      'id',
      'orderNumber'
    ]
  }]
});

/**
 * For a list of customers with orders, update that customers first order to have firstOrder true
 * @param {Array} customers (with orders)
 */
const updateCustomersFirstOrder = customers => {
  customers.forEach(customer => {
    const sortedOrders = customer.Orders.sort((a, b) => a.createdAt - b.createdAt);
    sortedOrders.length && sortedOrders[0].update({
      firstOrder: true,
    });
  });
};

/**
 * Given customers grouped by signup date and a date return all orders placed
 * by that cohort
 * @param {Object} groupedCustomers Customers grouped by signup date
 * @param {string} cohortWeek Cohort week for which to return orders
 */
const getAllCustomerOrdersFromCohort = (groupedCustomers, cohortWeek) =>
  groupedCustomers[cohortWeek].reduce((result, customer) => result.concat(customer.Orders), []);

/**
 * Takes an object of customers grouped by signup date, i.e. a cohort, and performs analysis
 * on order behavior over time
 * @param {Object} groupedCustomers Customers grouped by sign up date
 * @returns {Array} Array of cohorts with analysis data
 */
const createCohortAnalysisFromCustomerGroup = groupedCustomers => {
  return Object.keys(groupedCustomers).map(cohort => {
    const cohortdate = moment(cohort, WEEK_KEY);
    const startDate = cohortdate.clone().startOf('week');
    const endDate = cohortdate.clone().endOf('week');
    const numCustomers = groupedCustomers[cohort].length;

    // Reduce all orders of customers in this cohort into a single list
    const allOrders = getAllCustomerOrdersFromCohort(groupedCustomers, cohort);

    // groups orders by createdAt date
    // for each order creates map with relevent data, numOrders, firstOrders, subsequentOrders
    // Based on cohort start date and last order date, fills in rest of list of orders with empty data
    const orders = getCohortOrdersByDate(allOrders, cohortdate);

    return {
      cohortKey: cohort,
      dateRange: `${startDate.format("M/D/YYYY")} - ${endDate.format("M/D/YYYY")}`,
      endDate: endDate.toDate(),
      numCustomers,
      startDate: startDate.toDate(),
      orders,
    };
  }).sort((a, b) => b.cohortKey.localeCompare(a.cohortKey));
}

module.exports = {
  createCohortAnalysisFromCustomerGroup,
  fetchCustomersWithOrders,
  getAllCustomerOrdersFromCohort,
  updateCustomersFirstOrder,
}