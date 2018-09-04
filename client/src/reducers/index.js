import { combineReducers } from 'redux-immutable';

import base from './base';
import cohortAnalysis from './cohortAnalysis';
import customers from './customers';
import orders from './orders';

export default combineReducers({
  base,
  cohortAnalysis,
  customers,
  orders,
});