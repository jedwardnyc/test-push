import React from 'react';
import { render } from 'react-dom';
<<<<<<< HEAD
import Root from './components/Root';
import { Provider } from 'react-redux';
import store from './store';

const root = document.getElementById('root');

render((
  <Provider store={store}>
    <Root />
  </Provider>
), root);


=======
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

render(
  <Provider store={store}>
    <App /> 
  </Provider>, document.getElementById('root')
);
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c
