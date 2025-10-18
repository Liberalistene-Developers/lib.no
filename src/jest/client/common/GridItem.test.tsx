/**
 * Tests for GridItem component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {GridItem} from '@common/GridItem/GridItem';
import type {GridItemData} from '@common/types';

// Mock dependencies
jest.mock('@common/Image/Image', () => ({
  Image: ({
    image,
    className,
    imageClassName,
    title,
    url,
  }: {
    image?: {url?: string; displayName?: string};
    className?: string;
    imageClassName?: string;
    title?: string;
    url?: string;
  }) => (
    image ? (
      <div data-testid="image-component" className={className}>
        <img src={image.url} alt={title || ''} className={imageClassName} />
        {url && <span data-testid="image-url">{url}</span>}
      </div>
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

describe('GridItem', () => {
  const mockItem: GridItemData = {
    name: 'Test Item',
    shortDescription: 'Item description',
    url: '/item/test',
    image: {
      url: 'https://example.com/image.jpg',
      displayName: 'Test Image',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render grid-item wrapper', () => {
      const {container} = render(<GridItem item={mockItem} />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render Image component', () => {
      render(<GridItem item={mockItem} />);

      expect(screen.getByTestId('image-component')).toBeInTheDocument();
    });

    it('should render with empty item by default', () => {
      const {container} = render(<GridItem />);

      expect(container.querySelector('.grid-item')).toBeInTheDocument();
    });
  });

  describe('image rendering', () => {
    it('should pass image to Image component', () => {
      render(<GridItem item={mockItem} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('should pass imageSize as className to Image', () => {
      render(<GridItem item={mockItem} imageSize="small" />);

      const imageComponent = screen.getByTestId('image-component');
      expect(imageComponent).toHaveClass('small');
    });

    it('should default imageSize to medium', () => {
      render(<GridItem item={mockItem} />);

      const imageComponent = screen.getByTestId('image-component');
      expect(imageComponent).toHaveClass('medium');
    });

    it('should pass large imageSize', () => {
      render(<GridItem item={mockItem} imageSize="large" />);

      const imageComponent = screen.getByTestId('image-component');
      expect(imageComponent).toHaveClass('large');
    });

    it('should pass empty imageSize', () => {
      render(<GridItem item={mockItem} imageSize="" />);

      const imageComponent = screen.getByTestId('image-component');
      expect(imageComponent).not.toHaveClass('medium');
    });

    it('should pass imageType as imageClassName to Image', () => {
      render(<GridItem item={mockItem} imageType="round" />);

      const img = screen.getByRole('img');
      expect(img).toHaveClass('round');
    });

    it('should pass item name as title to Image', () => {
      render(<GridItem item={mockItem} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test Item');
    });

    it('should pass item url to Image', () => {
      render(<GridItem item={mockItem} />);

      expect(screen.getByTestId('image-url')).toHaveTextContent('/item/test');
    });
  });

  describe('name/title rendering', () => {
    it('should render item name as link', () => {
      render(<GridItem item={mockItem} />);

      const link = screen.getByRole('link', {name: 'Test Item'});
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/item/test');
      expect(link).toHaveAttribute('title', 'Test Item');
    });

    it('should render grid-item-info wrapper when name exists', () => {
      const {container} = render(<GridItem item={mockItem} />);

      expect(container.querySelector('.grid-item-info')).toBeInTheDocument();
    });

    it('should not render grid-item-info when name is not provided', () => {
      const itemWithoutName = {...mockItem, name: undefined};
      const {container} = render(<GridItem item={itemWithoutName} />);

      expect(container.querySelector('.grid-item-info')).not.toBeInTheDocument();
    });

    it('should apply center class when titleCenter is true', () => {
      const {container} = render(<GridItem item={mockItem} titleCenter={true} />);

      const title = container.querySelector('.grid-item-title');
      expect(title).toHaveClass('center');
    });

    it('should not apply center class when titleCenter is false', () => {
      const {container} = render(<GridItem item={mockItem} titleCenter={false} />);

      const title = container.querySelector('.grid-item-title');
      expect(title).not.toHaveClass('center');
    });
  });

  describe('description/ingress rendering', () => {
    it('should render shortDescription using SafeHtml', () => {
      render(<GridItem item={mockItem} />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('Item description');
    });

    it('should apply as-span className to SafeHtml', () => {
      render(<GridItem item={mockItem} />);

      expect(screen.getByTestId('safe-html')).toHaveClass('as-span');
    });

    it('should not render description when noIngress is true', () => {
      render(<GridItem item={mockItem} noIngress={true} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render description when noIngress is false', () => {
      render(<GridItem item={mockItem} noIngress={false} />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
    });

    it('should not render description when shortDescription is not provided', () => {
      const itemWithoutDesc = {...mockItem, shortDescription: undefined};
      render(<GridItem item={itemWithoutDesc} />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render grid-item-description wrapper', () => {
      const {container} = render(<GridItem item={mockItem} />);

      expect(container.querySelector('.grid-item-description')).toBeInTheDocument();
    });
  });

  describe('read more functionality', () => {
    it('should render read more link when readMoreEnabled is true', () => {
      render(<GridItem item={mockItem} readMore="Read more" readMoreEnabled={true} />);

      const readMoreLink = screen.getByRole('link', {name: 'Read more'});
      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink).toHaveClass('read-more');
    });

    it('should link read more to item url', () => {
      render(<GridItem item={mockItem} readMore="Read more" readMoreEnabled={true} />);

      const readMoreLink = screen.getByRole('link', {name: 'Read more'});
      expect(readMoreLink).toHaveAttribute('href', '/item/test');
      expect(readMoreLink).toHaveAttribute('title', 'Test Item');
    });

    it('should not render read more when readMoreEnabled is false', () => {
      render(<GridItem item={mockItem} readMore="Read more" readMoreEnabled={false} />);

      expect(screen.queryByRole('link', {name: 'Read more'})).not.toBeInTheDocument();
    });

    it('should not render read more when readMore text is empty', () => {
      render(<GridItem item={mockItem} readMore="" readMoreEnabled={true} />);

      expect(screen.queryByRole('link', {name: 'Read more'})).not.toBeInTheDocument();
    });

    it('should not render read more when readMore is not provided', () => {
      render(<GridItem item={mockItem} readMoreEnabled={true} />);

      expect(screen.queryByText('Read more')).not.toBeInTheDocument();
    });

    it('should default readMore to empty string', () => {
      render(<GridItem item={mockItem} readMoreEnabled={true} />);

      expect(screen.queryByRole('link', {name: 'Read more'})).not.toBeInTheDocument();
    });

    it('should default readMoreEnabled to false', () => {
      render(<GridItem item={mockItem} readMore="Read more" />);

      expect(screen.queryByRole('link', {name: 'Read more'})).not.toBeInTheDocument();
    });
  });

  describe('presentation mode and children', () => {
    it('should apply presentation class when presentation is true', () => {
      const {container} = render(<GridItem item={mockItem} presentation={true} />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('presentation');
    });

    it('should not apply presentation class when presentation is false', () => {
      const {container} = render(<GridItem item={mockItem} presentation={false} />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).not.toHaveClass('presentation');
    });

    it('should render children when presentation is true', () => {
      render(
        <GridItem item={mockItem} presentation={true}>
          <div data-testid="child-content">Child content</div>
        </GridItem>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('should not render children when presentation is false', () => {
      render(
        <GridItem item={mockItem} presentation={false}>
          <div data-testid="child-content">Child content</div>
        </GridItem>
      );

      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument();
    });

    it('should render children inside grid-item-info', () => {
      const {container} = render(
        <GridItem item={mockItem} presentation={true}>
          <div data-testid="child-content">Child</div>
        </GridItem>
      );

      const info = container.querySelector('.grid-item-info');
      const child = screen.getByTestId('child-content');
      expect(info).toContainElement(child);
    });
  });

  describe('direction', () => {
    it('should apply direction class', () => {
      const {container} = render(<GridItem item={mockItem} direction="left" />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('left');
    });

    it('should apply right direction', () => {
      const {container} = render(<GridItem item={mockItem} direction="right" />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('right');
    });

    it('should default direction to empty string', () => {
      const {container} = render(<GridItem item={mockItem} />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('grid-item');
      expect(wrapper).not.toHaveClass('left');
      expect(wrapper).not.toHaveClass('right');
    });

    it('should handle empty direction', () => {
      const {container} = render(<GridItem item={mockItem} direction="" />);

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('grid-item');
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <GridItem
          item={mockItem}
          direction="left"
          imageSize="large"
          imageType="round"
          noIngress={false}
          presentation={true}
          readMore="Read full article"
          readMoreEnabled={true}
          titleCenter={true}
        >
          <div data-testid="children">Children content</div>
        </GridItem>
      );

      expect(screen.getByTestId('image-component')).toBeInTheDocument();
      expect(screen.getByRole('link', {name: 'Test Item'})).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByRole('link', {name: 'Read full article'})).toBeInTheDocument();
      expect(screen.getByTestId('children')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      const {container} = render(<GridItem />);

      expect(container.querySelector('.grid-item')).toBeInTheDocument();
    });

    it('should handle item with only some fields', () => {
      const partialItem: GridItemData = {
        name: 'Partial Item',
        url: '/partial',
      };

      render(<GridItem item={partialItem} />);

      expect(screen.getByRole('link', {name: 'Partial Item'})).toBeInTheDocument();
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should handle item without image', () => {
      const itemWithoutImage = {...mockItem, image: undefined};
      render(<GridItem item={itemWithoutImage} />);

      expect(screen.queryByTestId('image-component')).not.toBeInTheDocument();
      expect(screen.getByRole('link', {name: 'Test Item'})).toBeInTheDocument();
    });

    it('should render both description and read more together', () => {
      render(<GridItem item={mockItem} readMore="Read more" readMoreEnabled={true} />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByRole('link', {name: 'Read more'})).toBeInTheDocument();
    });

    it('should apply multiple classes correctly', () => {
      const {container} = render(
        <GridItem item={mockItem} direction="left" presentation={true} />
      );

      const wrapper = container.querySelector('.grid-item');
      expect(wrapper).toHaveClass('grid-item');
      expect(wrapper).toHaveClass('left');
      expect(wrapper).toHaveClass('presentation');
    });
  });
});
