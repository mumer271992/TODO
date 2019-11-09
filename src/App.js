import React from 'react';
import { Provider } from 'react-redux';

import Router from './router/Router';
import store from './store/configStore';

import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
