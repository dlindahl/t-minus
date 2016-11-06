import reducer from '../MetaReducer';
import PresenterActions from '../../actionTypes/PresenterActionTypes';

describe('MetaReducer', () => {
  it('has an expected default state', () => {
    const state = reducer(undefined, {});
    expect(state.clientWin).toBeNull();
    expect(state.isPresenter).toBeFalsy();
    expect(state.presenterWin).toBeNull();
  });

  describe(PresenterActions.PRESENTER_WINDOW_READY, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: PresenterActions.PRESENTER_WINDOW_READY,
        payload: {
          clientWin: 'CLIENT_WIN_OBJ'
        }
      });
      expect(state.clientWin).toBe('CLIENT_WIN_OBJ');
      expect(state.isPresenter).toBeTruthy();
    });
  });

  describe(PresenterActions.PRESENTER_WINDOW_SPAWNED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: PresenterActions.PRESENTER_WINDOW_SPAWNED,
        payload: {
          presenterWin: 'PRESENTER_WIN_OBJ'
        }
      });
      expect(state.presenterWin).toBe('PRESENTER_WIN_OBJ');
    });
  });

  describe(PresenterActions.PRESENTER_WINDOW_CLOSED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {});
      initState.presenterWin = 'PRESENTER_WIN_OBJ';
      const state = reducer(undefined, {
        type: PresenterActions.PRESENTER_WINDOW_CLOSED,
        payload: {}
      });
      expect(state.presenterWin).toBeNull();
    });
  });
});
