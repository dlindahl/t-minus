import { handlePresenterMessage } from '../actions/PresenterActions'
import { omit, partial } from 'lodash'
import PresenterActions from '../actionTypes/PresenterActionTypes'

// Relays all state changes to the presenter window via postMessage
function relayStateChanges (appWindow, store) {
  const state = store.getState()
  if (state.meta.isPresenter || !state.meta.presenterWin) {
    return
  }
  state.meta.presenterWin.postMessage(JSON.stringify({
    payload: omit(state, 'meta'),
    type: PresenterActions.PRESENTER_STATE_CHANGED
  }), appWindow.location.origin)
}

export default function postMessageInitializer (store, appWindow = window) {
  if (!store || !appWindow) {
    return
  }
  appWindow.addEventListener('message', partial(handlePresenterMessage, appWindow, store))
  store.subscribe(partial(relayStateChanges, appWindow, store))
}
