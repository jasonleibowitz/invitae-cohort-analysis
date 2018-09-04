const moment = require('moment-timezone');
const { createCohortAnalysisFromCustomerGroup, getAllCustomerOrdersFromCohort } = require('./customer');
const { customersWithOrders } = require('../fixtures/customer');

describe('createCohortAnalysisFromCustomerGroup', () => {
  test('it renders the properly formatted analyzed report', () => {
    const expectedOutput = [{
      "cohortKey": "2015_31",
      "dateRange": "7/26/2015 - 8/1/2015",
      "endDate": moment("2015-08-02T03:59:59.999Z").toDate(),
      "numCustomers": 1,
      "orders": [{
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_31"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_32"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_33"
      }, {
        "firstOrders": 0,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_34"
      }],
      "startDate": moment("2015-07-26T04:00:00.000Z").toDate()
    }, {
      "cohortKey": "2015_30",
      "dateRange": "7/19/2015 - 7/25/2015",
      "endDate": moment("2015-07-26T03:59:59.999Z").toDate(),
      "numCustomers": 3,
      "orders": [{
        "firstOrders": 1,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_30"
      }, {
        "firstOrders": 1,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_31"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_32"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_33"
      }, {
        "firstOrders": 0,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_34"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_35"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_36"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_37"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_38"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_39"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_40"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_41"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_42"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_43"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_44"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_45"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_46"
      }, {
        "firstOrders": 0,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_47"
      }],
      "startDate": moment("2015-07-19T04:00:00.000Z").toDate()
    }, {
      "cohortKey": "2015_28",
      "dateRange": "7/5/2015 - 7/11/2015",
      "endDate": moment("2015-07-12T03:59:59.999Z").toDate(),
      "numCustomers": 1,
      "orders": [{
        "firstOrders": 1,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_28"
      }, {
        "firstOrders": 0,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_29"
      }],
      "startDate": moment("2015-07-05T04:00:00.000Z").toDate()
    }, {
      "cohortKey": "2015_27",
      "dateRange": "6/28/2015 - 7/4/2015",
      "endDate": moment("2015-07-05T03:59:59.999Z").toDate(),
      "numCustomers": 3,
      "orders": [{
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_27"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_28"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_29"
      }, {
        "firstOrders": 2,
        "numOrders": 2,
        "uniqueOrderers": 2,
        "week": "2015_30"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_31"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_32"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_33"
      }, {
        "firstOrders": 1,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_34"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_35"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_36"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_37"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_38"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_39"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_40"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_41"
      }, {
        "firstOrders": 0,
        "numOrders": 0,
        "uniqueOrderers": 0,
        "week": "2015_42"
      }, {
        "firstOrders": 0,
        "numOrders": 1,
        "uniqueOrderers": 1,
        "week": "2015_43"
      }],
      "startDate": moment("2015-06-28T04:00:00.000Z").toDate()
    }];
    const result = createCohortAnalysisFromCustomerGroup(customersWithOrders);
    expect(result).toEqual(expectedOutput);
  })
});

// TODO: Sort by createdAt date?
describe('getAllCustomerOrdersFromCohort', () => {
  test('it returns a list of all orders from all customers in the provided cohort', () => {
    const expectedOutput = [{
        "customerId": 35410,
        "createdAt": moment('2015-10-19T20:47:09.000Z').toDate(),
        "firstOrder": false,
        "id": 12,
        "orderNumber": 2
      },
      {
        "customerId": 35410,
        "createdAt": moment('2015-07-19T04:01:08.000Z').toDate(),
        "firstOrder": true,
        "id": 1,
        "orderNumber": 5
      },
      {
        "customerId": 35417,
        "createdAt": moment('2015-07-23T08:08:44.000Z').toDate(),
        "firstOrder": true,
        "id": 9,
        "orderNumber": 4
      },
      {
        "customerId": 35412,
        "createdAt": moment('2015-08-19T04:28:27.000Z').toDate(),
        "firstOrder": true,
        "id": 4,
        "orderNumber": 1
      },
    ];

    const result = getAllCustomerOrdersFromCohort(customersWithOrders, '2015_27');
    expect(result).toEqual(expectedOutput);
  });
});
