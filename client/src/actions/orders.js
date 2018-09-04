import axios from 'axios';
import {
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_SUCCESS,
  REQUEST_FETCH_ORDERS,
  REQUEST_SEED_ORDERS,
  SEED_ORDERS_ERROR,
  SEED_ORDERS_SUCCESS,
} from './types';

export const fetchOrders = () => async dispatch => {
  dispatch({
    type: REQUEST_FETCH_ORDERS,
  });

  try {
    const response = await axios.get('http://localhost:3000/orders');

    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: response.data.orders,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: FETCH_ORDERS_ERROR,
      error: err,
    });
  }
}

export const seedOrders = ordersJSON => async dispatch => {
  dispatch({ type: REQUEST_SEED_ORDERS });

  try {
    const response = await axios.post('http://localhost:3000/orders/seed', ordersJSON);

    dispatch({
      type: SEED_ORDERS_SUCCESS,
      payload: {
        orders: response.data.orders,
        numOrdersSkipped: response.data.numOrdersSkipped,
      }
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: SEED_ORDERS_ERROR,
      error: err,
    });
  }
}