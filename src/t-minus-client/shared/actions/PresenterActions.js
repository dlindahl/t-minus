import ClockActions from '../actionTypes/ClockActionTypes'
import emptyObj from 'empty/object'
import { omit } from 'lodash'
import PresenterActions from '../actionTypes/PresenterActionTypes'

function parseEventData (data = '{}') {
  try {
    data = JSON.parse(data)
  } catch (error) {
    data = {
      payload: error,
      type: ClockActions.CLOCK_DATA_ERROR
    }
  }
  return data
}

/*
 Initializes the Presenter View's app state so that its in sync with the
 Client Window. Omits the `meta` reducer to avoid circular references.
*/
function initPresenterState (appWindow, store) {
  const state = store.getState()
  state.meta.presenterWin.postMessage(JSON.stringify({
    payload: omit(state, 'meta'),
    type: PresenterActions.PRESENTER_STATE_CHANGED
  }), appWindow.location.origin)
}

export function handlePresenterMessage (appWindow, store, event) {
  if (event.origin !== appWindow.location.origin) {
    return emptyObj
  }
  const data = parseEventData(event.data)
  switch (data.type) {
    case PresenterActions.PRESENTER_WINDOW_READY:
      initPresenterState(appWindow, store)
      return emptyObj
    default:
      // Dispatch all other postMessage events into the Redux store
      return store.dispatch(data)
  }
}

/*
 Tells the Client Window that the Presenter app has mounted and is ready to
 receive state and messages
*/
export function presenterReady (presenterWin) {
  if (!presenterWin.opener) {
    console.warn('Client Window not found, cannot notify Presenter is ready!')
    return {
      payload: emptyObj,
      type: PresenterActions.CLIENT_WINDOW_NOT_FOUND
    }
  }
  const appWindow = presenterWin.opener
  const msg = {
    payload: emptyObj,
    type: PresenterActions.PRESENTER_WINDOW_READY
  }
  presenterWin.addEventListener('beforeunload', function onPresenterUnload (event) {
    appWindow.postMessage(JSON.stringify({
      payload: emptyObj,
      type: PresenterActions.PRESENTER_WINDOW_CLOSED
    }), presenterWin.location.origin)
    presenterWin.removeEventListener('beforeunload', onPresenterUnload)
  })
  appWindow.postMessage(JSON.stringify(msg), presenterWin.location.origin)
  // Dispatch an event that can keep track of the Client Window object
  return {
    payload: {
      clientWin: presenterWin.opener
    },
    type: PresenterActions.PRESENTER_WINDOW_READY
  }
}

// Spawns a new window that contains the "Presenter" view of the clock display
export function spawnPresenterWindow (clientWin = window) {
  return (dispatch, getState) => {
    const { meta } = getState()
    if (meta.presenterWin) {
      console.warn('Presenter Window already spawned. If closed, it was not cleaned up properly.')
      return
    }
    const presenterWin = clientWin.open('presenter.html')
    dispatch({
      payload: { presenterWin },
      type: PresenterActions.PRESENTER_WINDOW_SPAWNED
    })
    clientWin.addEventListener('beforeunload', function handleClientClose () {
      if (!presenterWin.closed) {
        presenterWin.close()
      }
    })
  }
}
