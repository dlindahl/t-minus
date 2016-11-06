import AppNavButton from '../AppNavButton';
import Beer from 'react-icons/lib/fa/beer';
import renderer from 'react-test-renderer';

describe('AppNavButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <AppNavButton>
        <Beer/>
      </AppNavButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an active component', () => {
    const component = renderer.create(
      <AppNavButton active>
        <Beer/>
      </AppNavButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an inactive component', () => {
    const component = renderer.create(
      <AppNavButton active={false}>
        <Beer/>
      </AppNavButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled component', () => {
    const component = renderer.create(
      <AppNavButton disabled>
        <Beer/>
      </AppNavButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an enabled component', () => {
    const component = renderer.create(
      <AppNavButton disabled={false}>
        <Beer/>
      </AppNavButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
