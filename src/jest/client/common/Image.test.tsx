/**
 * Tests for Image component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Image} from '/react4xp/common/Image/Image';
import {getImageAlt} from '@utils/image.client';
import type {ImageData} from '/react4xp/common/types';

// Mock the utility function
jest.mock('@utils/image.client', () => ({
  getImageAlt: jest.fn((image, fallback) => {
    if (!image) return fallback || '';
    return image.alternativeText || image.displayName || fallback || '';
  }),
}));

describe('Image', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/image.jpg',
    displayName: 'Test Image',
    alternativeText: 'Alt text for test image',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render null when image is not provided', () => {
      const {container} = render(<Image />);
      expect(container.firstChild).toBeNull();
    });

    it('should render null when image is null', () => {
      const {container} = render(<Image image={null} />);
      expect(container.firstChild).toBeNull();
    });

    it('should render img element when image is provided', () => {
      render(<Image image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockImage.url);
    });

    it('should render image wrapped in link when url is provided', () => {
      render(<Image image={mockImage} url="/test-url" title="Test Title" />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test-url');
      expect(link).toHaveAttribute('title', 'Test Title');

      const img = screen.getByRole('img');
      expect(link).toContainElement(img);
    });

    it('should render image without link when url is not provided', () => {
      render(<Image image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render image without link when url is empty string', () => {
      render(<Image image={mockImage} url="" />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('alt text', () => {
    it('should call getImageAlt with image and title', () => {
      render(<Image image={mockImage} title="Fallback Title" />);

      expect(getImageAlt).toHaveBeenCalledWith(mockImage, 'Fallback Title');
    });

    it('should call getImageAlt with image and undefined when title not provided', () => {
      render(<Image image={mockImage} />);

      expect(getImageAlt).toHaveBeenCalledWith(mockImage, undefined);
    });

    it('should use alt text returned by getImageAlt', () => {
      (getImageAlt as jest.Mock).mockReturnValue('Custom alt text');

      render(<Image image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Custom alt text');
    });
  });

  describe('styling', () => {
    it('should apply wrapper className', () => {
      const {container} = render(<Image image={mockImage} className="custom-wrapper" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-wrapper');
    });

    it('should always include "image" class on wrapper', () => {
      const {container} = render(<Image image={mockImage} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('image');
    });

    it('should apply imageClassName to img element', () => {
      render(<Image image={mockImage} imageClassName="custom-image" />);

      const img = screen.getByRole('img');
      expect(img).toHaveClass('custom-image');
    });

    it('should apply imageClassName to wrapper as well', () => {
      const {container} = render(<Image image={mockImage} imageClassName="custom-image" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('custom-image');
    });

    it('should combine className, "image", and imageClassName on wrapper', () => {
      const {container} = render(
        <Image image={mockImage} className="wrapper-class" imageClassName="image-class" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('wrapper-class');
      expect(wrapper).toHaveClass('image');
      expect(wrapper).toHaveClass('image-class');
    });
  });

  describe('image properties', () => {
    it('should use image.url as src', () => {
      const image: ImageData = {url: 'https://example.com/photo.png'};
      render(<Image image={image} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/photo.png');
    });

    it('should work with different image URLs', () => {
      const image: ImageData = {url: '/relative/path/image.jpg'};
      render(<Image image={image} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', '/relative/path/image.jpg');
    });
  });

  describe('edge cases', () => {
    it('should handle image with only url property', () => {
      const image: ImageData = {url: 'https://example.com/minimal.jpg'};
      render(<Image image={image} />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/minimal.jpg');
    });

    it('should handle image with additional properties', () => {
      const image: ImageData = {
        url: 'https://example.com/image.jpg',
        displayName: 'Display Name',
        alternativeText: 'Alt Text',
        customProp: 'custom value',
      };

      render(<Image image={image} />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    });

    it('should handle empty className', () => {
      const {container} = render(<Image image={mockImage} className="" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('image');
    });

    it('should handle empty imageClassName', () => {
      render(<Image image={mockImage} imageClassName="" />);

      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img.className).toBe('');
    });

    it('should handle undefined url (renders without link)', () => {
      render(<Image image={mockImage} url={undefined} />);

      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should handle both url and title together', () => {
      render(<Image image={mockImage} url="/link" title="Link Title" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/link');
      expect(link).toHaveAttribute('title', 'Link Title');
    });

    it('should work with url but no title', () => {
      render(<Image image={mockImage} url="/link" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/link');
      expect(link).not.toHaveAttribute('title');
    });
  });
});
