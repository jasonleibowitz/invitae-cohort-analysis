import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './views/Home';
import globalStyles from './styles/global';
import registerServiceWorker from './registerServiceWorker';

const render = () => {
  // eslint-disable-next-line no-unused-expressions
  globalStyles;

  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.getElementById('root')
  );
  registerServiceWorker();
}

render();
