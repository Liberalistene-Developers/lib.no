/**
 * Tests for TextBlock component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {TextBlock} from '@common/TextBlock/TextBlock';

// Mock dependencies
jest.mock('@common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html, className}: {html: string; className?: string}) => (
    <div data-testid="safe-html" className={className}>
      {html}
    </div>
  ),
}));

describe('TextBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render with title', () => {
      render(<TextBlock title="Test Title" />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toHaveTextContent('Test Title');
    });

    it('should render with text', () => {
      render(<TextBlock text="<p>Test text</p>" />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Test text</p>');
    });

    it('should render with both title and text', () => {
      render(<TextBlock title="Title" text="<p>Text content</p>" />);

      expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Title');
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Text content</p>');
    });

    it('should not render when both title and text are empty', () => {
      const {container} = render(<TextBlock title="" text="" />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render when no props provided', () => {
      const {container} = render(<TextBlock />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('title rendering', () => {
    it('should render title as h2', () => {
      render(<TextBlock title="Heading" />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toBeInTheDocument();
    });

    it('should apply font-bold class to title', () => {
      render(<TextBlock title="Bold Title" />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('text-[50px]');
      expect(heading).toHaveClass('leading-[60px]');
    });

    it('should not render title when empty string', () => {
      render(<TextBlock title="" text="Some text" />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      render(<TextBlock text="Some text" />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });

  describe('titleColor', () => {
    it('should apply titleColor class to title wrapper', () => {
      const {container} = render(<TextBlock title="Colored Title" titleColor="text-primary-700" />);

      const titleWrapper = container.querySelector('.text-primary-700');
      expect(titleWrapper).toBeInTheDocument();
    });

    it('should apply multiple titleColor classes', () => {
      const {container} = render(<TextBlock title="Title" titleColor="text-red-500 bg-blue-100" />);

      const titleWrapper = container.querySelector('.text-red-500');
      expect(titleWrapper).toBeInTheDocument();
    });

    it('should not apply titleColor when empty string', () => {
      const {container} = render(<TextBlock title="Title" titleColor="" />);

      const titleWrapper = container.querySelector('.flex.flex-col.justify-center.items-center');
      expect(titleWrapper).toBeInTheDocument();
      // className should not have empty string as separate class
      expect(titleWrapper?.className).not.toMatch(/\s{2,}/);
    });

    it('should default titleColor to empty string', () => {
      const {container} = render(<TextBlock title="Title" />);

      const titleWrapper = container.querySelector('.flex.flex-col.justify-center.items-center');
      expect(titleWrapper).toBeInTheDocument();
    });
  });

  describe('text rendering', () => {
    it('should render text using SafeHtml', () => {
      render(<TextBlock text="<div>HTML content</div>" />);

      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<div>HTML content</div>');
    });

    it('should apply page-content class to SafeHtml', () => {
      render(<TextBlock text="Content" />);

      const safeHtml = screen.getByTestId('safe-html');
      expect(safeHtml).toHaveClass('page-content');
    });

    it('should not render text when empty string', () => {
      render(<TextBlock title="Title" text="" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should not render text when not provided', () => {
      render(<TextBlock title="Title" />);

      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });
  });

  describe('layout and styling', () => {
    it('should apply flex layout classes to wrapper', () => {
      const {container} = render(<TextBlock title="Title" />);

      const wrapper = container.querySelector('.flex.flex-col.justify-center.items-center.gap-y-5');
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply flex layout to title wrapper', () => {
      const {container} = render(<TextBlock title="Title" />);

      const titleWrapper = container.querySelector('.flex.flex-col.justify-center.items-center');
      expect(titleWrapper).toBeInTheDocument();
    });

    it('should wrap text in a div', () => {
      const {container} = render(<TextBlock text="Text" />);

      const textWrapper = screen.getByTestId('safe-html').parentElement;
      expect(textWrapper?.tagName).toBe('DIV');
    });
  });

  describe('conditional rendering', () => {
    it('should render when only title is provided', () => {
      const {container} = render(<TextBlock title="Only Title" />);

      expect(container.firstChild).not.toBeNull();
      expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
    });

    it('should render when only text is provided', () => {
      const {container} = render(<TextBlock text="<p>Only text</p>" />);

      expect(container.firstChild).not.toBeNull();
      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
    });

    it('should render when title has value but text is empty', () => {
      const {container} = render(<TextBlock title="Title" text="" />);

      expect(container.firstChild).not.toBeNull();
      expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
      expect(screen.queryByTestId('safe-html')).not.toBeInTheDocument();
    });

    it('should render when text has value but title is empty', () => {
      const {container} = render(<TextBlock title="" text="<p>Text</p>" />);

      expect(container.firstChild).not.toBeNull();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByTestId('safe-html')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <TextBlock
          title="Full Title"
          titleColor="text-blue-600"
          text="<p>Full text content</p>"
        />
      );

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toHaveTextContent('Full Title');
      expect(screen.getByTestId('safe-html')).toHaveTextContent('<p>Full text content</p>');
    });

    it('should render with minimal props', () => {
      const {container} = render(<TextBlock />);

      expect(container.firstChild).toBeNull();
    });

    it('should handle undefined props', () => {
      const {container} = render(
        <TextBlock
          title={undefined}
          text={undefined}
          titleColor={undefined}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('should handle HTML in text prop', () => {
      render(<TextBlock text="<strong>Bold</strong> and <em>italic</em>" />);

      expect(screen.getByTestId('safe-html')).toHaveTextContent('<strong>Bold</strong> and <em>italic</em>');
    });

    it('should handle special characters in title', () => {
      render(<TextBlock title="Title with <special> & characters" />);

      const heading = screen.getByRole('heading', {level: 2});
      expect(heading).toHaveTextContent('Title with <special> & characters');
    });

    it('should default all props to empty strings', () => {
      const {container} = render(<TextBlock />);

      // With all defaults being empty strings, nothing should render
      expect(container.firstChild).toBeNull();
    });
  });
});
