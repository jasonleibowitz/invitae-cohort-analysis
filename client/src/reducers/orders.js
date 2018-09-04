import { fromJS, List } from 'immutable';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { get } from '../utils/immutable';
import { API_RESPONSE_STATES } from '../services/enums';

// TYPES
import {
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_SUCCESS,
  PURGE_DATABASE_SUCCESS,
  REQUEST_FETCH_ORDERS,
  REQUEST_SEED_ORDERS,
  SEED_ORDERS_ERROR,
  SEED_ORDERS_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = fromJS({
  data: new List(),
  numOrdersSkipped: 0,
  error: null,
  state: null,
});

// SELECTORS

/**
 * Returns order state
 * @param {Object} redux state
 * @returns {Object} redux order state
 */
export const getOrderState = get('orders');

/**
 * Returns API Status for order state
 * @param {Object} redux state
 * @returns {enum} API Status
 */
export const getOrderAPIState = createSelector(getOrderState, get('state'));

/**
 * Did the Order request finish successfully?
 * @param {Object} redux state
 * @returns {boolean} order request finished successfully
 */
export const didOrderRequestSucceeded = createSelector(getOrderAPIState, R.equals(API_RESPONSE_STATES.SUCCESS));

/**
 * Is the order request currently in progress?
 * @param {Object} redux state
 * @returns {boolean} order request is in progress
 */
export const isOrderRequestInProgress = createSelector(getOrderAPIState, R.equals(API_RESPONSE_STATES.PENDING));

/**
 * Returns list of orders
 * @param {Object} redux state
 * @returns {Array} orders
 */
export const getOrders = createSelector(getOrderState, get('data'));

/**
 * Returns number of orders in database
 * @param {Object} redux state
 * @returns {number} number of orders
 */
export const getNumOrders = createSelector(getOrders, R.prop('size'));

// REDUCER
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ORDERS_ERROR: {
      return state.merge({
        data: null,
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      })
    }

    case FETCH_ORDERS_SUCCESS: {
      return state.merge({
        data: action.payload,
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      })
    }

    case REQUEST_FETCH_ORDERS: {
      return state.merge({
        data: null,
        error: null,
        state: API_RESPONSE_STATES.PENDING,
      })
    }

    case REQUEST_SEED_ORDERS: {
      return state.merge({
        data: null,
        error: null,
        state: API_RESPONSE_STATES.PENDING
      })
    }

    case SEED_ORDERS_ERROR: {
      return state.merge({
        data: null,
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      })
    }

    case SEED_ORDERS_SUCCESS: {
      return state.merge({
        data: action.payload.orders,
        numOrdersSkipped: action.payload.numOrdersSkipped,
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      })
    }

    case PURGE_DATABASE_SUCCESS: {
      return state.merge(INITIAL_STATE);
    }

    default: {
      return state;
    }
  }
}