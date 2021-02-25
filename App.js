import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';

import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthNavigator />
    </Provider>
  );
};

export default App;
