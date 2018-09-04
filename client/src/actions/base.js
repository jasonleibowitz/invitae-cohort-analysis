import axios from 'axios';
import {
  PURGE_DATABASE_ERROR,
  PURGE_DATABASE_SUCCESS,
  REQUEST_PURGE_DATABASE,
} from './types';

export const purgeDatabase = () => async dispatch => {
  dispatch({
    type: REQUEST_PURGE_DATABASE,
  });

  try {
    await axios.delete('http://localhost:3000/purge');

    dispatch({
      type: PURGE_DATABASE_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: PURGE_DATABASE_ERROR,
      error: err,
    });
  }
}
