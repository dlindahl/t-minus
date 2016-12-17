import ClientHandler from './components/Handlers/ClientHandler'
import * as initializers from '../shared/initializers'
import { runInitializers } from '../shared/util/initializerHelper'
import { Provider } from 'react-redux'
import { render as Render } from 'react-dom'
import store from '../shared/stores/store'

/* eslint-disable import/no-unassigned-import */
require('./stylesheets/Colors.scss')
/* eslint-enable import/no-unassigned-import:off */

const appEl = document.getElementById('app')
runInitializers(initializers, store)
Render(
  <Provider store={store}>
    <ClientHandler/>
  </Provider>
  , appEl
)
