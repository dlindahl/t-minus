import emptyObj from 'empty/object'
import reducer from '../MetaReducer'
import PresenterActions from '../../actionTypes/PresenterActionTypes'

describe('MetaReducer', () => {
  it('has an expected default state', () => {
    const state = reducer(undefined, {})
    expect(state.clientWin).toBeNull()
    expect(state.isPresenter).toBeFalsy()
    expect(state.presenterWin).toBeNull()
  })

  describe(PresenterActions.PRESENTER_WINDOW_READY, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          clientWin: 'CLIENT_WIN_OBJ'
        },
        type: PresenterActions.PRESENTER_WINDOW_READY
      })
      expect(state.clientWin).toBe('CLIENT_WIN_OBJ')
      expect(state.isPresenter).toBeTruthy()
    })
  })

  describe(PresenterActions.PRESENTER_WINDOW_SPAWNED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          presenterWin: 'PRESENTER_WIN_OBJ'
        },
        type: PresenterActions.PRESENTER_WINDOW_SPAWNED
      })
      expect(state.presenterWin).toBe('PRESENTER_WIN_OBJ')
    })
  })

  describe(PresenterActions.PRESENTER_WINDOW_CLOSED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      initState.presenterWin = 'PRESENTER_WIN_OBJ'
      const state = reducer(undefined, {
        payload: emptyObj,
        type: PresenterActions.PRESENTER_WINDOW_CLOSED
      })
      expect(state.presenterWin).toBeNull()
    })
  })
})
