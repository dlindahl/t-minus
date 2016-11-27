import ClockActions from '../actionTypes/ClockActionTypes';
import emptyObj from 'empty/object';
import { omit } from 'lodash';
import PresenterActions from '../actionTypes/PresenterActionTypes';

function parseEventData(data = '{}') {
  try {
    data = JSON.parse(data);
  } catch(error) {
    data = {
      type: ClockActions.CLOCK_DATA_ERROR,
      payload: error
    };
  }
  return data;
}

// Initializes the Presenter View's app state so that its in sync with the
// Client Window. Omits the `meta` reducer to avoid circular references.
function initPresenterState(appWindow, store) {
  const state = store.getState();
  state.meta.presenterWin.postMessage(JSON.stringify({
    type: PresenterActions.PRESENTER_STATE_CHANGED,
    payload: omit(state, 'meta')
  }), appWindow.location.origin);
}

export function handlePresenterMessage(appWindow, store, event) {
  if(event.origin !== appWindow.location.origin) {
    return;
  }
  const data = parseEventData(event.data);
  switch(data.type) {
    case PresenterActions.PRESENTER_WINDOW_READY:
      return initPresenterState(appWindow, store);
    default:
      // Dispatch all other postMessage events into the Redux store
      return store.dispatch(data);
  }
}

// Tells the Client Window that the Presenter app has mounted and is ready to
// receive state and messages
export function presenterReady(presenterWin) {
  if(!presenterWin.opener) {
    console.warn('Client Window not found, cannot notify Presenter is ready!');
    return {
      type: PresenterActions.CLIENT_WINDOW_NOT_FOUND,
      payload: emptyObj
    };
  }
  const appWindow = presenterWin.opener;
  const msg = {
    type: PresenterActions.PRESENTER_WINDOW_READY,
    payload: {}
  };
  presenterWin.addEventListener('beforeunload', function onPresenterUnload(event) {
    appWindow.postMessage(JSON.stringify({
      type: PresenterActions.PRESENTER_WINDOW_CLOSED,
      payload: {}
    }), presenterWin.location.origin);
    presenterWin.removeEventListener('beforeunload', onPresenterUnload);
  });
  appWindow.postMessage(JSON.stringify(msg), presenterWin.location.origin);
  // Dispatch an event that can keep track of the Client Window object
  return {
    type: PresenterActions.PRESENTER_WINDOW_READY,
    payload: {
      clientWin: presenterWin.opener
    }
  };
}

// Spawns a new window that contains the "Presenter" view of the clock display
export function spawnPresenterWindow(clientWin = window) {
  return (dispatch, getState) => {
    const { meta } = getState();
    if(meta.presenterWin) {
      console.warn('Presenter Window already spawned. If closed, it was not cleaned up properly.');
      return;
    }
    const presenterWin = clientWin.open('presenter.html');
    dispatch({
      type: PresenterActions.PRESENTER_WINDOW_SPAWNED,
      payload: { presenterWin }
    });
    clientWin.addEventListener('beforeunload', function handleClientClose() {
      if(!presenterWin.closed) {
        presenterWin.close();
      }
    });
  };
}
