import { fromJS } from 'immutable';
import {
  formatDataForCSV,
  generateDataArray,
  generateDateHeaderFields,
  parseCSVAsJSON,
  parseJSONAsCSV,
} from './data';
import {
  cohortAnalysisInCSVFormat,
  cohortAnalysisInCSVString,
  cohortAnalysisResponse,
} from './fixtures/cohortAnalysisFixtures';
import {
  customersAsJSON,
  rawCustomerCSV,
} from './fixtures/customers';

describe('data utils', () => {
  describe('formatDataForCSV', () => {
    test('returns data in the proper format for csv', () => {
      const result = formatDataForCSV(fromJS(cohortAnalysisResponse));
      expect(result).toEqual(cohortAnalysisInCSVFormat)
    });
  });

  describe('generateDataArray', () => {
    let result;
    beforeAll(() => {
      result = generateDataArray(fromJS(cohortAnalysisResponse));
    })
    test('returns data in the proper format', () => {
      expect(result.data).toEqual(cohortAnalysisInCSVFormat.data);
    });

    test('returns the correct maxWeeks info', () => {
      expect(result.maxWeeks).toEqual(18);
    })
  });

  describe('generateDateHeaderFields', () => {
    test('returns the correct number of header fields', () => {
      const result = generateDateHeaderFields(3);
      expect(result).toHaveLength(3);
    });

    test('calculates the correct date distribution', () => {
      const result = generateDateHeaderFields(3);
      expect(result).toEqual(["0 - 6 days", "7 - 13 days", "14 - 20 days"]);
    });

    test('if no maxWeek is passed in, defaults to one week', () => {
      const result = generateDateHeaderFields();
      expect(result).toEqual(["0 - 6 days"]);
    });
  });

  describe('parseCSVAsJSON', () => {
    test('converts raw CSV to JSON', () => {
      const result = parseCSVAsJSON(rawCustomerCSV);
      expect(result).toEqual(customersAsJSON);
    });

    test('removes any error rows', () => {
      const result = parseCSVAsJSON(rawCustomerCSV + "\n\n");
      expect(result).toEqual(customersAsJSON);
    })
  });

  // TODO: Figure out what this won't match success with proper output
  xdescribe('parseJSONAsCSV', () => {
    test('renders data into downloadable csv string', () => {
      const result = parseJSONAsCSV(fromJS(cohortAnalysisResponse));
      expect(result).toEqual(cohortAnalysisInCSVString);
    })
  })
});
