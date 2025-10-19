/**
 * Tests for ImageBlock component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {ImageBlock} from '@common/ImageBlock/ImageBlock';
import type {ImageData} from '@common/types';

// Mock dependencies
jest.mock('@common/Image/Image', () => ({
  Image: ({image, className}: {image?: ImageData; className?: string}) => (
    image ? (
      <img
        src={image.url}
        alt={image.alternativeText || ''}
        className={className}
        data-testid="image-component"
      />
    ) : null
  ),
}));

jest.mock('@common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html, className}: {html: string; className?: string}) => (
    <div data-testid="safe-html" className={className}>
      {html}
    </div>
  ),
}));

describe('ImageBlock', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/image.jpg',
    displayName: 'Test Image',
    alternativeText: 'Test alt text',
  };

  const mockTitle = [
    {title: 'Main Title', titleColor: 'primary'},
  ];

  const mockMultipleTitles = [
    {title: 'First', titleColor: 'primary'},
    {title: 'Second', titleColor: 'secondary', titleNoSpace: true},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render image-block wrapper', () => {
      const {container} = render(<ImageBlock image={mockImage} />);

      const wrapper = container.querySelector('.image-block');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render Image component', () => {
      render(<ImageBlock image={mockImage} />);

      expect(screen.getByTestId('image-component')).toBeInTheDocument();
    });

    it('should pass full className to Image', () => {
      render(<ImageBlock image={mockImage} />);

      const image = screen.getByTestId('image-component');
      expect(image).toHaveClass('full');
    });

    it('should render without image', () => {
      const {container} = render(<ImageBlock />);

      expect(container.querySelector('.image-block')).toBeInTheDocument();
      expect(screen.queryByTestId('image-component')).not.toBeInTheDocument();
    });
  });

  describe('title rendering', () => {
    it('should render single title', () => {
      render(<ImageBlock title={mockTitle} />);

      expect(screen.getByText('Main Title')).toBeInTheDocument();
    });

    it('should render title as h1 by default', () => {
      render(<ImageBlock title={mockTitle} />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Main Title');
    });

    it('should render title as h2 when Tag is h2', () => {
      render(<ImageBlock title={mockTitle} Tag="h2" />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toBeInTheDocument();
    });

    it('should render title as h3 when Tag is h3', () => {
      render(<ImageBlock title={mockTitle} Tag="h3" />);

      const heading = screen.getByRole('heading', {level: 3});
      expect(heading).toBeInTheDocument();
    });

    it('should render multiple title spans', () => {
      render(<ImageBlock title={mockMultipleTitles} />);

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should apply titleColor class to title span', () => {
      const {container} = render(<ImageBlock title={mockTitle} />);

      const span = container.querySelector('.primary');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('Main Title');
    });

    it('should apply nospace class when titleNoSpace is true', () => {
      const titleWithNoSpace = [{title: 'NoSpace', titleNoSpace: true}];
      const {container} = render(<ImageBlock title={titleWithNoSpace} />);

      const span = container.querySelector('.nospace');
      expect(span).toBeInTheDocument();
    });

    it('should not apply nospace class when titleNoSpace is false', () => {
      const titleWithSpace = [{title: 'WithSpace', titleNoSpace: false}];
      const {container} = render(<ImageBlock title={titleWithSpace} />);

      const span = container.querySelector('.nospace');
      expect(span).not.toBeInTheDocument();
    });

    it('should apply titleClassName to heading', () => {
      const {container} = render(<ImageBlock title={mockTitle} titleClassName="half" />);

      const heading = container.querySelector('.half');
      expect(heading).toBeInTheDocument();
    });

    it('should not render title when array is empty', () => {
      render(<ImageBlock title={[]} />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('ingress rendering', () => {
    it('should render ingress as SafeHtml', () => {
      render(<ImageBlock ingress="<p>Test ingress</p>" />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Test ingress</p>');
    });

    it('should not render ingress when it is false', () => {
      render(<ImageBlock ingress={false} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render ingress when it is true (not a string)', () => {
      render(<ImageBlock ingress={true} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render ingress when it is empty string', () => {
      render(<ImageBlock ingress="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should apply ingressColor class to SafeHtml', () => {
      render(<ImageBlock ingress="Test" ingressColor="custom-color" />);

      const safeHtml = screen.getByTestId('safe-html');
      expect(safeHtml).toHaveClass('ingress');
      expect(safeHtml).toHaveClass('custom-color');
    });

    it('should apply standard ingressColor by default', () => {
      render(<ImageBlock ingress="Test" />);

      const safeHtml = screen.getByTestId('safe-html');
      expect(safeHtml).toHaveClass('standard');
    });
  });

  describe('position and overlay', () => {
    it('should apply right position by default', () => {
      const {container} = render(<ImageBlock title={mockTitle} />);

      const content = container.querySelector('.content');
      expect(content).toHaveClass('right');
    });

    it('should apply left position', () => {
      const {container} = render(<ImageBlock title={mockTitle} position="left" />);

      const content = container.querySelector('.content');
      expect(content).toHaveClass('left');
    });

    it('should apply center position', () => {
      const {container} = render(<ImageBlock title={mockTitle} position="center" />);

      const content = container.querySelector('.content');
      expect(content).toHaveClass('center');
    });

    it('should apply overlay class', () => {
      const {container} = render(<ImageBlock title={mockTitle} overlay="dark-overlay" />);

      const content = container.querySelector('.content');
      expect(content).toHaveClass('dark-overlay');
    });

    it('should not apply overlay when empty string', () => {
      const {container} = render(<ImageBlock title={mockTitle} overlay="" />);

      const content = container.querySelector('.content');
      expect(content).toHaveClass('content');
      // Should not have extra empty class
      expect(content?.className.split(' ')).not.toContain('');
    });
  });

  describe('content wrapper', () => {
    it('should render content wrapper when title exists', () => {
      const {container} = render(<ImageBlock title={mockTitle} />);

      expect(container.querySelector('.content')).toBeInTheDocument();
    });

    it('should render content wrapper when ingress exists', () => {
      const {container} = render(<ImageBlock ingress="Test ingress" />);

      expect(container.querySelector('.content')).toBeInTheDocument();
    });

    it('should render content wrapper even with empty title array (empty array is truthy)', () => {
      const {container} = render(<ImageBlock image={mockImage} />);

      // Empty array is truthy in JavaScript, so content wrapper renders
      expect(container.querySelector('.content')).toBeInTheDocument();
      // But image-block-text should not render when both title and ingress are actually empty
      expect(container.querySelector('.image-block-text')).not.toBeInTheDocument();
    });

    it('should render image-block-text wrapper when title or ingress exists', () => {
      const {container} = render(<ImageBlock title={mockTitle} />);

      expect(container.querySelector('.image-block-text')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <ImageBlock
          Tag="h2"
          image={mockImage}
          position="center"
          title={mockMultipleTitles}
          titleClassName="half"
          overlay="dark"
          ingress="<p>Full ingress</p>"
          ingressColor="light"
        />
      );

      expect(screen.getByTestId('image-component')).toBeInTheDocument();
      expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      const {container} = render(<ImageBlock />);

      expect(container.querySelector('.image-block')).toBeInTheDocument();
    });

    it('should handle title with empty title text', () => {
      const titleWithEmpty = [{title: '', titleColor: 'primary'}];
      render(<ImageBlock title={titleWithEmpty} />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
    });

    it('should handle title with undefined title text', () => {
      const titleWithUndefined = [{titleColor: 'primary'}];
      render(<ImageBlock title={titleWithUndefined} />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
    });

    it('should use index as key when title is undefined', () => {
      const titleWithUndefined = [{titleColor: 'primary'}];
      const {container} = render(<ImageBlock title={titleWithUndefined} />);

      // Should render without errors
      expect(container.querySelector('.primary')).toBeInTheDocument();
    });

    it('should render both title and ingress together', () => {
      render(
        <ImageBlock
          title={mockTitle}
          ingress="<p>Combined ingress</p>"
        />
      );

      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Combined ingress</p>');
    });

    it('should apply all className combinations correctly', () => {
      const {container} = render(
        <ImageBlock
          title={mockTitle}
          position="left"
          overlay="dark-overlay"
        />
      );

      const content = container.querySelector('.content');
      expect(content).toHaveClass('content');
      expect(content).toHaveClass('left');
      expect(content).toHaveClass('dark-overlay');
    });
  });
});
