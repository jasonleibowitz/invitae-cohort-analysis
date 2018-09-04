'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    invitaeId: DataTypes.STRING
  });

  Customer.associate = models => {
    Customer.hasMany(models.Order, {
      as: 'Orders',
      foreignKey: 'customerId',
      sourceKey: 'invitaeId',
    });
  }

  return Customer;
};