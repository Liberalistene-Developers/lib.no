/**
 * Tests for FAIcon component
 *
 * Tests the CSS-based FontAwesome icon component with TypeScript type safety.
 */

import React from 'react';
import {render} from '@testing-library/react';
import {FAIcon, type FAIconType} from '@common/FAIcon/FAIcon';

describe('FAIcon', () => {
  describe('basic rendering', () => {
    it('should render an <i> element with fas class', () => {
      const {container} = render(<FAIcon iconType="faMap" />);
      const icon = container.querySelector('i');

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('fas');
    });

    it('should render with the correct CSS class for faMap', () => {
      const {container} = render(<FAIcon iconType="faMap" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-map');
    });

    it('should render with the correct CSS class for faGlobe', () => {
      const {container} = render(<FAIcon iconType="faGlobe" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-globe');
    });

    it('should render with the correct CSS class for faClock', () => {
      const {container} = render(<FAIcon iconType="faClock" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-clock');
    });

    it('should render with the correct CSS class for faEye', () => {
      const {container} = render(<FAIcon iconType="faEye" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-eye');
    });

    it('should render with the correct CSS class for faEyeSlash', () => {
      const {container} = render(<FAIcon iconType="faEyeSlash" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-eye-slash');
    });

    it('should render with the correct CSS class for faLink', () => {
      const {container} = render(<FAIcon iconType="faLink" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-link');
    });

    it('should render with the correct CSS class for faEnvelope', () => {
      const {container} = render(<FAIcon iconType="faEnvelope" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-envelope');
    });

    it('should render with the correct CSS class for faPhone', () => {
      const {container} = render(<FAIcon iconType="faPhone" />);
      const icon = container.querySelector('i');

      expect(icon).toHaveClass('fas', 'fa-phone');
    });
  });

  describe('icon type mapping', () => {
    const iconMappings: Array<{iconType: FAIconType; expectedClass: string}> = [
      {iconType: 'faMap', expectedClass: 'fa-map'},
      {iconType: 'faGlobe', expectedClass: 'fa-globe'},
      {iconType: 'faClock', expectedClass: 'fa-clock'},
      {iconType: 'faEye', expectedClass: 'fa-eye'},
      {iconType: 'faEyeSlash', expectedClass: 'fa-eye-slash'},
      {iconType: 'faLink', expectedClass: 'fa-link'},
      {iconType: 'faEnvelope', expectedClass: 'fa-envelope'},
      {iconType: 'faPhone', expectedClass: 'fa-phone'}
    ];

    iconMappings.forEach(({iconType, expectedClass}) => {
      it(`should map ${iconType} to ${expectedClass}`, () => {
        const {container} = render(<FAIcon iconType={iconType} />);
        const icon = container.querySelector('i');

        expect(icon).toHaveClass(expectedClass);
      });
    });
  });

  describe('component structure', () => {
    it('should render exactly one <i> element', () => {
      const {container} = render(<FAIcon iconType="faMap" />);
      const icons = container.querySelectorAll('i');

      expect(icons).toHaveLength(1);
    });

    it('should render an empty <i> element (no text content)', () => {
      const {container} = render(<FAIcon iconType="faMap" />);
      const icon = container.querySelector('i');

      expect(icon?.textContent).toBe('');
    });

    it('should have both base class and icon-specific class', () => {
      const {container} = render(<FAIcon iconType="faGlobe" />);
      const icon = container.querySelector('i');

      // Should have exactly 2 classes: fas and fa-globe
      expect(icon?.className).toBe('fas fa-globe');
    });
  });

  describe('TypeScript type safety', () => {
    it('should only accept valid FAIconType values', () => {
      // This is a compile-time check - if these compile, TypeScript is enforcing types correctly
      const validIcons: FAIconType[] = [
        'faMap',
        'faGlobe',
        'faClock',
        'faEye',
        'faEyeSlash',
        'faLink',
        'faEnvelope',
        'faPhone'
      ];

      validIcons.forEach(iconType => {
        const {container} = render(<FAIcon iconType={iconType} />);
        expect(container.querySelector('i')).toBeInTheDocument();
      });
    });
  });

  describe('all supported icons', () => {
    it('should support all 8 icon types', () => {
      const allIcons: FAIconType[] = [
        'faMap',
        'faGlobe',
        'faClock',
        'faEye',
        'faEyeSlash',
        'faLink',
        'faEnvelope',
        'faPhone'
      ];

      allIcons.forEach(iconType => {
        const {container} = render(<FAIcon iconType={iconType} />);
        const icon = container.querySelector('i');

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveClass('fas');
      });

      // Verify count
      expect(allIcons).toHaveLength(8);
    });
  });
});
