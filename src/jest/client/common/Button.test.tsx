/**
 * Tests for Button component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button} from '/react4xp/common/Button/Button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render with title text', () => {
      render(<Button title="Click me" />);

      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should render as anchor link when url is provided', () => {
      render(<Button title="Link" url="/test-url" />);

      const link = screen.getByRole('link', {name: 'Link'});
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test-url');
    });

    it('should render as button when onClick is provided without url', () => {
      const onClick = jest.fn();
      render(<Button title="Button" onClick={onClick} />);

      const button = screen.getByRole('button', {name: 'Button'});
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should render as link when both url and onClick are provided', () => {
      const onClick = jest.fn();
      render(<Button title="Link with click" url="/test" onClick={onClick} />);

      const link = screen.getByRole('link', {name: 'Link with click'});
      expect(link).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should apply target attribute to links', () => {
      render(<Button title="Link" url="/test" target="_blank" />);

      const link = screen.getByRole('link', {name: 'Link'});
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should include rel="noreferrer" on links', () => {
      render(<Button title="Link" url="/test" />);

      const link = screen.getByRole('link', {name: 'Link'});
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('should apply custom className', () => {
      render(<Button title="Custom" url="/test" className="custom-class" />);

      const link = screen.getByRole('link', {name: 'Custom'});
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('styling', () => {
    it('should apply base classes', () => {
      render(<Button title="Test" url="/test" />);

      const link = screen.getByRole('link', {name: 'Test'});
      expect(link).toHaveClass('inline-block');
      expect(link).toHaveClass('rounded');
      expect(link).toHaveClass('text-center');
      expect(link).toHaveClass('uppercase');
    });

    it('should apply dark variant classes by default', () => {
      render(<Button title="Dark" url="/test" />);

      const link = screen.getByRole('link', {name: 'Dark'});
      expect(link).toHaveClass('bg-primary-700');
      expect(link).toHaveClass('text-menu-bg');
    });

    it('should apply light variant classes when className includes "light"', () => {
      render(<Button title="Light" url="/test" className="light" />);

      const link = screen.getByRole('link', {name: 'Light'});
      expect(link).toHaveClass('bg-background-700');
      expect(link).toHaveClass('text-primary-700');
      expect(link).not.toHaveClass('bg-primary-700');
    });

    it('should apply light variant to buttons as well', () => {
      const onClick = jest.fn();
      render(<Button title="Light Button" onClick={onClick} className="light" />);

      const button = screen.getByRole('button', {name: 'Light Button'});
      expect(button).toHaveClass('bg-background-700');
      expect(button).toHaveClass('text-primary-700');
    });
  });

  describe('interactions', () => {
    it('should call onClick when button is clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<Button title="Click Button" onClick={onClick} />);

      const button = screen.getByRole('button', {name: 'Click Button'});
      await user.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when link is clicked', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<Button title="Click Link" url="/test" onClick={onClick} />);

      const link = screen.getByRole('link', {name: 'Click Link'});
      await user.click(link);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not throw when button clicked without onClick', async () => {
      const user = userEvent.setup();

      render(<Button title="Safe Link" url="/test" />);

      const link = screen.getByRole('link', {name: 'Safe Link'});
      await expect(user.click(link)).resolves.not.toThrow();
    });
  });

  describe('wrapper div', () => {
    it('should wrap button in centered flex div', () => {
      const onClick = jest.fn();
      const {container} = render(<Button title="Wrapped" onClick={onClick} />);

      const wrapper = container.querySelector('div.flex');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('justify-center');
    });

    it('should wrap link in centered flex div', () => {
      const {container} = render(<Button title="Wrapped" url="/test" />);

      const wrapper = container.querySelector('div.flex');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper).toHaveClass('items-center');
      expect(wrapper).toHaveClass('justify-center');
    });
  });

  describe('edge cases', () => {
    it('should handle empty title', () => {
      render(<Button title="" url="/test" />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('');
    });

    it('should handle undefined title', () => {
      render(<Button url="/test" />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should handle complex className with multiple light occurrences', () => {
      render(<Button title="Test" url="/test" className="light-mode light-theme" />);

      const link = screen.getByRole('link', {name: 'Test'});
      expect(link).toHaveClass('bg-background-700');
      expect(link).toHaveClass('text-primary-700');
    });

    it('should prioritize light styling when className contains "light"', () => {
      render(<Button title="Test" url="/test" className="some-light-class" />);

      const link = screen.getByRole('link', {name: 'Test'});
      // Should have light variant classes
      expect(link).toHaveClass('bg-background-700');
      // Should not have dark variant classes
      expect(link).not.toHaveClass('bg-primary-700');
    });
  });
});
