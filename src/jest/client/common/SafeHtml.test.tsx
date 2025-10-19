/**
 * Tests for SafeHtml component
 *
 * Note: This component expects HTML that has already been processed/sanitized
 * by Enonic XP's processHtml() in the processor layer. It does NOT perform
 * sanitization itself - that happens server-side before React receives the data.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';

describe('SafeHtml', () => {
  describe('rendering', () => {
    it('should render HTML content', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      render(<SafeHtml html={html} />);

      const element = screen.getByText(/Hello/);
      expect(element).toBeInTheDocument();
      expect(element.querySelector('strong')).toBeInTheDocument();
    });

    it('should render links', () => {
      const html = '<a href="https://example.com" target="_blank">Link</a>';
      const { container } = render(<SafeHtml html={html} />);

      const link = container.querySelector('a');
      expect(link?.getAttribute('href')).toBe('https://example.com');
      expect(link?.getAttribute('target')).toBe('_blank');
    });

    it('should render images', () => {
      const html = '<img src="/image.jpg" alt="Test" />';
      const { container } = render(<SafeHtml html={html} />);

      const img = container.querySelector('img');
      expect(img?.getAttribute('src')).toBe('/image.jpg');
      expect(img?.getAttribute('alt')).toBe('Test');
    });

    it('should render complex HTML structures', () => {
      const html = `
        <div>
          <h2>Title</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      `;
      const { container } = render(<SafeHtml html={html} />);

      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('ul')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(2);
    });
  });

  describe('rendering options', () => {
    it('should apply custom className', () => {
      const html = '<p>Test</p>';
      const { container } = render(<SafeHtml html={html} className="custom-class" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('rich-text');
      expect(wrapper.className).toContain('custom-class');
    });

    it('should render as specified element type', () => {
      const html = '<strong>Test</strong>';
      const { container } = render(<SafeHtml html={html} as="span" />);

      expect(container.querySelector('span.rich-text')).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      const html = '<p>Test</p>';
      const { container } = render(<SafeHtml html={html} />);

      expect(container.querySelector('div.rich-text')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const { container } = render(<SafeHtml html="" />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.innerHTML).toBe('');
    });

    it('should handle malformed HTML', () => {
      const html = '<p>Unclosed paragraph';
      render(<SafeHtml html={html} />);

      expect(screen.getByText('Unclosed paragraph')).toBeInTheDocument();
    });
  });
});
