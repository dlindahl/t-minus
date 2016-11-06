import configureStore from 'redux-mock-store';
import initializer from '../presenterInitializer';

const STATES = {
  presenting: () => ({
    foo: {
      bar: true
    },
    meta: {
      isPresenter: false,
      presenterWin: mockWindow()
    }
  }),
  notPresenting: () => ({
    meta: {
      isPresenter: true,
      presenterWin: mockWindow()
    }
  })
};
const mockStore = configureStore();
const mockWindow = () => ({
  addEventListener: jest.fn(),
  location: {
    origin: 'ORIGIN'
  },
  postMessage: jest.fn()
});

describe('presenterInitializer', () => {
  it('initializes a relay to the presenter window', () => {
    const appWindow = mockWindow();
    initializer(mockStore(), appWindow);
    expect(appWindow.addEventListener).toHaveBeenCalled();
  });

  it('does not relay any state changes when not presenting', () => {
    const store = mockStore(STATES.notPresenting);
    initializer(store, mockWindow());
    store.dispatch({
      type: 'MOCK_ACTION'
    });
    expect(store.getState().meta.presenterWin.postMessage).not.toHaveBeenCalled();
  });

  it('relays all state changes to the presenter window when not presenting', () => {
    const store = mockStore(STATES.presenting());
    initializer(store, mockWindow());
    store.dispatch({
      type: 'MOCK_ACTION'
    });
    expect(store.getState().meta.presenterWin.postMessage).toHaveBeenCalledWith(
      "{\"type\":\"PRESENTER_STATE_CHANGED\",\"payload\":{\"foo\":{\"bar\":true}}}",
      'ORIGIN'
    );
  });

  it('does nothing when there is no store', () => {
    expect(() => initializer()).not.toThrow();
  });

  it('does nothing when there is no app window', () => {
    expect(() => initializer(mockStore(), null)).not.toThrow();
  });
});
