import TeleprompterActions from '../actionTypes/TeleprompterActionTypes'

export function setTeleprompterValue (value) {
  return {
    payload: { value },
    type: TeleprompterActions.TELEPROMPTER_VALUE_CHANGED
  }
}
