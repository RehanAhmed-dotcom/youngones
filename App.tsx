import React from 'react';

import Root from './src/Navigation/Root';
import {Provider} from 'react-redux';
import Mystore from './src/ReduxToolkit/MyStore';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
const App = () => {
  let persistor = persistStore(Mystore);
  return (
    <Provider store={Mystore}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
