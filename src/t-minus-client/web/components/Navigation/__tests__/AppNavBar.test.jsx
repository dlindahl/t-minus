import AppNavBar from '../AppNavBar';
import renderer from 'react-test-renderer';

describe('AppNavBar', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <AppNavBar/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the component as a column', () => {
    const component = renderer.create(
      <AppNavBar direction="column"/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the component as a row', () => {
    const component = renderer.create(
      <AppNavBar direction="row"/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders itemized children', () => {
    const component = renderer.create(
      <AppNavBar>
        <div>TITLE</div>
        <button>BUTTON</button>
      </AppNavBar>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
