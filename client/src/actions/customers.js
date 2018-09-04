import axios from 'axios';
import {
  FETCH_CUSTOMERS_ERROR,
  FETCH_CUSTOMERS_SUCCESS,
  REQUEST_FETCH_CUSTOMERS,
  REQUEST_SEED_CUSTOMERS,
  SEED_CUSTOMERS_ERROR,
  SEED_CUSTOMERS_SUCCESS,
} from './types';

export const fetchCustomers = () => async dispatch => {
  dispatch({
    type: REQUEST_FETCH_CUSTOMERS,
  });

  try {
    const response = await axios.get('http://localhost:3000/customers');
    dispatch({
      type: FETCH_CUSTOMERS_SUCCESS,
      payload: response.data.customers,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: FETCH_CUSTOMERS_ERROR,
      error: err,
    });
  }
}

export const seedCustomers = customersJSON => async dispatch => {
  dispatch({ type: REQUEST_SEED_CUSTOMERS });

  try {
    const response = await axios.post('http://localhost:3000/customers/seed', customersJSON);
    dispatch({
      type: SEED_CUSTOMERS_SUCCESS,
      payload: response.data.customers,
    })
  } catch (err) {
    console.error(err);
    dispatch({
      type: SEED_CUSTOMERS_ERROR,
      error: err,
    })
  }
}