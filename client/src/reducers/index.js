import { combineReducers } from 'redux-immutable';

import cohortAnalysis from './cohortAnalysis';
import customers from './customers';
import orders from './orders';

export default combineReducers({
  cohortAnalysis,
  customers,
  orders,
});