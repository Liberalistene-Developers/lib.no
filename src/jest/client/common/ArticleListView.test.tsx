import {render, screen} from '@testing-library/react';
import {ArticleListView} from '/react4xp/common/ArticleListView/ArticleListView';

// Mock dependencies
jest.mock('/react4xp/common/Image/Image', () => ({
  Image: ({image}: {image?: {url?: string}}) =>
    image?.url ? <img src={image.url} alt="Article" /> : null,
}));

jest.mock('/react4xp/common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html}: {html: string}) => <div data-testid="safe-html">{html.replace(/<[^>]*>/g, '')}</div>,
}));

jest.mock('/react4xp/common/ArticleListItem/ArticleListItem', () => ({
  ArticleListItem: ({item}: {item?: {id?: string; title?: string}}) => (
    <div data-testid="article-list-item">{item?.title}</div>
  ),
}));

jest.mock('/react4xp/common/ArticleCard/ArticleCard', () => ({
  ArticleCard: ({item}: {item?: {id?: string; title?: string}}) => (
    <div data-testid="article-card">{item?.title}</div>
  ),
}));

describe('ArticleListView', () => {
  it('should render without props', () => {
    const {container} = render(<ArticleListView />);
    expect(container.querySelector('.article-list-holder')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<ArticleListView title="Latest Articles" />);
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    const {container} = render(<ArticleListView />);
    const titleDiv = container.querySelector('.article-list-title');
    expect(titleDiv).not.toBeInTheDocument();
  });

  it('should render image when provided', () => {
    const image = {url: '/article-image.jpg'};
    render(<ArticleListView image={image} />);
    expect(screen.getByAltText('Article')).toBeInTheDocument();
  });

  it('should render shortDescription when provided', () => {
    render(<ArticleListView shortDescription="<p>Short description</p>" />);
    expect(screen.getByText('Short description')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<ArticleListView description="<p>Full description</p>" />);
    expect(screen.getByText('Full description')).toBeInTheDocument();
  });

  it('should render both shortDescription and description', () => {
    render(
      <ArticleListView
        shortDescription="<p>Short</p>"
        description="<p>Full</p>"
      />
    );
    expect(screen.getByText('Short')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
  });

  it('should render items as ArticleCard in grid mode (default)', () => {
    const items = [
      {id: '1', title: 'Article 1'},
      {id: '2', title: 'Article 2'},
    ];

    render(<ArticleListView items={items} />);

    const cards = screen.getAllByTestId('article-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
  });

  it('should render items as ArticleListItem in list mode', () => {
    const items = [
      {id: '1', title: 'Article 1'},
      {id: '2', title: 'Article 2'},
    ];

    render(<ArticleListView items={items} displaytype="list" />);

    const listItems = screen.getAllByTestId('article-list-item');
    expect(listItems).toHaveLength(2);
    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
  });

  it('should apply grid className to article list', () => {
    const items = [{id: '1'}];
    const {container} = render(<ArticleListView items={items} displaytype="grid" />);

    const articleList = container.querySelector('.article-list.grid');
    expect(articleList).toBeInTheDocument();
  });

  it('should apply list className to article list', () => {
    const items = [{id: '1'}];
    const {container} = render(<ArticleListView items={items} displaytype="list" />);

    const articleList = container.querySelector('.article-list.list');
    expect(articleList).toBeInTheDocument();
  });

  it('should not render article list when items is empty', () => {
    const {container} = render(<ArticleListView items={[]} />);
    const articleList = container.querySelector('.article-list');
    expect(articleList).not.toBeInTheDocument();
  });

  it('should not render article list when items is undefined', () => {
    const {container} = render(<ArticleListView />);
    const articleList = container.querySelector('.article-list');
    expect(articleList).not.toBeInTheDocument();
  });

  it('should render children when provided', () => {
    render(
      <ArticleListView>
        <div>Custom children</div>
      </ArticleListView>
    );
    expect(screen.getByText('Custom children')).toBeInTheDocument();
  });

  it('should use default values for optional props', () => {
    const {container} = render(<ArticleListView />);
    expect(container.querySelector('.article-list-holder')).toBeInTheDocument();
  });

  it('should handle featured configuration', () => {
    const items = [{id: '1', title: 'Featured Article'}];
    const featured = {
      '1': {
        style: 'left',
        showDate: true,
      },
    };

    render(<ArticleListView items={items} featured={featured} />);
    expect(screen.getByText('Featured Article')).toBeInTheDocument();
  });

  it('should render complete article list with all elements', () => {
    const items = [
      {id: '1', title: 'Article 1'},
      {id: '2', title: 'Article 2'},
    ];
    const image = {url: '/header.jpg'};

    render(
      <ArticleListView
        title="Latest Articles"
        image={image}
        shortDescription="<p>Short description</p>"
        description="<p>Full description</p>"
        items={items}
        displaytype="grid"
      >
        <div>Load more button</div>
      </ArticleListView>
    );

    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
    expect(screen.getByAltText('Article')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Full description')).toBeInTheDocument();
    expect(screen.getByText('Article 1')).toBeInTheDocument();
    expect(screen.getByText('Article 2')).toBeInTheDocument();
    expect(screen.getByText('Load more button')).toBeInTheDocument();
  });
});
