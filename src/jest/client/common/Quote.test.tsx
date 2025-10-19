/**
 * Tests for Quote component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Quote} from '@common/Quote/Quote';
import type {ImageData} from '@common/types';

// Mock dependencies
jest.mock('@common/Image/Image', () => ({
  Image: ({image}: {image?: ImageData}) => (
    image ? <img src={image.url} alt={image.alternativeText || ''} data-testid="quote-image" /> : null
  ),
}));

jest.mock('@common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html}: {html: string}) => (
    <div data-testid="safe-html">{html}</div>
  ),
}));

describe('Quote', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/quote-image.jpg',
    displayName: 'Quote Image',
    alternativeText: 'Quote alt text',
  };

  const mockAuthors = [
    {
      authorID: 'author-1',
      person: 'John Doe',
      personUrl: '/person/john-doe',
      image: 'https://example.com/john.jpg',
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
    it('should render with title', () => {
      render(<Quote title="Famous Quote" />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toHaveTextContent('Famous Quote');
      expect(heading).toHaveAttribute('title', 'Famous Quote');
    });

    it('should render with empty title by default', () => {
      render(<Quote />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toHaveTextContent('');
    });

    it('should render without title', () => {
      render(<Quote title={undefined} />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
    });
  });

  describe('image rendering', () => {
    it('should render image when provided', () => {
      render(<Quote title="Quote" image={mockImage} />);

      const img = screen.getByTestId('quote-image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockImage.url);
    });

    it('should not render image when not provided', () => {
      render(<Quote title="Quote" />);

      expect(screen.queryByTestId('quote-image')).not.toBeInTheDocument();
    });
  });

  describe('authors rendering', () => {
    it('should render authors list', () => {
      render(<Quote title="Quote" authors={mockAuthors} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('should render author names and links', () => {
      render(<Quote title="Quote" authors={mockAuthors} />);

      const johnLink = screen.getByRole('link', {name: /John Doe/});
      expect(johnLink).toHaveAttribute('href', '/person/john-doe');

      const janeLink = screen.getByRole('link', {name: /Jane Smith/});
      expect(janeLink).toHaveAttribute('href', '/person/jane-smith');
    });

    it('should render author images when provided', () => {
      render(<Quote title="Quote" authors={mockAuthors} />);

      const images = screen.getAllByRole('img');
      const johnImage = images.find((img) => img.getAttribute('src') === 'https://example.com/john.jpg');
      expect(johnImage).toBeInTheDocument();
      expect(johnImage).toHaveAttribute('alt', 'John Doe');
    });

    it('should not render image for author without image', () => {
      render(<Quote title="Quote" authors={[mockAuthors[1]]} />);

      // Only check within the author link, not the main quote image
      const link = screen.getByRole('link', {name: /Jane Smith/});
      const imgInLink = link.querySelector('img');
      expect(imgInLink).not.toBeInTheDocument();
    });

    it('should not render authors when array is empty', () => {
      render(<Quote title="Quote" authors={[]} />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should not render authors when not provided', () => {
      render(<Quote title="Quote" />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should not render authors when undefined', () => {
      render(<Quote title="Quote" authors={undefined} />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('quote text rendering', () => {
    it('should render quote text using SafeHtml', () => {
      render(<Quote title="Quote" quote="<p>This is a quote</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const quoteElement = safeHtmlElements.find((el) => el.textContent === '<p>This is a quote</p>');
      expect(quoteElement).toBeInTheDocument();
    });

    it('should not render quote when empty', () => {
      render(<Quote title="Quote" quote="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render quote when not provided', () => {
      render(<Quote title="Quote" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });
  });

  describe('legacy qoute field support', () => {
    it('should render using legacy qoute field when quote is not provided', () => {
      render(<Quote title="Quote" qoute="<p>Legacy quote text</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const quoteElement = safeHtmlElements.find((el) => el.textContent === '<p>Legacy quote text</p>');
      expect(quoteElement).toBeInTheDocument();
    });

    it('should prefer quote over qoute when both provided', () => {
      render(<Quote title="Quote" quote="<p>New quote</p>" qoute="<p>Old quote</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const newQuote = safeHtmlElements.find((el) => el.textContent === '<p>New quote</p>');
      const oldQuote = safeHtmlElements.find((el) => el.textContent === '<p>Old quote</p>');

      expect(newQuote).toBeInTheDocument();
      expect(oldQuote).toBeUndefined();
    });

    it('should not render when both quote and qoute are empty', () => {
      render(<Quote title="Quote" quote="" qoute="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });
  });

  describe('description rendering', () => {
    it('should render description using SafeHtml', () => {
      render(<Quote title="Quote" description="<p>Quote description</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const descElement = safeHtmlElements.find((el) => el.textContent === '<p>Quote description</p>');
      expect(descElement).toBeInTheDocument();
    });

    it('should not render description when empty', () => {
      render(<Quote title="Quote" description="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      render(<Quote title="Quote" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render both quote and description', () => {
      render(
        <Quote
          title="Quote"
          quote="<p>Quote text</p>"
          description="<p>Description text</p>"
        />
      );

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      expect(safeHtmlElements).toHaveLength(2);

      const quoteElement = safeHtmlElements.find((el) => el.textContent === '<p>Quote text</p>');
      const descElement = safeHtmlElements.find((el) => el.textContent === '<p>Description text</p>');

      expect(quoteElement).toBeInTheDocument();
      expect(descElement).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <Quote
          title="Famous Quote"
          image={mockImage}
          authors={mockAuthors}
          quote="<p>Quote text</p>"
          description="<p>Quote description</p>"
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Famous Quote');
      expect(screen.getByTestId('quote-image')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
      expect(screen.getAllByTestId('safe-html')).toHaveLength(2);
    });

    it('should render with minimal props', () => {
      const {container} = render(<Quote />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    });

    it('should handle undefined image', () => {
      render(<Quote title="Quote" image={undefined} />);

      expect(screen.queryByTestId('quote-image')).not.toBeInTheDocument();
    });

    it('should handle all empty strings', () => {
      render(
        <Quote
          title=""
          quote=""
          qoute=""
          description=""
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('');
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should handle single author', () => {
      render(<Quote title="Quote" authors={[mockAuthors[0]]} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByRole('link', {name: /John Doe/})).toBeInTheDocument();
    });
  });
});
