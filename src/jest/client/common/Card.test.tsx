/**
 * Tests for Card component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Card} from '/react4xp/common/Card/Card';
import {getImageAlt} from '@utils/image.client';
import type {ImageData} from '/react4xp/common/types';

// Mock dependencies
jest.mock('@utils/image.client', () => ({
  getImageAlt: jest.fn((image, fallback) => {
    if (!image) return fallback || '';
    return image.alternativeText || image.displayName || fallback || '';
  }),
}));

jest.mock('/react4xp/common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html}: {html: string}) => <div data-testid="safe-html">{html}</div>,
}));

describe('Card', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/card-image.jpg',
    displayName: 'Card Image',
    alternativeText: 'Card alt text',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render with title', () => {
      render(<Card title="Test Card" />);

      expect(screen.getByText('Test Card')).toBeInTheDocument();
    });

    it('should render with title and url', () => {
      render(<Card title="Linked Card" url="/card-link" />);

      const links = screen.getAllByRole('link', {name: 'Linked Card'});
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', '/card-link');
      });
    });

    it('should render text using SafeHtml by default', () => {
      render(<Card title="Card" text="<p>Card text</p>" />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Card text</p>');
    });

    it('should not render text when noIngress is true', () => {
      render(<Card title="Card" text="Some text" noIngress={true} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render SafeHtml when text is empty', () => {
      render(<Card title="Card" text="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render SafeHtml when text is not provided', () => {
      render(<Card title="Card" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });
  });

  describe('image rendering', () => {
    it('should render image when provided', () => {
      render(<Card title="Card" image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockImage.url);
    });

    it('should not render image when not provided', () => {
      render(<Card title="Card" />);

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should not render image when null', () => {
      render(<Card title="Card" image={null} />);

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should wrap image in link with url and title', () => {
      render(<Card title="Card Title" url="/link" image={mockImage} />);

      const img = screen.getByRole('img');
      const imageLink = img.closest('a');
      expect(imageLink).toHaveAttribute('href', '/link');
      expect(imageLink).toHaveAttribute('title', 'Card Title');
    });

    it('should call getImageAlt with image and title', () => {
      render(<Card title="Card Title" image={mockImage} />);

      expect(getImageAlt).toHaveBeenCalledWith(mockImage, 'Card Title');
    });

    it('should use alt text from getImageAlt', () => {
      (getImageAlt as jest.Mock).mockReturnValue('Generated alt text');

      render(<Card title="Card" image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Generated alt text');
    });

    it('should apply rounded-t class to image', () => {
      render(<Card title="Card" image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toHaveClass('rounded-t-[3px]');
      expect(img).toHaveClass('w-full');
    });
  });

  describe('children rendering', () => {
    it('should not render children when image is not provided', () => {
      render(
        <Card title="Card">
          <div data-testid="child-content">Child content</div>
        </Card>
      );

      // Children should not be rendered when there's no image
      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    });

    it('should render children when image is provided', () => {
      render(
        <Card title="Card" image={mockImage}>
          <div data-testid="child-content">Child content</div>
        </Card>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('should render children below the image', () => {
      render(
        <Card title="Card" image={mockImage}>
          <div data-testid="child-content">Child content</div>
        </Card>
      );

      const img = screen.getByRole('img');
      const child = screen.getByTestId('child-content');

      // Image is in <a>, child is sibling to the <a>, both in same parent div
      const imageLink = img.parentElement;
      expect(imageLink?.tagName).toBe('A');
      expect(imageLink?.parentElement).toBe(child.parentElement);
    });
  });

  describe('styling', () => {
    it('should apply card wrapper classes', () => {
      const {container} = render(<Card title="Card" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('bg-white');
      expect(wrapper).toHaveClass('rounded-[3px]');
      expect(wrapper).toHaveClass('w-full');
    });

    it('should apply shadow to card', () => {
      const {container} = render(<Card title="Card" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('shadow-[0px_1px_40px_3px_rgba(74,16,74,0.11)]');
    });

    it('should apply proper classes to title heading', () => {
      render(<Card title="Styled Title" />);

      const heading = screen.getByRole('heading', {level: 3});
      expect(heading).toHaveClass('text-primary-700');
      expect(heading).toHaveClass('text-[24px]');
      expect(heading).toHaveClass('mb-[5px]');
      expect(heading).toHaveClass('-mt-5');
    });

    it('should apply padding to content area', () => {
      const {container} = render(<Card title="Card" />);

      const contentArea = container.querySelector('.p-\\[15px\\]');
      expect(contentArea).toBeInTheDocument();
    });
  });

  describe('title link', () => {
    it('should render title as link when url provided', () => {
      render(<Card title="Linked Title" url="/some-url" />);

      const titleLink = screen.getByRole('link', {name: 'Linked Title'});
      expect(titleLink).toHaveAttribute('href', '/some-url');
      expect(titleLink).toHaveAttribute('title', 'Linked Title');
    });

    it('should render title in h3 heading', () => {
      render(<Card title="Heading Title" />);

      const heading = screen.getByRole('heading', {level: 3});
      expect(heading).toContainHTML('Heading Title');
    });

    it('should have empty href when url is empty string', () => {
      const {container} = render(<Card title="Title" url="" />);

      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '');
      expect(link).toHaveAttribute('title', 'Title');
    });

    it('should use title attribute on link', () => {
      render(<Card title="My Title" url="/link" />);

      const link = screen.getByRole('link', {name: 'My Title'});
      expect(link).toHaveAttribute('title', 'My Title');
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <Card title="Full Card" url="/link" image={mockImage} text="<p>Full text</p>">
          <div data-testid="child">Child</div>
        </Card>
      );

      expect(screen.getByText('Full Card')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      render(<Card />);

      // Should render but with empty title
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should handle text with noIngress=false explicitly', () => {
      render(<Card title="Card" text="Text content" noIngress={false} />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
    });

    it('should hide text when noIngress=true even with non-empty text', () => {
      render(<Card title="Card" text="Hidden text" noIngress={true} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render empty when no props provided', () => {
      const {container} = render(<Card />);

      // Card wrapper should exist
      expect(container.firstChild).toBeInTheDocument();
      // But no image, no real title content
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
});
