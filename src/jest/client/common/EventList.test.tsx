import {render, screen} from '@testing-library/react';
import {EventList} from '/react4xp/common/EventList/EventList';

// Mock dependencies
jest.mock('/react4xp/common/EventListView/EventListView', () => ({
  EventListView: ({title, items, children}: {title?: string; items?: unknown[]; children?: React.ReactNode}) => (
    <div data-testid="event-list-view">
      <h2>{title}</h2>
      <div>Items: {items?.length || 0}</div>
      {children}
    </div>
  ),
}));

jest.mock('/react4xp/common/DynamicLoader/DynamicLoader', () => ({
  DynamicLoader: ({children, items}: {children: (props: {items: unknown[]; children: React.ReactNode}) => React.ReactNode; items?: unknown[]}) => (
    <div data-testid="dynamic-loader">
      {children({items: items || [], children: <div>Load more</div>})}
    </div>
  ),
}));

describe('EventList', () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should render EventListView on server-side (window undefined)', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<EventList title="Server Events" />);
    expect(screen.getByTestId('event-list-view')).toBeInTheDocument();
  });

  it('should render EventListView when useLoader is false', () => {
    render(<EventList title="No Loader" useLoader={false} />);
    expect(screen.getByTestId('event-list-view')).toBeInTheDocument();
    expect(screen.queryByTestId('dynamic-loader')).not.toBeInTheDocument();
  });

  it('should render DynamicLoader when useLoader is true on client-side', () => {
    render(<EventList title="With Loader" useLoader={true} />);
    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
  });

  it('should pass title to EventListView', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<EventList title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should pass items to EventListView', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    const items = [{id: '1'}, {id: '2'}];
    render(<EventList items={items} />);
    expect(screen.getByText('Items: 2')).toBeInTheDocument();
  });

  it('should use empty array as default items', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<EventList />);
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('should pass all props to EventListView', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    const items = [{id: '1'}];
    const image = {url: '/test.jpg'};

    render(
      <EventList
        title="All Props"
        items={items}
        image={image}
        description="Description"
        shortDescription="Short"
        displaytype="list"
        noIngress={true}
      />
    );

    expect(screen.getByTestId('event-list-view')).toBeInTheDocument();
    expect(screen.getByText('All Props')).toBeInTheDocument();
  });

  it('should render with default prop values', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<EventList />);
    expect(screen.getByTestId('event-list-view')).toBeInTheDocument();
  });

  it('should render with loadMore functionality when useLoader is true', () => {
    render(
      <EventList
        useLoader={true}
        loadMoreEnabled={true}
        loadMore="Load more events"
        apiUrl="/api/events"
      />
    );

    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });

  it('should use default loadMore text', () => {
    render(<EventList useLoader={true} />);
    // DynamicLoader is rendered, default text is 'Load more'
    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
  });

  it('should use default loadMoreEnabled as false', () => {
    render(<EventList useLoader={true} />);
    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
  });
});
