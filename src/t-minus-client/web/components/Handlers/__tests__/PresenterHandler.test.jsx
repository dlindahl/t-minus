import configureStore from 'redux-mock-store';
import emptyObj from 'empty/object';
import PresenterHandler from '../PresenterHandler';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

const STATES = {
  default: {
    clock: {
      percentComplete: 0
    },
    display: {
      teleprompter: 'TEXT'
    },
    meta: emptyObj
  }
};
const store = configureStore();

describe('PresenterHandler', () => {
  it('renders the component', () => {
    // Mute the console
    const unmockedWarn = console.warn;
    console.warn = jest.fn();
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <PresenterHandler/>
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
    console.warn = unmockedWarn;
  });

  it('indicates that the Presenter is ready', () => {
    const presenterReady = jest.fn();
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <PresenterHandler.WrappedComponent
          {...STATES.default}
          presenterReady={presenterReady}
        />
      </Provider>
    );
    expect(presenterReady).toHaveBeenCalledWith(window);
  });
});
