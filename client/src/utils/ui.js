/**
 * Util method to help determine what copy to display in the Homepage Loader
 * @param {bool} options.isCustomerRequestInProgress
 * @param {bool} options.isOrderRequestInProgress
 * @param {bool} options.isCohortAnalysisRequestInProgress
 * @returns {string} Loading Text
 */
export const getHomepageLoadingText = ({
  isCustomerRequestInProgress = false,
  isOrderRequestInProgress = false,
  isCohortAnalysisRequestInProgress = false,
  isPurgeDBInProgress = false,
} = {}) => {
  if (isCustomerRequestInProgress) {
    return 'Fetching Customers';
  } else if (isOrderRequestInProgress) {
    return 'Fetching Orders';
  } else if (isCohortAnalysisRequestInProgress) {
    return 'Loading Cohort Analysis Data';
  } else if (isPurgeDBInProgress) {
    return 'Clearing Database...'
  } else {
    return null;
  }
};