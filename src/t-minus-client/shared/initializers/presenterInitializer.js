import { handlePresenterMessage } from '../actions/PresenterActions';
import omit from 'lodash/omit';
import partial from 'lodash/partial';
import PresenterActions from '../actionTypes/PresenterActionTypes';

// Relays all state changes to the presenter window via postMessage
function relayStateChanges(appWindow, store) {
  const state = store.getState();
  if(state.meta.isPresenter || !state.meta.presenterWin) {
    return;
  }
  state.meta.presenterWin.postMessage(JSON.stringify({
    type: PresenterActions.PRESENTER_STATE_CHANGED,
    payload: omit(state, 'meta')
  }), appWindow.location.origin);
}

export default function postMessageInitializer(store, appWindow = window) {
  if(!store || !appWindow) {
    return;
  }
  appWindow.addEventListener('message', partial(handlePresenterMessage, appWindow, store));
  store.subscribe(partial(relayStateChanges, appWindow, store));
}
