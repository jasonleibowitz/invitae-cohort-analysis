import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import rootReducer from '../reducers';

const initialState = Immutable.Map();
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;