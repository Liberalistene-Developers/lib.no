/**
 * Tests for Article component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Article} from '/react4xp/common/Article/Article';
import type {ImageData} from '/react4xp/common/types';

// Mock dependencies
jest.mock('/react4xp/common/ImageBlock/ImageBlock', () => ({
  ImageBlock: ({title, image, ingress, position}: {
    title: Array<{title: string; titleColor?: string}>;
    image?: ImageData;
    ingress?: string;
    position?: 'left' | 'center' | 'right';
  }) => (
    <div data-testid="image-block">
      {title && title.length > 0 && (
        <div data-testid="image-block-title">{title[0].title}</div>
      )}
      {image && <img src={image.url} alt={image.alternativeText || ''} />}
      {ingress && <div data-testid="image-block-ingress">{ingress}</div>}
      {position && <div data-testid="image-block-position">{position}</div>}
    </div>
  ),
}));

jest.mock('/react4xp/common/AuthorLink/AuthorLink', () => ({
  AuthorLink: ({author, url, image}: {
    author?: string;
    url?: string;
    image?: {url?: string};
  }) => (
    <li data-testid="author-link">
      {url ? <a href={url}>{author}</a> : author}
      {image?.url && <img src={image.url} alt="" />}
    </li>
  ),
}));

jest.mock('/react4xp/common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html, className}: {html: string; className?: string}) => (
    <div data-testid="safe-html" className={className}>
      {html}
    </div>
  ),
}));

describe('Article', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/article-image.jpg',
    displayName: 'Article Image',
    alternativeText: 'Article alt text',
  };

  const mockAuthors = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render with title in image by default', () => {
      render(<Article title="Test Article" />);

      expect(screen.getByTestId('image-block-title')).toHaveTextContent('Test Article');
      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
    });

    it('should render title as h1 when titleInImage is false', () => {
      render(<Article title="Article Title" titleInImage={false} />);

      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Article Title');
    });

    it('should render with empty title by default', () => {
      render(<Article />);

      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
    });

    it('should render ingress in image by default', () => {
      render(<Article ingress="Test ingress" />);

      expect(screen.getByTestId('image-block-ingress')).toHaveTextContent('Test ingress');
    });

    it('should render ingress as SafeHtml when ingressInImage is false', () => {
      render(<Article ingress="<p>Rich ingress</p>" ingressInImage={false} />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const ingressElement = safeHtmlElements.find((el) => el.textContent === '<p>Rich ingress</p>');
      expect(ingressElement).toBeInTheDocument();
      expect(ingressElement).toHaveClass('font-bold');
    });
  });

  describe('image rendering', () => {
    it('should render ImageBlock component', () => {
      render(<Article title="Article" image={mockImage} />);

      expect(screen.getByTestId('image-block')).toBeInTheDocument();
    });

    it('should pass image to ImageBlock', () => {
      render(<Article image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', mockImage.url);
    });

    it('should pass position to ImageBlock', () => {
      render(<Article headerPosition="center" />);

      expect(screen.getByTestId('image-block-position')).toHaveTextContent('center');
    });

    it('should pass title with color to ImageBlock', () => {
      render(<Article title="Colored Title" headerColor="#ff0000" titleInImage={true} />);

      expect(screen.getByTestId('image-block-title')).toHaveTextContent('Colored Title');
    });
  });

  describe('authors rendering', () => {
    it('should render authors list', () => {
      render(<Article authors={mockAuthors} />);

      const authorLinks = screen.getAllByTestId('author-link');
      expect(authorLinks).toHaveLength(2);
    });

    it('should render author names and links', () => {
      render(<Article authors={mockAuthors} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should not render authors when array is empty', () => {
      render(<Article authors={[]} />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should not render authors when not provided', () => {
      render(<Article />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should render authors with images', () => {
      render(<Article authors={mockAuthors} />);

      const authorLinks = screen.getAllByTestId('author-link');
      const firstAuthor = authorLinks[0];
      const authorImage = firstAuthor.querySelector('img');
      expect(authorImage).toHaveAttribute('src', 'https://example.com/john.jpg');
    });
  });

  describe('date rendering', () => {
    it('should render datePublished', () => {
      render(<Article datePublished="2025-10-18" />);

      expect(screen.getByText('2025-10-18')).toBeInTheDocument();
    });

    it('should not render date when not provided', () => {
      const {container} = render(<Article />);

      // Check the date container is empty
      const dateContainer = container.querySelector('.h-full.self-center.ml-auto.flex.items-center');
      expect(dateContainer).toHaveTextContent('');
    });
  });

  describe('text content rendering', () => {
    it('should render text using SafeHtml', () => {
      render(<Article text="<p>Article body</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const textElement = safeHtmlElements.find((el) => el.textContent === '<p>Article body</p>');
      expect(textElement).toBeInTheDocument();
    });

    it('should not render text when not provided', () => {
      render(<Article />);

      // Only the potential ingress SafeHtml might exist, not the text one
      const safeHtmlElements = screen.queryAllByTestId('safe-html');
      expect(safeHtmlElements.length).toBe(0);
    });

    it('should render both ingress and text when ingressInImage is false', () => {
      render(
        <Article
          ingress="<strong>Ingress text</strong>"
          text="<p>Body text</p>"
          ingressInImage={false}
        />
      );

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      expect(safeHtmlElements).toHaveLength(2);

      const ingressElement = safeHtmlElements.find((el) => el.textContent === '<strong>Ingress text</strong>');
      const textElement = safeHtmlElements.find((el) => el.textContent === '<p>Body text</p>');

      expect(ingressElement).toBeInTheDocument();
      expect(ingressElement).toHaveClass('font-bold');
      expect(textElement).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply wrapper classes', () => {
      const {container} = render(<Article />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
    });

    it('should apply page-content class to content area', () => {
      const {container} = render(<Article text="Content" />);

      const contentArea = container.querySelector('.page-content');
      expect(contentArea).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <Article
          title="Full Article"
          headerColor="#ff0000"
          headerPosition="center"
          titleInImage={false}
          image={mockImage}
          authors={mockAuthors}
          ingress="Article ingress"
          ingressInImage={false}
          text="<p>Article text</p>"
          datePublished="2025-10-18"
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Full Article');
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getAllByTestId('author-link')).toHaveLength(2);
      expect(screen.getByText('2025-10-18')).toBeInTheDocument();
      expect(screen.getAllByTestId('safe-html').length).toBeGreaterThan(0);
    });

    it('should render with minimal props', () => {
      const {container} = render(<Article />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByTestId('image-block')).toBeInTheDocument();
    });

    it('should handle undefined authors array', () => {
      render(<Article authors={undefined} />);

      expect(screen.queryByTestId('author-link')).not.toBeInTheDocument();
    });

    it('should handle empty strings for title and ingress', () => {
      render(<Article title="" ingress="" text="" />);

      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
      expect(screen.queryByTestId('image-block-ingress')).not.toBeInTheDocument();
    });
  });
});
