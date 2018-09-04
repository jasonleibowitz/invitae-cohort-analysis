'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    orderNumber: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    firstOrder: DataTypes.BOOLEAN,
  });

  Order.associate = models => {
    Order.belongsTo(models.Customer, {
      as: 'Customer',
      foreignKey: 'customerId',
    });
  }

  return Order;
};