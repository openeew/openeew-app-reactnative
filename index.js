import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

/*-----app state(data) manager-----*/
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './app/reducers';

import App from './app/App';

const Grillo = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Grillo);
