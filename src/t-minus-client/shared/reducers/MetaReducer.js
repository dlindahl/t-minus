import { assign } from 'lodash';
import PresenterActions from '../actionTypes/PresenterActionTypes';

function initialState() {
  return {
    clientWin: null,
    isPresenter: false,
    presenterWin: null
  };
}

export default function meta(state = initialState(), action) {
  const payload = action.payload || {};
  switch(action.type) {
    case PresenterActions.PRESENTER_WINDOW_READY:
      return assign({}, state, { clientWin: payload.clientWin, isPresenter: true });
    case PresenterActions.PRESENTER_WINDOW_SPAWNED:
      return assign({}, state, { presenterWin: payload.presenterWin });
    case PresenterActions.PRESENTER_WINDOW_CLOSED:
      return assign({}, state, { presenterWin: null });
    default:
      return state;
  }
}
