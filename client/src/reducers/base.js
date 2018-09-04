import { fromJS, List } from 'immutable';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { get } from '../utils/immutable';
import { API_RESPONSE_STATES } from '../services/enums';

// TYPES
import {
  PURGE_DATABASE_SUCCESS,
  REQUEST_PURGE_DATABASE,
  PURGE_DATABASE_ERROR,
} from '../actions/types';

const INITIAL_STATE = fromJS({
  data: new List(),
  error: null,
  state: null,
});

// SELECTORS

/**
 * Return base state
 * @param {Object} redux state
 * @returns {Object} redux base state
 */
export const getBaseState = get('base');

/**
 * Return API Status for base state
 * @param {Object} redux state
 * @returns {enum} API Status
 */
export const getBaseAPIState = createSelector(getBaseState, get('state'));

/**
 * Did the Purge DB request finish successfully?
 * @param {Object} redux state
 * @returns {boolean} purge finished successfully
 */
export const didPurgeDBSucceed = createSelector(getBaseAPIState, R.equals(API_RESPONSE_STATES.SUCCESS));

/**
 * Is the Purge DB request in progress?
 * @param {Object} redux state
 * @returns {boolean} is the purge request still in progress
 */
export const isPurgeDBInProgress = createSelector(getBaseAPIState, R.equals(API_RESPONSE_STATES.PENDING));

// REDUCER
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_PURGE_DATABASE: {
      return state.merge({
        error: null,
        state: API_RESPONSE_STATES.PENDING,
      });
    }

    case PURGE_DATABASE_ERROR: {
      return state.merge({
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      });
    }

    case PURGE_DATABASE_SUCCESS: {
      return state.merge({
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      });
    }

    default:
      return state;
  }
}