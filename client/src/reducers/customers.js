import { fromJS, List } from 'immutable';
import { createSelector } from 'reselect';
import { get } from '../utils/immutable';
import * as R from 'ramda';
import { API_RESPONSE_STATES } from '../services/enums';

// TYPES
import {
  FETCH_CUSTOMERS_ERROR,
  FETCH_CUSTOMERS_SUCCESS,
  PURGE_DATABASE_SUCCESS,
  REQUEST_FETCH_CUSTOMERS,
  REQUEST_SEED_CUSTOMERS,
  SEED_CUSTOMERS_ERROR,
  SEED_CUSTOMERS_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = fromJS({
  data: new List(),
  error: null,
  state: null,
});

// SELECTORS

/**
 * Returns customer state
 * @param {Object} redux state
 * @returns {Object} redux customer state
 */
export const getCustomerState = get('customers');

/**
 * Returns API Status for customer state
 * @param {Object} redux state
 * @returns {enum} API Status
 */
export const getCustomerAPIState = createSelector(getCustomerState, get('state'));

/**
 * Did the Customer request finish successfully?
 * @param {Object} redux state
 * @returns {boolean} customer request finished successfully
 */
export const didCustomerRequestSucceeded = createSelector(getCustomerAPIState, R.equals(API_RESPONSE_STATES.SUCCESS));

/**
 * Is the customer request currently in progress?
 * @param {Object} redux state
 * @returns {boolean} customer request is in progress
 */
export const isCustomerRequestInProgress = createSelector(getCustomerAPIState, R.equals(API_RESPONSE_STATES.PENDING));

/**
 * Returns list of customers
 * @param {Object} redux state
 * @returns {Array} customers
 */
export const getCustomers = createSelector(getCustomerState, get('data'));

/**
 * Returns number of customers in database
 * @param {Object} redux state
 * @returns {number} number of customers
 */
export const getNumCustomers = createSelector(getCustomers, R.prop('size'));

// REDUCER
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS_ERROR: {
      return state.merge({
        data: null,
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      })
    }

    case FETCH_CUSTOMERS_SUCCESS: {
      return state.merge({
        data: action.payload,
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      })
    }

    case REQUEST_FETCH_CUSTOMERS: {
      return state.merge({
        data: null,
        error: null,
        state: API_RESPONSE_STATES.PENDING,
      })
    }

    case REQUEST_SEED_CUSTOMERS: {
      return state.merge({
        data: null,
        error: null,
        state: API_RESPONSE_STATES.PENDING,
      })
    }

    case SEED_CUSTOMERS_ERROR: {
      return state.merge({
        data: null,
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      })
    }

    case SEED_CUSTOMERS_SUCCESS: {
      return state.merge({
        data: action.payload,
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      })
    }

    case PURGE_DATABASE_SUCCESS: {
      return state.merge(INITIAL_STATE);
    }

    default:
      return state;
  }
}