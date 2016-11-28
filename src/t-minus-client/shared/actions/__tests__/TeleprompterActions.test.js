/* eslint no-magic-numbers: off */
import * as teleprompter from '../TeleprompterActions'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('TeleprompterActions', () => {
  describe('#setTeleprompterValue', () => {
    it('indicates that the teleprompter value has changed', () => {
      const store = mockStore()
      store.dispatch(teleprompter.setTeleprompterValue('VALUE'))
      const actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions[0]).toMatchSnapshot()
    })
  })
})
