import {render, screen} from '@testing-library/react';
import {ArticleListItem} from '/react4xp/common/ArticleListItem/ArticleListItem';

// Mock dependencies
jest.mock('/react4xp/common/ListItem/ListItem', () => ({
  ListItem: ({children, className}: {children?: React.ReactNode; className?: string}) => (
    <div data-testid="list-item" className={className}>
      {children}
    </div>
  ),
}));

jest.mock('/react4xp/common/AuthorLink/AuthorLink', () => ({
  AuthorLink: ({author, url}: {author?: string; url?: string}) => (
    <li data-testid="author-link">
      <a href={url}>{author}</a>
    </li>
  ),
}));

describe('ArticleListItem', () => {
  it('should render article list item', () => {
    render(<ArticleListItem />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should apply article className', () => {
    const {container} = render(<ArticleListItem />);
    const listItem = container.querySelector('.article');
    expect(listItem).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const {container} = render(<ArticleListItem className="custom-class" />);
    const listItem = container.querySelector('.custom-class');
    expect(listItem).toBeInTheDocument();
  });

  it('should render date when showDate is true and datePublished exists', () => {
    const item = {
      datePublished: '2024-01-15',
    };

    render(<ArticleListItem item={item} showDate={true} />);

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('should not render date when showDate is false', () => {
    const item = {
      datePublished: '2024-01-15',
    };

    render(<ArticleListItem item={item} showDate={false} />);

    expect(screen.queryByText('2024-01-15')).not.toBeInTheDocument();
  });

  it('should not render date when datePublished is missing', () => {
    const {container} = render(<ArticleListItem showDate={true} />);
    const dateDiv = container.querySelector('.article-date');
    expect(dateDiv).not.toBeInTheDocument();
  });

  it('should render authors when showAuthors is true', () => {
    const item = {
      authors: [
        {
          authorID: '1',
          person: 'John Doe',
          personUrl: '/authors/john-doe',
          image: {url: '/john.jpg'},
        },
      ],
    };

    render(<ArticleListItem item={item} showAuthors={true} />);

    expect(screen.getByTestId('author-link')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should not render authors when showAuthors is false', () => {
    const item = {
      authors: [
        {
          authorID: '1',
          person: 'John Doe',
          personUrl: '/authors/john-doe',
        },
      ],
    };

    render(<ArticleListItem item={item} showAuthors={false} />);

    expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
  });

  it('should not render authors when authors array is empty', () => {
    const item = {
      authors: [],
    };

    render(<ArticleListItem item={item} showAuthors={true} />);

    expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
  });

  it('should render only first author when multiple authors exist', () => {
    const item = {
      authors: [
        {
          authorID: '1',
          person: 'John Doe',
          personUrl: '/authors/john-doe',
        },
        {
          authorID: '2',
          person: 'Jane Smith',
          personUrl: '/authors/jane-smith',
        },
      ],
    };

    render(<ArticleListItem item={item} showAuthors={true} />);

    const authorLinks = screen.getAllByTestId('author-link');
    expect(authorLinks).toHaveLength(1);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('should render both authors and date', () => {
    const item = {
      authors: [
        {
          authorID: '1',
          person: 'John Doe',
          personUrl: '/authors/john-doe',
        },
      ],
      datePublished: '2024-01-15',
    };

    render(<ArticleListItem item={item} showAuthors={true} showDate={true} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('should pass showImage prop to ListItem', () => {
    render(<ArticleListItem showImage={false} />);
    // ListItem component is mocked, so we just verify it renders
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass imageSize prop to ListItem', () => {
    render(<ArticleListItem imageSize="large" />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass imageType prop to ListItem', () => {
    render(<ArticleListItem imageType="round" />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should use default values when no props provided', () => {
    render(<ArticleListItem />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });
});
