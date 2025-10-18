/**
 * Tests for Person component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Person} from '@common/Person/Person';
import type {ImageData} from '@common/types';

// Mock dependencies
jest.mock('@common/Image/Image', () => ({
  Image: ({image}: {image?: ImageData}) => (
    image ? <img src={image.url} alt={image.alternativeText || ''} data-testid="person-image" /> : null
  ),
}));

jest.mock('@common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html, className, as}: {html: string; className?: string; as?: string}) => {
    const Component = as || 'div';
    return React.createElement(Component, {
      'data-testid': 'safe-html',
      className,
      children: html,
    });
  },
}));

describe('Person', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/person-image.jpg',
    displayName: 'Person Image',
    alternativeText: 'Person alt text',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render with title', () => {
      render(<Person title="John Doe" />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toHaveTextContent('John Doe');
      expect(heading).toHaveAttribute('title', 'John Doe');
    });

    it('should render without title', () => {
      render(<Person />);

      const heading = screen.getByRole('heading', {level: 1});
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('');
    });

    it('should apply mt-10 class to wrapper', () => {
      const {container} = render(<Person title="Person" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('mt-10');
    });
  });

  describe('image rendering', () => {
    it('should render image when provided', () => {
      render(<Person title="Person" image={mockImage} />);

      const img = screen.getByTestId('person-image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockImage.url);
    });

    it('should not render image when not provided', () => {
      render(<Person title="Person" />);

      expect(screen.queryByTestId('person-image')).not.toBeInTheDocument();
    });
  });

  describe('short description rendering', () => {
    it('should render shortDescription with SafeHtml', () => {
      render(<Person title="Person" shortDescription="<p>Short intro</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const shortDesc = safeHtmlElements.find((el) => el.textContent === '<p>Short intro</p>');
      expect(shortDesc).toBeInTheDocument();
      expect(shortDesc).toHaveClass('ingress');
    });

    it('should not render shortDescription when not provided', () => {
      render(<Person title="Person" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render shortDescription when empty string', () => {
      render(<Person title="Person" shortDescription="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });
  });

  describe('description rendering', () => {
    it('should render description with SafeHtml', () => {
      render(<Person title="Person" description="<p>Full bio</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const desc = safeHtmlElements.find((el) => el.textContent === '<p>Full bio</p>');
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveClass('description');
    });

    it('should render description as div element', () => {
      render(<Person title="Person" description="<p>Bio</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const desc = safeHtmlElements.find((el) => el.textContent === '<p>Bio</p>');
      expect(desc?.tagName).toBe('DIV');
    });

    it('should not render description when not provided', () => {
      render(<Person title="Person" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render description when empty string', () => {
      render(<Person title="Person" description="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render both shortDescription and description', () => {
      render(
        <Person
          title="Person"
          shortDescription="<p>Short</p>"
          description="<p>Long</p>"
        />
      );

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      expect(safeHtmlElements).toHaveLength(2);

      const shortDesc = safeHtmlElements.find((el) => el.textContent === '<p>Short</p>');
      const longDesc = safeHtmlElements.find((el) => el.textContent === '<p>Long</p>');

      expect(shortDesc).toHaveClass('ingress');
      expect(longDesc).toHaveClass('description');
    });
  });

  describe('email rendering', () => {
    it('should render email link', () => {
      render(<Person title="John Doe" email="john@example.com" />);

      const emailLink = screen.getByRole('link');
      expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
      expect(emailLink).toHaveClass('email');
      expect(emailLink).toHaveTextContent('John Doe');
    });

    it('should render email with prefix', () => {
      render(<Person title="John Doe" email="john@example.com" emailPrefix="Contact" />);

      const emailLink = screen.getByRole('link');
      expect(emailLink).toHaveTextContent('Contact John Doe');
    });

    it('should not render email when not provided', () => {
      render(<Person title="Person" />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should not render email when empty string', () => {
      render(<Person title="Person" email="" />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should apply mt-30 class to email wrapper', () => {
      const {container} = render(<Person title="Person" email="test@example.com" />);

      const emailWrapper = container.querySelector('.mt-\\[30px\\]');
      expect(emailWrapper).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <Person
          title="John Doe"
          image={mockImage}
          shortDescription="<p>Short bio</p>"
          description="<p>Full biography</p>"
          email="john@example.com"
          emailPrefix="Email"
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('John Doe');
      expect(screen.getByTestId('person-image')).toBeInTheDocument();
      expect(screen.getAllByTestId('safe-html')).toHaveLength(2);
      expect(screen.getByRole('link')).toHaveTextContent('Email John Doe');
    });

    it('should render with minimal props', () => {
      const {container} = render(<Person />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();
    });

    it('should handle undefined image', () => {
      render(<Person title="Person" image={undefined} />);

      expect(screen.queryByTestId('person-image')).not.toBeInTheDocument();
    });

    it('should render email without prefix when prefix is empty', () => {
      render(<Person title="Jane Doe" email="jane@example.com" emailPrefix="" />);

      const emailLink = screen.getByRole('link');
      expect(emailLink).toHaveTextContent('Jane Doe');
    });

    it('should handle all empty strings', () => {
      render(
        <Person
          title=""
          shortDescription=""
          description=""
          email=""
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('');
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });
});
