import Papa from 'papaparse';

/**
 * Returns data and maxWeeks for body of csv
 * @param {Array} inputData Cohort Analysis API Response
 * @returns {Array} response.data
 * @returns {number} response.maxWeeks number of weeks of data
 */
export const generateDataArray = inputData => {
  let maxWeeks = 0;
  const data = inputData.map(c => {
    const cohort = c.get('dateRange');
    const customers = c.get('numCustomers');

    if (c.get('orders').size > maxWeeks) {
      maxWeeks = c.get('orders').size;
    }

    const orders = c.get('orders').map(o => {
      const firstOrders = o.get('firstOrders');
      const subsequentOrders = o.get('subsequentOrders');
      return `${Math.floor((subsequentOrders / customers) * 100)}% orders (${subsequentOrders})\r${Math.floor((firstOrders / customers) * 100)}% 1st orders (${firstOrders})`;
    });

    return [cohort, customers, ...orders];
  }).toJS();

  return {
    data,
    maxWeeks
  };
}

/**
 * Returns date headers separated in 7 date increments starting from 0
 * @param {number} maxWeeks
 * @returns {Array} date headers
 */
export const generateDateHeaderFields = (maxWeeks = 1) =>
  [...Array(maxWeeks)].map((c, i) => `${i * 7} - ${(i * 7 ) + 6} days`);

/**
 * Given Immutable response from server's Cohort Analysis endpoint, format data to be converted
 * to CSV for download.
 * @param {Array} Cohort Analysis API Response
 * @returns {Array} formattedData.data body of csv. Each cohort is an item in the list
 * @returns {Array} formattedData.fields header fields for csv
 */
export const formatDataForCSV = inputData => {
  const { data, maxWeeks } = generateDataArray(inputData);

  return {
    fields: [
      'Cohort',
      'Customers',
      ...generateDateHeaderFields(maxWeeks)
    ],
    data,
  };
};

export const parseJSONAsCSV = data => {
  const base = Papa.unparse(formatDataForCSV(data), {
    header: true,
  });

  return `data:text/csv;charset=utf-8,${base}`;
};

/**
 * For a given csv string with headers, return proper JSON
 * @params {string} csvString
 * @returns {Array} list of items
 */
export const parseCSVAsJSON = csvString => {
  let result = [];
  Papa.parse(csvString, {
    header: true,
    step: ({ data: [ row ], errors }, parse) => {
      if (!errors.length) {
        result.push(row);
      }
    }
  });
  return result;
}
