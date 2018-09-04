import axios from 'axios';
import {
  FETCH_COHORT_ANALYSIS_ERROR,
  FETCH_COHORT_ANALYSIS_SUCCESS,
  REQUEST_FETCH_COHORT_ANALYSIS,
} from './types';

export const fetchCohortAnalysis = () => async dispatch => {
  dispatch({
    type: REQUEST_FETCH_COHORT_ANALYSIS,
  });

  try {
    const response = await axios.get('http://localhost:3000/customers/analyze');

    dispatch({
      type: FETCH_COHORT_ANALYSIS_SUCCESS,
      payload: response.data.analysis,
    })
  } catch (err) {
    console.error(err);
    dispatch({
      type: FETCH_COHORT_ANALYSIS_ERROR,
      error: err,
    });
  }
}