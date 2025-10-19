/**
 * Tests for ArticleCard component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {ArticleCard} from '@common/ArticleCard/ArticleCard';
import type {ItemData} from '@common/types';

// Mock dependencies
jest.mock('@common/GridItem/GridItem', () => ({
  GridItem: ({
    children,
    className,
    imageSize,
    imageType,
    presentation,
    direction,
    titleCenter,
    item,
    noIngress,
    readMore,
    readMoreEnabled,
  }: {
    children?: React.ReactNode;
    className?: string;
    imageSize?: string;
    imageType?: string;
    presentation?: boolean;
    direction?: string;
    titleCenter?: boolean;
    showImage?: boolean;
    item?: ItemData;
    noIngress?: boolean;
    childrenLast?: boolean;
    readMore?: string;
    readMoreEnabled?: boolean;
  }) => (
    <div data-testid="grid-item" className={className}>
      {item?.name && <h3>{item.name}</h3>}
      {item?.shortDescription && !noIngress && <p>{item.shortDescription}</p>}
      {imageSize && <div data-testid="image-size">{imageSize}</div>}
      {imageType && <div data-testid="image-type">{imageType}</div>}
      {presentation && <div data-testid="presentation">true</div>}
      {direction && <div data-testid="direction">{direction}</div>}
      {titleCenter && <div data-testid="title-center">true</div>}
      {readMore && <div data-testid="read-more">{readMore}</div>}
      {readMoreEnabled && <div data-testid="read-more-enabled">true</div>}
      {children}
    </div>
  ),
}));

jest.mock('@common/AuthorLink/AuthorLink', () => ({
  AuthorLink: ({author, url, image}: {author?: string; url?: string; image?: unknown}) => (
    <li data-testid="author-link">
      <a href={url}>{author}</a>
      {image && <span data-testid="author-image">has-image</span>}
    </li>
  ),
}));

describe('ArticleCard', () => {
  const mockItem: ItemData = {
    id: '1',
    name: 'Test Article',
    shortDescription: 'Article description',
    url: '/article/test',
    datePublished: '2025-10-18',
    image: {
      url: 'https://example.com/image.jpg',
      displayName: 'Article Image',
    },
    authors: [
      {
        authorID: 'author-1',
        person: 'John Doe',
        personUrl: '/person/john-doe',
        image: {url: 'https://example.com/john.jpg'},
      },
      {
        authorID: 'author-2',
        person: 'Jane Smith',
        personUrl: '/person/jane-smith',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render GridItem wrapper', () => {
      render(<ArticleCard item={mockItem} />);

      expect(screen.getByTestId('grid-item')).toBeInTheDocument();
    });

    it('should pass className to GridItem', () => {
      render(<ArticleCard item={mockItem} className="custom-class" />);

      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('custom-class');
    });

    it('should render with empty item by default', () => {
      render(<ArticleCard />);

      expect(screen.getByTestId('grid-item')).toBeInTheDocument();
    });
  });

  describe('image configuration', () => {
    it('should pass empty string to GridItem when imageSize is full', () => {
      render(<ArticleCard item={mockItem} imageSize="full" />);

      expect(screen.queryByTestId('image-size')).not.toBeInTheDocument();
    });

    it('should pass imageSize to GridItem when not full', () => {
      render(<ArticleCard item={mockItem} imageSize="small" />);

      expect(screen.getByTestId('image-size')).toHaveTextContent('small');
    });

    it('should pass medium imageSize to GridItem', () => {
      render(<ArticleCard item={mockItem} imageSize="medium" />);

      expect(screen.getByTestId('image-size')).toHaveTextContent('medium');
    });

    it('should pass large imageSize to GridItem', () => {
      render(<ArticleCard item={mockItem} imageSize="large" />);

      expect(screen.getByTestId('image-size')).toHaveTextContent('large');
    });

    it('should pass imageType to GridItem', () => {
      render(<ArticleCard item={mockItem} imageType="round" />);

      expect(screen.getByTestId('image-type')).toHaveTextContent('round');
    });

    it('should not pass imageType when empty string', () => {
      render(<ArticleCard item={mockItem} imageType="" />);

      expect(screen.queryByTestId('image-type')).not.toBeInTheDocument();
    });
  });

  describe('presentation and layout', () => {
    it('should pass presentation prop to GridItem', () => {
      render(<ArticleCard item={mockItem} presentation={true} />);

      expect(screen.getByTestId('presentation')).toBeInTheDocument();
    });

    it('should not show presentation when false', () => {
      render(<ArticleCard item={mockItem} presentation={false} />);

      expect(screen.queryByTestId('presentation')).not.toBeInTheDocument();
    });

    it('should pass direction prop to GridItem', () => {
      render(<ArticleCard item={mockItem} direction="left" />);

      expect(screen.getByTestId('direction')).toHaveTextContent('left');
    });

    it('should pass right direction to GridItem', () => {
      render(<ArticleCard item={mockItem} direction="right" />);

      expect(screen.getByTestId('direction')).toHaveTextContent('right');
    });

    it('should pass titleCenter prop to GridItem', () => {
      render(<ArticleCard item={mockItem} titleCenter={true} />);

      expect(screen.getByTestId('title-center')).toBeInTheDocument();
    });

    it('should not show titleCenter when false', () => {
      render(<ArticleCard item={mockItem} titleCenter={false} />);

      expect(screen.queryByTestId('title-center')).not.toBeInTheDocument();
    });
  });

  describe('authors rendering', () => {
    it('should render first author when showAuthors is true', () => {
      render(<ArticleCard item={mockItem} showAuthors={true} />);

      expect(screen.getByTestId('author-link')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render only first author even with multiple authors', () => {
      render(<ArticleCard item={mockItem} showAuthors={true} />);

      const authorLinks = screen.queryAllByTestId('author-link');
      expect(authorLinks).toHaveLength(1);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('should not render authors when showAuthors is false', () => {
      render(<ArticleCard item={mockItem} showAuthors={false} />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should not render authors when authors array is empty', () => {
      const itemWithoutAuthors = {...mockItem, authors: []};
      render(<ArticleCard item={itemWithoutAuthors} showAuthors={true} />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should not render authors when authors is undefined', () => {
      const itemWithoutAuthors = {...mockItem, authors: undefined};
      render(<ArticleCard item={itemWithoutAuthors} showAuthors={true} />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should render authors list with proper class', () => {
      const {container} = render(<ArticleCard item={mockItem} showAuthors={true} />);

      const authorsList = container.querySelector('.authors');
      expect(authorsList).toBeInTheDocument();
    });
  });

  describe('date rendering', () => {
    it('should render date when showDate is true', () => {
      render(<ArticleCard item={mockItem} showDate={true} />);

      expect(screen.getByText('2025-10-18')).toBeInTheDocument();
    });

    it('should not render date when showDate is false', () => {
      render(<ArticleCard item={mockItem} showDate={false} />);

      expect(screen.queryByText('2025-10-18')).not.toBeInTheDocument();
    });

    it('should not render date when datePublished is not provided', () => {
      const itemWithoutDate = {...mockItem, datePublished: undefined};
      render(<ArticleCard item={itemWithoutDate} showDate={true} />);

      expect(screen.queryByText('2025-10-18')).not.toBeInTheDocument();
    });

    it('should render date with article-date class', () => {
      const {container} = render(<ArticleCard item={mockItem} showDate={true} />);

      const dateElement = container.querySelector('.article-date');
      expect(dateElement).toBeInTheDocument();
      expect(dateElement).toHaveTextContent('2025-10-18');
    });
  });

  describe('read more functionality', () => {
    it('should pass readMore to GridItem', () => {
      render(<ArticleCard item={mockItem} readMore="Read article" />);

      expect(screen.getByTestId('read-more')).toHaveTextContent('Read article');
    });

    it('should pass readMoreEnabled to GridItem', () => {
      render(<ArticleCard item={mockItem} readMoreEnabled={true} />);

      expect(screen.getByTestId('read-more-enabled')).toBeInTheDocument();
    });

    it('should not show readMoreEnabled when false', () => {
      render(<ArticleCard item={mockItem} readMoreEnabled={false} />);

      expect(screen.queryByTestId('read-more-enabled')).not.toBeInTheDocument();
    });
  });

  describe('ingress control', () => {
    it('should pass noIngress to GridItem', () => {
      render(<ArticleCard item={mockItem} noIngress={true} />);

      // When noIngress is true, short description should not be shown
      expect(screen.queryByText('Article description')).not.toBeInTheDocument();
    });

    it('should show ingress when noIngress is false', () => {
      render(<ArticleCard item={mockItem} noIngress={false} />);

      expect(screen.getByText('Article description')).toBeInTheDocument();
    });
  });

  describe('article-creds wrapper', () => {
    it('should render article-creds wrapper', () => {
      const {container} = render(<ArticleCard item={mockItem} />);

      const credsWrapper = container.querySelector('.article-creds');
      expect(credsWrapper).toBeInTheDocument();
    });

    it('should render both authors and date in article-creds', () => {
      const {container} = render(<ArticleCard item={mockItem} showAuthors={true} showDate={true} />);

      const credsWrapper = container.querySelector('.article-creds');
      expect(credsWrapper).toBeInTheDocument();
      expect(credsWrapper?.querySelector('.authors')).toBeInTheDocument();
      expect(credsWrapper?.querySelector('.article-date')).toBeInTheDocument();
    });

    it('should render empty article-creds when both showAuthors and showDate are false', () => {
      const {container} = render(<ArticleCard item={mockItem} showAuthors={false} showDate={false} />);

      const credsWrapper = container.querySelector('.article-creds');
      expect(credsWrapper).toBeInTheDocument();
      expect(credsWrapper?.querySelector('.authors')).not.toBeInTheDocument();
      expect(credsWrapper?.querySelector('.article-date')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <ArticleCard
          item={mockItem}
          className="custom-class"
          direction="left"
          imageSize="medium"
          imageType="round"
          noIngress={false}
          presentation={true}
          readMore="Read more"
          readMoreEnabled={true}
          showAuthors={true}
          showDate={true}
          titleCenter={true}
        />
      );

      expect(screen.getByTestId('grid-item')).toBeInTheDocument();
      expect(screen.getByTestId('author-link')).toBeInTheDocument();
      expect(screen.getByText('2025-10-18')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      render(<ArticleCard />);

      expect(screen.getByTestId('grid-item')).toBeInTheDocument();
      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should handle item with only some fields', () => {
      const partialItem: ItemData = {
        name: 'Partial Article',
        url: '/article',
      };

      render(<ArticleCard item={partialItem} />);

      expect(screen.getByTestId('grid-item')).toBeInTheDocument();
      expect(screen.getByText('Partial Article')).toBeInTheDocument();
    });

    it('should default showAuthors and showDate to true', () => {
      render(<ArticleCard item={mockItem} />);

      expect(screen.getByTestId('author-link')).toBeInTheDocument();
      expect(screen.getByText('2025-10-18')).toBeInTheDocument();
    });

    it('should default imageSize to full', () => {
      render(<ArticleCard item={mockItem} />);

      // When imageSize is 'full', it should pass empty string to GridItem
      expect(screen.queryByTestId('image-size')).not.toBeInTheDocument();
    });

    it('should default noIngress to false', () => {
      render(<ArticleCard item={mockItem} />);

      expect(screen.getByText('Article description')).toBeInTheDocument();
    });
  });
});
