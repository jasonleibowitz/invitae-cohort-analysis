import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { get } from '../utils/immutable';
import { API_RESPONSE_STATES } from '../services/enums';

// ACTIONS
import {
  FETCH_COHORT_ANALYSIS_ERROR,
  FETCH_COHORT_ANALYSIS_SUCCESS,
  PURGE_DATABASE_SUCCESS,
  REQUEST_FETCH_COHORT_ANALYSIS,
} from '../actions/types';

const INITIAL_STATE = fromJS({
  data: null,
  error: null,
  state: null,
});

// SELECTORS

/**
 * Returns Cohort Analysis State
 * @param {Object} redux state
 * @returns {Object} redux cohortAnalysis state
 */
export const getCohortAnalysisState = get('cohortAnalysis');

/**
 * Returns API Status for cohort analysis state
 * @param {Object} redux state
 * @returns {enum} API Status
 */
export const getCohortAnalysisAPIState = createSelector(getCohortAnalysisState, get('state'));

/**
 * Did the cohort analysis request finish successfully?
 * @param {Object} redux state
 * @returns {boolean} customer request finished successfully
 */
export const didCohortAnalysisRequestSucceed = createSelector(getCohortAnalysisAPIState, R.equals(API_RESPONSE_STATES.SUCCESS));

/**
 * Is the cohort analysis request currently in progress?
 * @param {Object} redux state
 * @returns {boolean} customer request is in progress
 */
export const isCohortAnalysisRequestInProgress = createSelector(getCohortAnalysisAPIState, R.equals(API_RESPONSE_STATES.PENDING));


/**
 * Returns cohort analysis
 * @param {Object} redux state
 * @returns {Array} cohortAnalysis
 */
export const getCohortAnalysis = createSelector(getCohortAnalysisState, get('data'));

// REDUCER
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COHORT_ANALYSIS_ERROR: {
      return state.merge({
        data: null,
        error: action.error,
        state: API_RESPONSE_STATES.ERROR,
      });
    }

    case FETCH_COHORT_ANALYSIS_SUCCESS: {
      return state.merge({
        data: action.payload,
        error: null,
        state: API_RESPONSE_STATES.SUCCESS,
      })
    }

    case REQUEST_FETCH_COHORT_ANALYSIS: {
      return state.merge({
        data: null,
        error: null,
        state: API_RESPONSE_STATES.PENDING,
      })
    }

    case PURGE_DATABASE_SUCCESS: {
      return state.merge(INITIAL_STATE);
    }

    default:
      return state;
  }
}