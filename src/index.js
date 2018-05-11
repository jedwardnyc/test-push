import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import store from './store';

if(document.location.search.indexOf('token=') === 1){
  const token = document.location.search.slice(1).split('&')[0].split('=')[1]
  localStorage.setItem('user', token)
  window.location = '/'
}

render(
  <Provider store={store}>
    <Root />
  </Provider>, document.getElementById('root')
);
