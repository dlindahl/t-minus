import Button from '../Button';
import renderer from 'react-test-renderer';

describe('Beer', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Button>
        <div/>
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the click handler when clicked', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <Button onClick={onClick}/>
    );
    const tree = component.toJSON();
    tree.props.onClick();
    expect(onClick).toHaveBeenCalled();
  });
});
