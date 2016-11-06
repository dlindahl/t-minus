import configureStore from 'redux-mock-store';
import emptyObj from 'empty/object';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SpawnPresenterWindowButton from '../SpawnPresenterWindowButton';

const STATES = {
  default: {
    meta: emptyObj
  }
};
const store = configureStore();

describe('SpawnPresenterWindowButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <SpawnPresenterWindowButton store={store(STATES.default)}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('spawns the presenter window when clicked', () => {
    const spawnPresenterWindow = jest.fn();
    const component = renderer.create(
      <Provider store={store()}>
        <SpawnPresenterWindowButton.WrappedComponent
          spawnPresenterWindow={spawnPresenterWindow}
        />
      </Provider>
    );
    const tree = component.toJSON();
    tree.props.onClick();
    expect(spawnPresenterWindow).toHaveBeenCalled();
  });

  it('does not spawn the presenter window when disabled and clicked', () => {
    const spawnPresenterWindow = jest.fn();
    const component = renderer.create(
      <Provider store={store()}>
        <SpawnPresenterWindowButton.WrappedComponent
          disabled
          spawnPresenterWindow={spawnPresenterWindow}
        />
      </Provider>
    );
    const tree = component.toJSON();
    tree.props.onClick();
    expect(spawnPresenterWindow).not.toHaveBeenCalled();
  });
});
