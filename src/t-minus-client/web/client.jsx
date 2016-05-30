import AppHandler from './components/Handlers/AppHandler';
import { Provider } from 'react-redux';
import { render as Render } from 'react-dom';
import store from '../shared/stores/store';

const appEl = document.getElementById('app');
Render(
  <Provider store={store}>
    <AppHandler/>
  </Provider>
  , appEl
);
