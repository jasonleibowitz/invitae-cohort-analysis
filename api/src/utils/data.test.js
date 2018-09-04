const moment = require('moment-timezone');
const { groupByCreatedAt } = require('./data');
const { customers } = require('../fixtures/customer');

describe('groupByCreatedAt', () => {
  test('returns the derta', () => {
    const result = groupByCreatedAt(customers);
    const expectedOutput = {
      '2015_27': [{
        "invitaeId": 35410,
        "createdAt": moment("2015-07-03 22:01:11").toDate()
      }, {
        "invitaeId": 35417,
        "createdAt": moment("2015-07-03 22:11:23").toDate()
      }, {
        "invitaeId": 35412,
        "createdAt": moment("2015-07-03 22:02:52").toDate()
      }],
      '2015_28': [{
        "invitaeId": 35413,
        "createdAt": moment("2015-07-07 22:05:02").toDate()
      }],
      '2015_30': [{
        "invitaeId": 35424,
        "createdAt": moment("2015-07-20 22:21:55").toDate()
      }, {
        "invitaeId": 35559,
        "createdAt": moment("2015-07-21 17:18:13").toDate()
      }, {
        "invitaeId": 35415,
        "createdAt": moment("2015-07-24 22:10:33").toDate()
      }],
      '2015_31': [{
        "invitaeId": 35416,
        "createdAt": moment("2015-07-27 22:11:06").toDate()
      }],
    };
    expect(result).toEqual(expectedOutput);
  });
});