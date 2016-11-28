import { assign, inRange, padEnd, padStart } from 'lodash'
import ClockActions from '../actionTypes/ClockActionTypes'
import PresenterActions from '../actionTypes/PresenterActionTypes'
import TeleprompterActions from '../actionTypes/TeleprompterActionTypes'
import TimerSeverity from '../actionTypes/TimerSeverityTypes'

const CriticalPercentMin = 0.9
const CriticalTimeMin = 0
const DangerPercentMax = 0.9
const DangerPercentMin = 0.8
const DangerTimeMin = 30000 // 30 * 1000
const DefaultSeverity = TimerSeverity.TIMER_SEVERITY_CALM
const MinTimerValue = 120000 // 2 * 60 * 1000
const PadWidthSmall = 2
const PadWidthLarge = 4
const UnknownModeFormat = {
  hours: '--',
  microseconds: '----',
  minutes: '--',
  seconds: '--'
}
const WarnPercentMax = 0.8
const WarnPercentMin = 0.75
const WarnTimeMin = 60000 // 1 * 60 * 1000

function initialState () {
  return assign({}, formatDisplay(), {
    hasTimerElapsed: false,
    mode: null,
    severity: calculateSeverity(),
    teleprompter: '',
    timerValue: null
  })
}

function calculateSeverity (state = {}, payload = {}) {
  if (payload.mode !== ClockActions.CLOCK_MODE_TIMER) {
    return DefaultSeverity
  }
  /*
  Use percentage based severity calculation if the timer is below the
  threshold for fixed breakpoints
  */
  if (state.timerValue <= MinTimerValue) {
    const completeness = payload.elapsedTime / state.timerValue
    switch (true) {
      case inRange(completeness, WarnPercentMin, WarnPercentMax):
        return TimerSeverity.TIMER_SEVERITY_WARN
      case inRange(completeness, DangerPercentMin, DangerPercentMax):
        return TimerSeverity.TIMER_SEVERITY_DANGER
      case completeness >= CriticalPercentMin:
        return TimerSeverity.TIMER_SEVERITY_CRITICAL
      default:
        return DefaultSeverity
    }
  }
  switch (true) {
    case payload.timeRemaining < CriticalTimeMin:
      return TimerSeverity.TIMER_SEVERITY_CRITICAL
    case payload.timeRemaining < DangerTimeMin:
      return TimerSeverity.TIMER_SEVERITY_DANGER
    case payload.timeRemaining < WarnTimeMin:
      return TimerSeverity.TIMER_SEVERITY_WARN
    default:
      return DefaultSeverity
  }
}

function formatDisplay (payload = {}) {
  if (!payload.mode) {
    return UnknownModeFormat
  }
  const duration = payload.duration || {}
  return {
    hours: padStart(duration.h, PadWidthSmall, '0'),
    microseconds: padEnd(duration.ms, PadWidthLarge, '0'),
    minutes: padStart(duration.m, PadWidthSmall, '0'),
    seconds: padStart(duration.s, PadWidthSmall, '0')
  }
}

export default function display (state = initialState(), action) {
  const payload = action.payload || {}
  switch (action.type) {
    case ClockActions.CLOCK_MODE_CHANGED:
      return assign({}, initialState(), formatDisplay(payload), {
        mode: payload.mode,
        timerValue: state.timerValue
      })
    case ClockActions.CLOCK_TICK:
      return assign({}, state, formatDisplay(payload), {
        hasTimerElapsed: payload.hasTimerElapsed,
        severity: calculateSeverity(state, payload)
      })
    case ClockActions.CLOCK_TIMER_CHANGED:
      return assign({}, initialState(), {
        timerValue: payload.timerValue
      })
    case ClockActions.CLOCK_RESET:
      return assign({}, initialState(), formatDisplay({ duration: payload.duration, mode: state.mode }), {
        mode: state.mode,
        timerValue: state.timerValue
      })
    case PresenterActions.PRESENTER_STATE_CHANGED:
      return assign({}, payload.display)
    case TeleprompterActions.TELEPROMPTER_VALUE_CHANGED:
      return assign({}, state, {
        teleprompter: payload.value
      })
    default:
      return state
  }
}
