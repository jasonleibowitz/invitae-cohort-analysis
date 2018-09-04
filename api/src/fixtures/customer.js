const moment = require('moment-timezone');

exports.customers = [
  {
    "invitaeId": 35410,
    "createdAt": moment("2015-07-03 22:01:11").toDate()
  }, {
    "invitaeId": 35417,
    "createdAt": moment("2015-07-03 22:11:23").toDate()
  }, {
    "invitaeId": 35412,
    "createdAt": moment("2015-07-03 22:02:52").toDate()
  }, {
    "invitaeId": 35413,
    "createdAt": moment("2015-07-07 22:05:02").toDate()
  }, {
    "invitaeId": 35424,
    "createdAt": moment("2015-07-20 22:21:55").toDate()
  }, {
    "invitaeId": 35559,
    "createdAt": moment("2015-07-21 17:18:13").toDate()
  }, {
    "invitaeId": 35415,
    "createdAt": moment("2015-07-24 22:10:33").toDate()
  }, {
    "invitaeId": 35416,
    "createdAt": moment("2015-07-27 22:11:06").toDate()
  }
];

exports.customersWithOrders = {
    '2015_27': [{
      "invitaeId": 35410,
      "createdAt": moment("2015-07-03 22:01:11").toDate(),
      "Orders": [{
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
      }],
    }, {
      "invitaeId": 35417,
      "createdAt": moment("2015-07-03 22:11:23").toDate(),
      "Orders": [{
        createdAt: moment('2015-07-23T08:08:44.000Z').toDate(),
        customerId: 35417,
        firstOrder: true,
        id: 9,
        orderNumber: 4,
      }],
    }, {
      "invitaeId": 35412,
      "createdAt": moment("2015-07-03 22:02:52").toDate(),
      "Orders": [{
        id: 4,
        orderNumber: 1,
        createdAt: moment('2015-08-19T04:28:27.000Z').toDate(),
        customerId: 35412,
        firstOrder: true,
      }],
    }],
    '2015_28': [{
      "invitaeId": 35413,
      "createdAt": moment("2015-07-07 22:05:02").toDate(),
      "Orders": [{
        id: 2,
        orderNumber: 1,
        createdAt: moment('2015-07-19T03:45:46.000Z').toDate(),
        firstOrder: false,
        customerId: 35413,
      }, {
        id: 7,
        orderNumber: 26,
        createdAt: moment('2015-07-10T22:27:58.000Z').toDate(),
        firstOrder: true,
        customerId: 35413
      }],
    }],
    '2015_30': [{
      "invitaeId": 35424,
      "createdAt": moment("2015-07-20 22:21:55").toDate(),
      "Orders": [{
        id: 6,
        orderNumber: 39,
        createdAt: moment('2015-07-22T06:34:06.000Z').toDate(),
        customerId: 35424,
        firstOrder: true,
      }],
    }, {
      "invitaeId": 35559,
      "createdAt": moment("2015-07-21 17:18:13").toDate(),
      "Orders": [{
        id: 5,
        orderNumber: 3,
        createdAt: moment('2015-08-19T05:19:14.000Z').toDate(),
        firstOrder: false,
        customerNumber: 35559,
      }, {
        orderNumber: 1,
        createdAt: moment('2015-11-19T23:39:09.000Z').toDate(),
        firstOrder: false,
        customerNumber: 35559,
      }, {
        id: 3,
        orderNumber: 1,
        createdAt: moment('2015-07-26T19:35:00.000Z').toDate(),
        firstOrder: true,
        customerNumber: 35559,
      }],
    }, {
      "invitaeId": 35415,
      "createdAt": moment("2015-07-24 22:10:33").toDate(),
      "Orders": [],
    }],
    '2015_31': [{
      "invitaeId": 35416,
      "createdAt": moment("2015-07-27 22:11:06").toDate(),
      "Orders": [{
        id: 11,
        orderNumber: 4,
        createdAt: moment('2015-07-23T21:25:13.000Z').toDate(),
        customerId: 35416,
        firstOrder: true,
      }, {
        id: 10,
        orderNumber: 3,
        createdAt: moment('2015-08-19T23:02:46.000Z').toDate(),
        customerId: 35416,
        firstOrder: false,
      }]
    }]
  }