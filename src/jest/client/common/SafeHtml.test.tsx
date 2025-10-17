/**
 * Tests for SafeHtml component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SafeHtml } from '/react4xp/common/SafeHtml/SafeHtml';

describe('SafeHtml', () => {
  describe('sanitization', () => {
    it('should render safe HTML content', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      render(<SafeHtml html={html} />);

      const element = screen.getByText(/Hello/);
      expect(element).toBeInTheDocument();
      expect(element.querySelector('strong')).toBeInTheDocument();
    });

    it('should sanitize script tags', () => {
      const html = '<p>Hello</p><script>alert("XSS")</script>';
      const { container } = render(<SafeHtml html={html} />);

      expect(container.querySelector('script')).toBeNull();
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should sanitize onclick handlers', () => {
      const html = '<button onclick="alert(\'XSS\')">Click me</button>';
      const { container } = render(<SafeHtml html={html} />);

      // DOMPurify removes button elements with onclick handlers entirely
      const button = container.querySelector('button');
      expect(button).toBeNull();
    });

    it('should sanitize javascript: URLs', () => {
      const html = '<a href="javascript:alert(\'XSS\')">Click</a>';
      const { container } = render(<SafeHtml html={html} />);

      // DOMPurify keeps the link but removes the javascript: href
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link?.getAttribute('href')).toBeNull();
    });

    it('should allow safe links', () => {
      const html = '<a href="https://example.com" target="_blank">Link</a>';
      const { container } = render(<SafeHtml html={html} />);

      const link = container.querySelector('a');
      expect(link?.getAttribute('href')).toBe('https://example.com');
      expect(link?.getAttribute('target')).toBe('_blank');
    });

    it('should allow safe images', () => {
      const html = '<img src="/image.jpg" alt="Test" />';
      const { container } = render(<SafeHtml html={html} />);

      const img = container.querySelector('img');
      expect(img?.getAttribute('src')).toBe('/image.jpg');
      expect(img?.getAttribute('alt')).toBe('Test');
    });

    it('should strip data attributes by default', () => {
      const html = '<div data-test="value">Content</div>';
      const { container } = render(<SafeHtml html={html} />);

      const div = container.querySelector('[data-test]');
      expect(div).toBeNull();
    });

    it('should allow style attribute', () => {
      const html = '<p style="color: red;">Styled text</p>';
      const { container } = render(<SafeHtml html={html} />);

      const p = container.querySelector('p');
      expect(p?.getAttribute('style')).toBeTruthy();
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

  describe('custom sanitization config', () => {
    it('should allow custom allowed tags', () => {
      const html = '<video controls><source src="video.mp4" /></video>';

      // Without custom config, video should be removed
      const { container: container1 } = render(<SafeHtml html={html} />);
      expect(container1.querySelector('video')).toBeNull();

      // With custom config allowing video
      const { container: container2 } = render(
        <SafeHtml
          html={html}
          sanitizeConfig={{ ALLOWED_TAGS: ['video', 'source'] }}
        />
      );
      expect(container2.querySelector('video')).toBeInTheDocument();
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
      const { container } = render(<SafeHtml html={html} />);

      expect(screen.getByText('Unclosed paragraph')).toBeInTheDocument();
    });

    it('should memoize sanitized content', () => {
      const html = '<p>Test</p>';
      const { rerender, container } = render(<SafeHtml html={html} />);

      const firstChild = container.firstChild;

      // Re-render with same HTML
      rerender(<SafeHtml html={html} />);

      // Should be same element (memoized)
      expect(container.firstChild).toBe(firstChild);
    });
  });
});
