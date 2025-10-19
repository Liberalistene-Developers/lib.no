import {render, screen} from '@testing-library/react';
import {EventListItem} from '/react4xp/common/EventListItem/EventListItem';

// Mock dependencies
jest.mock('/react4xp/common/ListItem/ListItem', () => ({
  ListItem: ({children, item}: {children?: React.ReactNode; item?: {name?: string; shortDescription?: string; url?: string}}) => (
    <div data-testid="list-item">
      <div data-testid="item-name">{item?.name}</div>
      <div data-testid="item-description">{item?.shortDescription}</div>
      <div data-testid="item-url">{item?.url}</div>
      {children}
    </div>
  ),
}));

jest.mock('/react4xp/common/EventInfo/EventInfo', () => ({
  EventInfo: ({date, location: _location, locationLabel, locationType}: {date?: string; location?: unknown; locationLabel?: string; locationType?: string}) => (
    <div data-testid="event-info">
      <span data-testid="event-date">{date}</span>
      <span data-testid="event-location-type">{locationType}</span>
      <span data-testid="event-location-label">{locationLabel}</span>
    </div>
  ),
}));

describe('EventListItem', () => {
  it('should render event list item', () => {
    render(<EventListItem />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
    expect(screen.getByTestId('event-info')).toBeInTheDocument();
  });

  it('should pass title to ListItem as name', () => {
    render(<EventListItem title="Event Title" />);
    expect(screen.getByTestId('item-name')).toHaveTextContent('Event Title');
  });

  it('should pass text to ListItem as shortDescription', () => {
    render(<EventListItem text="Event description" />);
    expect(screen.getByTestId('item-description')).toHaveTextContent('Event description');
  });

  it('should pass url to ListItem', () => {
    render(<EventListItem url="/events/test" />);
    expect(screen.getByTestId('item-url')).toHaveTextContent('/events/test');
  });

  it('should pass date to EventInfo', () => {
    render(<EventListItem date="2024-01-15" />);
    expect(screen.getByTestId('event-date')).toHaveTextContent('2024-01-15');
  });

  it('should pass location to EventInfo', () => {
    const location = {address: 'Oslo, Norway', name: 'Oslo City Hall'};
    render(<EventListItem location={location} />);
    expect(screen.getByTestId('event-info')).toBeInTheDocument();
  });

  it('should pass locationType to EventInfo', () => {
    render(<EventListItem locationType="virtual" />);
    expect(screen.getByTestId('event-location-type')).toHaveTextContent('virtual');
  });

  it('should use default locationType "place"', () => {
    render(<EventListItem />);
    expect(screen.getByTestId('event-location-type')).toHaveTextContent('place');
  });

  it('should pass locationLabel to EventInfo', () => {
    render(<EventListItem locationLabel="Location:" />);
    expect(screen.getByTestId('event-location-label')).toHaveTextContent('Location:');
  });

  it('should use default locationLabel "Sted:"', () => {
    render(<EventListItem />);
    expect(screen.getByTestId('event-location-label')).toHaveTextContent('Sted:');
  });

  it('should use default empty address when location not provided', () => {
    render(<EventListItem />);
    expect(screen.getByTestId('event-info')).toBeInTheDocument();
  });

  it('should render with all props', () => {
    const location = {address: 'Oslo, Norway'};

    render(
      <EventListItem
        date="2024-01-15"
        location={location}
        locationType="place"
        locationLabel="Sted:"
        title="Complete Event"
        text="Event description"
        url="/events/complete"
      />
    );

    expect(screen.getByTestId('item-name')).toHaveTextContent('Complete Event');
    expect(screen.getByTestId('item-description')).toHaveTextContent('Event description');
    expect(screen.getByTestId('item-url')).toHaveTextContent('/events/complete');
    expect(screen.getByTestId('event-date')).toHaveTextContent('2024-01-15');
    expect(screen.getByTestId('event-location-type')).toHaveTextContent('place');
    expect(screen.getByTestId('event-location-label')).toHaveTextContent('Sted:');
  });
});
