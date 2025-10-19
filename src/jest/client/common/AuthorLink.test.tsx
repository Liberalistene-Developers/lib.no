/**
 * Tests for AuthorLink component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {AuthorLink} from '@common/AuthorLink/AuthorLink';
import type {ImageData} from '@common/types';

// Mock dependencies
jest.mock('@common/Image/Image', () => ({
  Image: ({
    image,
    className,
    imageClassName,
  }: {
    image?: ImageData;
    className?: string;
    imageClassName?: string;
  }) => (
    image ? (
      <img
        src={image.url}
        alt={image.alternativeText || ''}
        className={`${className} ${imageClassName || ''}`}
        data-testid="author-image"
      />
    ) : null
  ),
}));

describe('AuthorLink', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/author.jpg',
    displayName: 'Author Image',
    alternativeText: 'Author photo',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render as list item', () => {
      render(<AuthorLink author="John Doe" url="/author/john" />);

      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });

    it('should render link with href', () => {
      render(<AuthorLink author="John Doe" url="/author/john" />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/author/john');
    });

    it('should render author name', () => {
      render(<AuthorLink author="John Doe" url="/author/john" />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should render author name in span', () => {
      const {container} = render(<AuthorLink author="Jane Smith" url="/author/jane" />);

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Jane Smith');
    });
  });

  describe('image rendering', () => {
    it('should render Image component when image is provided', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={mockImage} />);

      expect(screen.getByTestId('author-image')).toBeInTheDocument();
    });

    it('should pass image to Image component', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={mockImage} />);

      const img = screen.getByTestId('author-image');
      expect(img).toHaveAttribute('src', 'https://example.com/author.jpg');
    });

    it('should pass extra-small className to Image', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={mockImage} />);

      const img = screen.getByTestId('author-image');
      expect(img).toHaveClass('extra-small');
    });

    it('should pass round imageClassName to Image', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={mockImage} />);

      const img = screen.getByTestId('author-image');
      expect(img).toHaveClass('round');
    });

    it('should not render image when not provided', () => {
      render(<AuthorLink author="John Doe" url="/author/john" />);

      expect(screen.queryByTestId('author-image')).not.toBeInTheDocument();
    });

    it('should not render image when undefined', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={undefined} />);

      expect(screen.queryByTestId('author-image')).not.toBeInTheDocument();
    });
  });

  describe('link structure', () => {
    it('should contain image inside link', () => {
      render(<AuthorLink author="John Doe" url="/author/john" image={mockImage} />);

      const link = screen.getByRole('link');
      const img = screen.getByTestId('author-image');
      expect(link).toContainElement(img);
    });

    it('should contain author name inside link', () => {
      render(<AuthorLink author="Jane Smith" url="/author/jane" />);

      const link = screen.getByRole('link');
      const authorName = screen.getByText('Jane Smith');
      expect(link).toContainElement(authorName);
    });

    it('should wrap link in div', () => {
      render(<AuthorLink author="John Doe" url="/author/john" />);

      const link = screen.getByRole('link');
      const div = link.parentElement;
      expect(div?.tagName).toBe('DIV');
    });

    it('should wrap div in list item', () => {
      const {container} = render(<AuthorLink author="John Doe" url="/author/john" />);

      const listItem = screen.getByRole('listitem');
      const div = container.querySelector('div');
      expect(listItem).toContainElement(div!);
    });
  });

  describe('url handling', () => {
    it('should render link with url', () => {
      render(<AuthorLink author="John Doe" url="/authors/john-doe" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/authors/john-doe');
    });

    it('should render link element when url not provided', () => {
      const {container} = render(<AuthorLink author="John Doe" />);

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      // Without href, it won't have role="link"
    });

    it('should render link element with undefined url', () => {
      const {container} = render(<AuthorLink author="John Doe" url={undefined} />);

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      // Without href, it won't have role="link"
    });

    it('should handle absolute URLs', () => {
      render(<AuthorLink author="External Author" url="https://example.com/author" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com/author');
    });
  });

  describe('author name handling', () => {
    it('should render author name', () => {
      render(<AuthorLink author="Jane Smith" url="/author/jane" />);

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should render empty when author is not provided', () => {
      const {container} = render(<AuthorLink url="/author/unknown" />);

      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('');
    });

    it('should render empty when author is empty string', () => {
      const {container} = render(<AuthorLink author="" url="/author/unknown" />);

      const span = container.querySelector('span');
      expect(span).toHaveTextContent('');
    });

    it('should handle author names with special characters', () => {
      render(<AuthorLink author="O'Brien & Associates" url="/author/obrien" />);

      expect(screen.getByText("O'Brien & Associates")).toBeInTheDocument();
    });

    it('should handle long author names', () => {
      const longName = 'Dr. Professor John William Smith-Johnson III, PhD, MD';
      render(<AuthorLink author={longName} url="/author/john" />);

      expect(screen.getByText(longName)).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <AuthorLink
          author="Complete Author"
          url="/author/complete"
          image={mockImage}
        />
      );

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/author/complete');
      expect(screen.getByText('Complete Author')).toBeInTheDocument();
      expect(screen.getByTestId('author-image')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      const {container} = render(<AuthorLink />);

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
    });

    it('should render without image but with author and url', () => {
      render(<AuthorLink author="No Image Author" url="/author/no-image" />);

      expect(screen.getByText('No Image Author')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/author/no-image');
      expect(screen.queryByTestId('author-image')).not.toBeInTheDocument();
    });

    it('should render with image but without author name', () => {
      render(<AuthorLink url="/author/anonymous" image={mockImage} />);

      expect(screen.getByTestId('author-image')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/author/anonymous');
    });

    it('should handle undefined for all props', () => {
      const {container} = render(
        <AuthorLink
          author={undefined}
          url={undefined}
          image={undefined}
        />
      );

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
    });
  });
});
