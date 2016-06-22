import omit from 'lodash/omit';
import partial from 'lodash/'
import PresenterActions from '../actionTypes/PresenterActionTypes';

function parseEventData(data = {}) {
  try {
    data = JSON.parse(data);
  } catch(error) {
    data = { error };
  }
  return data;
}

// Initializes the Presenter View's app state so that its in sync with the
// Client Window. Omits the `meta` reducer to avoid circular references.
function initPresenterState(win, store) {
  const state = store.getState();
  state.meta.presenterWin.postMessage(JSON.stringify({
    type: PresenterActions.PRESENTER_STATE_CHANGED,
    payload: omit(state, 'meta')
  }), win.location.origin);
}

export function handlePresenterMessage(win, store, event) {
  if(event.origin !== win.location.origin) {
    return;
  }
  const data = parseEventData(event.data);
  switch(data.type) {
    case PresenterActions.PRESENTER_WINDOW_READY:
      return initPresenterState(win, store);
    default:
      // Dispatch all other postMessage events into the Redux store
      return store.dispatch(data);
  }
}

function presenterClosed(clientWin, presenterWin) {
  clientWin.postMessage(JSON.stringify({
    type: PresenterActions.PRESENTER_WINDOW_CLOSED,
    payload: {}
  }), presenterWin.location.origin);
}

// Tells the Client Window that the Presenter app has mounted and is ready to
// receive state and messages
export function presenterReady(presenterWin) {
  const clientWin = presenterWin.opener;
  const msg = {
    type: PresenterActions.PRESENTER_WINDOW_READY,
    payload: {}
  };
  presenterWin.addEventListener('beforeunload', function onPresenterUnload(event) {
    clientWin.postMessage(JSON.stringify({
      type: PresenterActions.PRESENTER_WINDOW_CLOSED,
      payload: {}
    }), presenterWin.location.origin);
    presenterWin.removeEventListener('beforeunload', onPresenterUnload);
  });
  clientWin.postMessage(JSON.stringify(msg), presenterWin.location.origin);
  // Dispatch an event that can keep track of the Client Window object
  return {
    type: PresenterActions.PRESENTER_WINDOW_READY,
    payload: {
      clientWin: presenterWin.opener
    }
  };
}

// Spawns a new window that contains the "Presenter" view of the clock display
export function spawnPresenterWindow() {
  return (dispatch, getState) => {
    const { meta } = getState();
    if(meta.presenterWin) {
      console.warn('Presenter Window already spawned. If closed, it was not cleaned up properly.');
      return;
    }
    const presenterWin = window.open('/presenter.html');
    dispatch({
      type: PresenterActions.PRESENTER_WINDOW_SPAWNED,
      payload: { presenterWin }
    });
    window.addEventListener('beforeunload', function handleClientClose() {
      if(!presenterWin.closed) {
        presenterWin.close();
      }
    });
  };
}
