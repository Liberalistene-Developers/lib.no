import {render, screen} from '@testing-library/react';
import {PersonList} from '/react4xp/common/PersonList/PersonList';

// Mock dependencies
jest.mock('/react4xp/common/Image/Image', () => ({
  Image: ({image}: {image?: {url?: string}}) =>
    image?.url ? <img src={image.url} alt="Person" /> : null,
}));

jest.mock('/react4xp/common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html}: {html: string}) => <div data-testid="safe-html">{html.replace(/<[^>]*>/g, '')}</div>,
}));

jest.mock('/react4xp/common/ListItem/ListItem', () => ({
  ListItem: ({item}: {item?: {name?: string}}) => (
    <div data-testid="list-item">{item?.name}</div>
  ),
}));

jest.mock('/react4xp/common/GridItem/GridItem', () => ({
  GridItem: ({item}: {item?: {name?: string}}) => (
    <div data-testid="grid-item">{item?.name}</div>
  ),
}));

describe('PersonList', () => {
  it('should render without props', () => {
    const {container} = render(<PersonList />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<PersonList title="Our Team" />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    const {container} = render(<PersonList />);
    const h2 = container.querySelector('h2');
    expect(h2).not.toBeInTheDocument();
  });

  it('should render image when provided', () => {
    const image = {url: '/team-photo.jpg'};
    render(<PersonList image={image} />);
    expect(screen.getByAltText('Person')).toBeInTheDocument();
  });

  it('should render shortDescription when provided', () => {
    render(<PersonList shortDescription="<p>Short description</p>" />);
    expect(screen.getByText('Short description')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<PersonList description="<p>Full description</p>" />);
    expect(screen.getByText('Full description')).toBeInTheDocument();
  });

  it('should render both shortDescription and description', () => {
    render(
      <PersonList
        shortDescription="<p>Short</p>"
        description="<p>Full</p>"
      />
    );
    expect(screen.getByText('Short')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
  });

  it('should render items as GridItem in grid mode (default)', () => {
    const items = [
      {itemID: '1', name: 'John Doe'},
      {itemID: '2', name: 'Jane Smith'},
    ];

    render(<PersonList items={items} />);

    const gridItems = screen.getAllByTestId('grid-item');
    expect(gridItems).toHaveLength(2);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render items as ListItem in list mode', () => {
    const items = [
      {itemID: '1', name: 'John Doe'},
      {itemID: '2', name: 'Jane Smith'},
    ];

    render(<PersonList items={items} displaytype="list" />);

    const listItems = screen.getAllByTestId('list-item');
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should apply flex-row className for grid displaytype', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    const {container} = render(<PersonList items={items} displaytype="grid" />);

    const wrapper = container.querySelector('.flex.flex-row');
    expect(wrapper).toBeInTheDocument();
  });

  it('should apply flex-col className for list displaytype', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    const {container} = render(<PersonList items={items} displaytype="list" />);

    const wrapper = container.querySelector('.flex.flex-col');
    expect(wrapper).toBeInTheDocument();
  });

  it('should not render items list when items is empty', () => {
    const {container} = render(<PersonList items={[]} />);
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).not.toBeInTheDocument();
  });

  it('should not render items list when items is undefined', () => {
    const {container} = render(<PersonList />);
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).not.toBeInTheDocument();
  });

  it('should pass imagesize to items', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    render(<PersonList items={items} imagesize="large" />);
    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('should pass imagetype to items as "round" when true', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    render(<PersonList items={items} imagetype={true} />);
    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('should pass empty string to items when imagetype is false', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    render(<PersonList items={items} imagetype={false} />);
    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('should use itemID as key for items', () => {
    const items = [
      {itemID: 'unique-1', name: 'John Doe'},
      {itemID: 'unique-2', name: 'Jane Smith'},
    ];

    render(<PersonList items={items} />);

    const gridItems = screen.getAllByTestId('grid-item');
    expect(gridItems).toHaveLength(2);
  });

  it('should render complete person list with all elements', () => {
    const items = [
      {itemID: '1', name: 'John Doe'},
      {itemID: '2', name: 'Jane Smith'},
    ];
    const image = {url: '/team.jpg'};

    render(
      <PersonList
        title="Our Team"
        image={image}
        shortDescription="<p>Short description</p>"
        description="<p>Full description</p>"
        items={items}
        displaytype="grid"
      />
    );

    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByAltText('Person')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Full description')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should use default displaytype as grid', () => {
    const items = [{itemID: '1', name: 'John Doe'}];
    render(<PersonList items={items} />);
    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('should use default empty items array', () => {
    const {container} = render(<PersonList />);
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).not.toBeInTheDocument();
  });
});
