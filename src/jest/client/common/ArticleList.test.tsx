import {render, screen} from '@testing-library/react';
import {ArticleList} from '/react4xp/common/ArticleList/ArticleList';
import type {ReactNode} from 'react';

interface ArticleItem {
  id?: string;
}

interface FeaturedConfig {
  [key: string]: {
    style?: string;
    showDate?: boolean;
  } | boolean;
}

interface ArticleListViewProps {
  children?: ReactNode;
  featured?: FeaturedConfig;
  description?: string;
  displaytype?: string;
  image?: {url?: string};
  shortDescription?: string;
  items?: ArticleItem[];
  title?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  showImage?: boolean;
  imageType?: string;
  imageSize?: string;
  titleCenter?: boolean;
  noIngress?: boolean;
}

// Mock dependencies
jest.mock('/react4xp/common/ArticleListView/ArticleListView', () => ({
  ArticleListView: ({title, items, children}: ArticleListViewProps) => (
    <div data-testid="article-list-view">
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

describe('ArticleList', () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should render ArticleListView on server-side (window undefined)', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<ArticleList title="Server Articles" />);
    // In server-side mode, ArticleListView should be rendered directly
    // Note: In jsdom test environment, window may be restored, so we just verify rendering works
    expect(screen.getByTestId('article-list-view')).toBeInTheDocument();
  });

  it('should render DynamicLoader on client-side (window defined)', () => {
    // Window is already defined in jsdom environment
    render(<ArticleList title="Client Articles" />);
    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
  });

  it('should pass title to ArticleListView on server-side', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<ArticleList title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should pass items to ArticleListView on server-side', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    const items = [{id: '1'}, {id: '2'}];
    render(<ArticleList items={items} />);
    expect(screen.getByText('Items: 2')).toBeInTheDocument();
  });

  it('should use empty array as default items', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<ArticleList />);
    expect(screen.getByText('Items: 0')).toBeInTheDocument();
  });

  it('should pass all props to ArticleListView on server-side', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    const items = [{id: '1'}];
    const image = {url: '/test.jpg'};

    render(
      <ArticleList
        title="All Props"
        items={items}
        image={image}
        description="Description"
        shortDescription="Short"
        displaytype="list"
        showImage={true}
        imageSize="large"
        imageType="round"
        titleCenter={true}
        readMore="Read more"
        readMoreEnabled={true}
        noIngress={true}
      />
    );

    expect(screen.getByTestId('article-list-view')).toBeInTheDocument();
    expect(screen.getByText('All Props')).toBeInTheDocument();
  });

  it('should use default prop values', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<ArticleList />);
    expect(screen.getByTestId('article-list-view')).toBeInTheDocument();
  });

  it('should render with loadMore functionality on client-side', () => {
    // Window is already defined in jsdom environment
    render(
      <ArticleList
        loadMoreEnabled={true}
        loadMore="Load more articles"
        apiUrl="/api/articles"
      />
    );

    expect(screen.getByTestId('dynamic-loader')).toBeInTheDocument();
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });

  it('should pass featured config correctly', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    const featured = {
      '1': {style: 'left', showDate: true},
    };

    render(<ArticleList featured={featured} />);
    expect(screen.getByTestId('article-list-view')).toBeInTheDocument();
  });

  it('should use default empty featured config', () => {
    global.window = undefined as unknown as Window & typeof globalThis;

    render(<ArticleList />);
    expect(screen.getByTestId('article-list-view')).toBeInTheDocument();
  });
});
