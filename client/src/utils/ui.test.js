import { getHomepageLoadingText } from './ui';

describe('ui utils', () => {
  test('It returns the proper text if customer request is in progress', () => {
    const result = getHomepageLoadingText({
      isCustomerRequestInProgress: true,
      isOrderRequestInProgress: false,
      isCohortAnalysisRequestInProgress: false,
      isPurgeDBInProgress: false,
    })
    expect(result).toEqual('Fetching Customers');
  });

  test('It returns the proper text if order request is in progress', () => {
    const result = getHomepageLoadingText({
      isCustomerRequestInProgress: false,
      isOrderRequestInProgress: true,
      isCohortAnalysisRequestInProgress: false,
      isPurgeDBInProgress: false,
    })
    expect(result).toEqual('Fetching Orders');
  });

  test('It returns the proper text if cohort analysis request is in progress', () => {
    const result = getHomepageLoadingText({
      isCustomerRequestInProgress: false,
      isOrderRequestInProgress: false,
      isCohortAnalysisRequestInProgress: true,
      isPurgeDBInProgress: false,
    })
    expect(result).toEqual('Loading Cohort Analysis Data');
  });

  test('It returns the proper text if cohort analysis request is in progress', () => {
    const result = getHomepageLoadingText({
      isCustomerRequestInProgress: false,
      isOrderRequestInProgress: false,
      isCohortAnalysisRequestInProgress: false,
      isPurgeDBInProgress: true,
    })
    expect(result).toEqual('Clearing Database...');
  });

  test('It returns null if none of the passed in requests are in progress', () => {
    const result = getHomepageLoadingText({
      isCustomerRequestInProgress: false,
      isOrderRequestInProgress: false,
      isCohortAnalysisRequestInProgress: false,
      isPurgeDBInProgress: false,
    })
    expect(result).toEqual(null);
  });
});