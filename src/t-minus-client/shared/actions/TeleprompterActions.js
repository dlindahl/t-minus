import TeleprompterActions from '../actionTypes/TeleprompterActionTypes';

export function setTeleprompterValue(value) {
  return {
    type: TeleprompterActions.TELEPROMPTER_VALUE_CHANGED,
    payload: { value }
  };
}
