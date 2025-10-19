import {render, screen} from '@testing-library/react';
import {EventListView} from '/react4xp/common/EventListView/EventListView';

// Mock dependencies
jest.mock('/react4xp/common/Image/Image', () => ({
  Image: ({image}: {image?: {url?: string}}) =>
    image?.url ? <img src={image.url} alt="Event" /> : null,
}));

jest.mock('/react4xp/common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html}: {html: string}) => <div data-testid="safe-html">{html.replace(/<[^>]*>/g, '')}</div>,
}));

jest.mock('/react4xp/common/EventListItem/EventListItem', () => ({
  EventListItem: ({title}: {title?: string}) => (
    <div data-testid="event-list-item">{title}</div>
  ),
}));

jest.mock('/react4xp/common/EventCard/EventCard', () => ({
  EventCard: ({title}: {title?: string}) => (
    <div data-testid="event-card">{title}</div>
  ),
}));

describe('EventListView', () => {
  it('should render without props', () => {
    const {container} = render(<EventListView />);
    expect(container.querySelector('.events-list-wrapper')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<EventListView title="Upcoming Events" />);
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    const {container} = render(<EventListView />);
    const titleDiv = container.querySelector('.events-list-title');
    expect(titleDiv).not.toBeInTheDocument();
  });

  it('should render image when provided', () => {
    const image = {url: '/event-header.jpg'};
    render(<EventListView image={image} />);
    expect(screen.getByAltText('Event')).toBeInTheDocument();
  });

  it('should render shortDescription when provided', () => {
    render(<EventListView shortDescription="<p>Short description</p>" />);
    expect(screen.getByText('Short description')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<EventListView description="<p>Full description</p>" />);
    expect(screen.getByText('Full description')).toBeInTheDocument();
  });

  it('should render both shortDescription and description', () => {
    render(
      <EventListView
        shortDescription="<p>Short</p>"
        description="<p>Full</p>"
      />
    );
    expect(screen.getByText('Short')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
  });

  it('should render items as EventCard in grid mode (default)', () => {
    const items = [
      {id: '1', title: 'Event 1'},
      {id: '2', title: 'Event 2'},
    ];

    render(<EventListView items={items} />);

    const cards = screen.getAllByTestId('event-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('should render items as EventListItem in list mode', () => {
    const items = [
      {id: '1', title: 'Event 1'},
      {id: '2', title: 'Event 2'},
    ];

    render(<EventListView items={items} displaytype="list" />);

    const listItems = screen.getAllByTestId('event-list-item');
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });

  it('should apply grid className to events list', () => {
    const items = [{id: '1'}];
    const {container} = render(<EventListView items={items} displaytype="grid" />);

    const eventsList = container.querySelector('.events-list.grid');
    expect(eventsList).toBeInTheDocument();
  });

  it('should apply list className to events list', () => {
    const items = [{id: '1'}];
    const {container} = render(<EventListView items={items} displaytype="list" />);

    const eventsList = container.querySelector('.events-list.list');
    expect(eventsList).toBeInTheDocument();
  });

  it('should not render events list when items is empty', () => {
    const {container} = render(<EventListView items={[]} />);
    const eventsList = container.querySelector('.events-list');
    expect(eventsList).not.toBeInTheDocument();
  });

  it('should use "to" property as url when available', () => {
    const items = [
      {id: '1', title: 'Event 1', url: '/old-url', to: '/new-url'},
    ];

    render(<EventListView items={items} displaytype="list" />);
    expect(screen.getByTestId('event-list-item')).toBeInTheDocument();
  });

  it('should fallback to "url" property when "to" is not available', () => {
    const items = [
      {id: '1', title: 'Event 1', url: '/event-url'},
    ];

    render(<EventListView items={items} displaytype="list" />);
    expect(screen.getByTestId('event-list-item')).toBeInTheDocument();
  });

  it('should render children when provided', () => {
    render(
      <EventListView>
        <div>Load more button</div>
      </EventListView>
    );
    expect(screen.getByText('Load more button')).toBeInTheDocument();
  });

  it('should render complete event list with all elements', () => {
    const items = [
      {id: '1', title: 'Event 1'},
      {id: '2', title: 'Event 2'},
    ];
    const image = {url: '/header.jpg'};

    render(
      <EventListView
        title="Upcoming Events"
        image={image}
        shortDescription="<p>Short description</p>"
        description="<p>Full description</p>"
        items={items}
        displaytype="grid"
      >
        <div>Load more button</div>
      </EventListView>
    );

    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByAltText('Event')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Full description')).toBeInTheDocument();
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Load more button')).toBeInTheDocument();
  });
});
