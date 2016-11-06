import ClockActions from '../../actionTypes/ClockActionTypes';
import present from 'present';
import PresenterActions from '../../actionTypes/PresenterActionTypes';
import reducer from '../ClockReducer';

describe('ClockReducer', () => {
  it('has an expected default state', () => {
    const state = reducer(undefined, {});
    expect(state.elapsedTime).toBe(0);
    expect(state.lastTick).toBe(0);
    expect(state.mode).toBeNull();
    expect(state.percentComplete).toBe(1);
    expect(state.running).toBeFalsy();
    expect(state.startedAt).toBeFalsy();
    expect(state.timerValue).toBeFalsy();
  });

  describe(ClockActions.CLOCK_MODE_CHANGED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {});
      initState.timerValue = 1000;
      const state = reducer(initState, {
        type: ClockActions.CLOCK_MODE_CHANGED,
        payload: {
          mode: 'NEWMODE',
          percentComplete: 0.5,
          timerValue: -1
        }
      });
      expect(state.mode).toBe('NEWMODE');
      expect(state.percentComplete).toBe(0.5);
      expect(state.timerValue).toBe(1000);
    });
  });

  describe(ClockActions.CLOCK_PAUSED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {});
      initState.running = true;
      const state = reducer(initState, {
        type: ClockActions.CLOCK_PAUSED,
        payload: {
          running: false
        }
      });
      expect(state.running).toBeFalsy();
    });
  });

  describe(ClockActions.CLOCK_RESET, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {});
      const state = reducer(initState, {
        type: ClockActions.CLOCK_RESET,
        payload: {
          mode: 'NEWMODE',
          percentComplete: 0.5,
          timerValue: -1
        }
      });
      expect(state.mode).toBeNull();
      expect(state.percentComplete).toBe(0.5);
      expect(state.timerValue).toBeNull();
    });
  });

  describe(ClockActions.CLOCK_STARTED, () => {
    it('changes the state', () => {
      const startedAt = present();
      const state = reducer(undefined, {
        type: ClockActions.CLOCK_STARTED,
        payload: {
          startedAt
        }
      });
      expect(state.lastTick).toBeGreaterThan(0);
      expect(state.running).toBeTruthy();
      expect(state.startedAt).toBe(startedAt);
    });
  });

  describe(ClockActions.CLOCK_TICK, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: ClockActions.CLOCK_TICK,
        payload: {
          elapsedTime: 'elapsedTime',
          currentTick: 'currentTick',
          percentComplete: 'percentComplete'
        }
      });
      expect(state.elapsedTime).toBe('elapsedTime');
      expect(state.lastTick).toBe('currentTick');
      expect(state.percentComplete).toBe('percentComplete');
    });
  });

  describe(ClockActions.CLOCK_TIMER_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: ClockActions.CLOCK_TIMER_CHANGED,
        payload: {
          timerValue: 'timerValue',
          percentComplete: 'percentComplete'
        }
      });
      expect(state.timerValue).toBe('timerValue');
      expect(state.percentComplete).toBe('percentComplete');
    });
  });

  describe(ClockActions.CLOCK_UNPAUSED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: ClockActions.CLOCK_UNPAUSED,
        payload: {}
      });
      expect(state.lastTick).toBeGreaterThan(0);
      expect(state.running).toBeTruthy();
    });
  });

  describe(PresenterActions.PRESENTER_STATE_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        type: PresenterActions.PRESENTER_STATE_CHANGED,
        payload: {
          clock: {
            mode: 'P_STATE_CHANGED'
          }
        }
      });
      expect(state.mode).toBe('P_STATE_CHANGED');
    });
  });
});
