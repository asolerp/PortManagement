import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import {ModalPortal} from 'react-native-modals';

import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthNavigator />
      <ModalPortal />
    </Provider>
  );
};

export default App;
