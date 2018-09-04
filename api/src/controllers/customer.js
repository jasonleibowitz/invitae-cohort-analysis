const Boom = require('boom');
const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const { Customer } = require('../../models');
const {
  createCohortAnalysisFromCustomerGroup,
  fetchCustomersWithOrders,
  updateCustomersFirstOrder,
} = require('../utils/customer');
const { groupByCreatedAt } = require('../utils/data');

exports.index = async (request, h) => {
  try {
    const customers = await fetchCustomersWithOrders();
    return {
      customers,
    }
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

exports.analyze = async (request, h) => {
  try {
    const customers = await fetchCustomersWithOrders();
    await updateCustomersFirstOrder(customers);
    const groupedCustomers = groupByCreatedAt(customers);
    const analysis = createCohortAnalysisFromCustomerGroup(groupedCustomers);

    return {
      analysis,
    }
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

exports.seed = async (request, h) => {
  const startTime = Date.now();
  try {
    const customersToCreate = request.payload.map(customer => ({
      invitaeId: customer.id,
      createdAt: customer.created,
    }));

    const customers = await Customer.bulkCreate(customersToCreate);
    const endTime = Date.now();
    return {
      customers,
      duration: `${(((endTime - startTime) % 60000) / 1000)} seconds`,
    };
  } catch (err) {
    console.error(err);
    return Boom.badRequest(err);
  }
}

