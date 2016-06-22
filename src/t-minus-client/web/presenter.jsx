import PresenterHandler from './components/Handlers/PresenterHandler';
import * as initializers from '../shared/initializers';
import { runInitializers } from '../shared/util/initializerHelper';
import { Provider } from 'react-redux';
import { render as Render } from 'react-dom';
import store from '../shared/stores/store';

const appEl = document.getElementById('app');
runInitializers(initializers, store);
Render(
  <Provider store={store}>
    <PresenterHandler/>
  </Provider>
  , appEl
);
