import * as presenter from '../PresenterActions';
import configureStore from 'redux-mock-store';
import emptyObj from 'empty/object';
import mute from 'mute';
import { omit } from 'lodash';

const mockStore = configureStore();
const mockWindow = () => ({
  addEventListener: jest.fn(),
  close: jest.fn(),
  location: {
    origin: 'ORIGIN'
  },
  open: jest.genMockFunction(),
  postMessage: jest.fn(),
  removeEventListener: jest.fn()
});
const DATA = {
  default: {
    type: 'TEST_TYPE',
    payload: {
      foo: 'bar'
    }
  },
  ready: {
    type: 'PRESENTER_WINDOW_READY',
    payload: {
      foo: 'baz'
    }
  }
};
const STATE = {
  default: () => ({
    foo: {
      bar: 'baz'
    },
    meta: {
      presenterWin: mockWindow()
    }
  }),
  noPresenter: {
    meta: emptyObj
  }
};

describe('PresenterActions', () => {
  describe('#handlePresenterMessage', () => {
    it('relays the data to the redux store', () => {
      const appWindow = mockWindow();
      const store = mockStore();
      const event = {
        data: JSON.stringify(DATA.default),
        origin: appWindow.location.origin
      };
      presenter.handlePresenterMessage(appWindow, store, event);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toMatchSnapshot();
    });

    it('relays an error to the redux store when the data is not parseable JSON', () => {
      const appWindow = mockWindow();
      const event = {
        data: '{{[[',
        origin: appWindow.location.origin
      };
      const store = mockStore();
      presenter.handlePresenterMessage(appWindow, store, event);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe('CLOCK_DATA_ERROR');
      expect(actions[0].payload).toMatchSnapshot();
    });

    it('does nothing when the origin does not match', () => {
      const appWindow = mockWindow();
      const store = mockStore();
      const event = {
        data: JSON.stringify(emptyObj),
        origin: 'MISMATCH'
      };
      presenter.handlePresenterMessage(appWindow, store, event);
      const actions = store.getActions();
      expect(actions.length).toBe(0);
    });

    it('initializes the presenter window state when the window is ready', () => {
      const appWindow = mockWindow();
      const store = mockStore(STATE.default());
      const event = {
        data: JSON.stringify(DATA.ready),
        origin: appWindow.location.origin
      };
      presenter.handlePresenterMessage(appWindow, store, event);
      const mockPostMsg = store.getState().meta.presenterWin.postMessage;
      expect(mockPostMsg).toHaveBeenCalled();
      expect(mockPostMsg.mock.calls).toMatchSnapshot();
    });
  });

  describe('#presenterReady', () => {
    it('listens for the presenter window closing', () => {
      const store = mockStore();
      const appWindow = mockWindow();
      const presenterWin = mockWindow();
      presenterWin.opener = appWindow;
      presenter.presenterReady(presenterWin);
      const unloadEvent = presenterWin.addEventListener.mock.calls[0];
      unloadEvent[1]();
      expect(appWindow.postMessage).toHaveBeenCalledTimes(2);
      expect(appWindow.postMessage.mock.calls[1]).toMatchSnapshot();
    });

    it('tells the app window that the presenter window is ready', () => {
      const store = mockStore();
      const appWindow = mockWindow();
      const presenterWin = mockWindow();
      presenterWin.opener = appWindow;
      const payload = presenter.presenterReady(presenterWin);
      expect(payload).toMatchSnapshot();
      expect(appWindow.postMessage).toHaveBeenCalled();
      expect(appWindow.postMessage.mock.calls).toMatchSnapshot();
    });

    it('dispatches a NOT_FOUND event when the app window cannot be found', () => {
      const presenterWin = mockWindow();
      console.warn = jest.genMockFunction();
      const payload = presenter.presenterReady(presenterWin);
      expect(console.warn).toHaveBeenCalledTimes(1);
      expect(payload).toMatchSnapshot();
    });
  });

  describe('#spawnPresenterWindow', () => {
    it('opens a new presenter window', () => {
      const store = mockStore(STATE.noPresenter);
      const clientWin = mockWindow();
      presenter.spawnPresenterWindow(clientWin)(store.dispatch, store.getState);
      expect(clientWin.open).toHaveBeenCalledWith('presenter.html');
    });

    it('dispatches a PRESENTER_WINDOW_SPAWNED event when the presenter window has spawned', () => {
      const store = mockStore(STATE.noPresenter);
      const clientWin = mockWindow();
      const presenterWin = mockWindow();
      clientWin.open.mockReturnValueOnce(presenterWin);
      presenter.spawnPresenterWindow(clientWin)(store.dispatch, store.getState);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toMatchSnapshot();
    });

    it('closes the presenter window when the client window is closed', () => {
      const store = mockStore(STATE.noPresenter);
      const clientWin = mockWindow();
      const presenterWin = mockWindow();
      clientWin.open.mockReturnValueOnce(presenterWin);
      presenter.spawnPresenterWindow(clientWin)(store.dispatch, store.getState);
      const handler = clientWin.addEventListener.mock.calls[0];
      handler[1]()
      expect(presenterWin.close).toHaveBeenCalled();
    });

    it('does nothing when the presenter window already exists', () => {
      const store = mockStore(STATE.default);
      console.warn = jest.genMockFunction();
      presenter.spawnPresenterWindow()(store.dispatch, store.getState);
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
});
