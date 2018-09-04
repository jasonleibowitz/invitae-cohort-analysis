const moment = require('moment');

const orders = [{
  createdAt: moment('2015-10-19T20:47:09.000Z').toDate(),
  customerId: 35410,
  firstOrder: false,
  id: 12,
  orderNumber: 2,
}, {
  createdAt: moment('2015-07-19T04:01:08.000Z').toDate(),
  customerId: 35410,
  firstOrder: true,
  id: 1,
  orderNumber: 5,
}, {
  createdAt: moment('2015-07-23T08:08:44.000Z').toDate(),
  customerId: 35417,
  firstOrder: true,
  id: 9,
  orderNumber: 4,
}, {
  id: 4,
  orderNumber: 1,
  createdAt: moment('2015-08-19T04:28:27.000Z').toDate(),
  customerId: 35412,
  firstOrder: true,
}];

const groupedOrders = {
  '2015_43': [{
    createdAt: moment('2015-10-19T20:47:09.000Z').toDate(),
    customerId: 35410,
    firstOrder: false,
    id: 12,
    orderNumber: 2
  }],
  '2015_30': [{
      createdAt: moment('2015-07-19T04:01:08.000Z').toDate(),
      customerId: 35410,
      firstOrder: true,
      id: 1,
      orderNumber: 5
    },
    {
      createdAt: moment('2015-07-23T08:08:44.000Z').toDate(),
      customerId: 35417,
      firstOrder: true,
      id: 9,
      orderNumber: 4
    }
  ],
  '2015_34': [{
    id: 4,
    orderNumber: 1,
    createdAt: moment('2015-08-19T04:28:27.000Z').toDate(),
    customerId: 35412,
    firstOrder: true
  }]
};

const groupedOrdersByDate = [{
    week: '2015_30',
    numOrders: 2,
    firstOrders: 2,
    uniqueOrderers: 2,
  },
  {
    week: '2015_34',
    numOrders: 1,
    firstOrders: 1,
    uniqueOrderers: 1,
  },
  {
    week: '2015_43',
    numOrders: 1,
    firstOrders: 0,
    uniqueOrderers: 1,
  }
];

const groupedOrdersByDateWithFillers = [{
    week: '2015_30',
    numOrders: 2,
    firstOrders: 2,
    uniqueOrderers: 2,
  },
  {
    week: '2015_31',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_32',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_33',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_34',
    numOrders: 1,
    firstOrders: 1,
    uniqueOrderers: 1,
  },
  {
    week: '2015_35',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_36',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_37',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_38',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_39',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_40',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_41',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_42',
    numOrders: 0,
    firstOrders: 0,
    uniqueOrderers: 0,
  },
  {
    week: '2015_43',
    numOrders: 1,
    firstOrders: 0,
    uniqueOrderers: 1,
  }
];

module.exports = {
  orders,
  groupedOrders,
  groupedOrdersByDate,
  groupedOrdersByDateWithFillers,
};