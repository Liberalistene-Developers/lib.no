/**
 * Tests for FAIcon component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {FAIcon} from '@common/FAIcon/FAIcon';

// Mock FontAwesome dependencies
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({icon}: {icon: {iconName: string}}) => (
    <span data-testid="fa-icon" data-icon-name={icon.iconName}>
      Icon: {icon.iconName}
    </span>
  ),
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faMap: {iconName: 'map'},
  faGlobe: {iconName: 'globe'},
  faClock: {iconName: 'clock'},
}));

describe('FAIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render FontAwesomeIcon with faMap', () => {
      render(<FAIcon iconType="faMap" />);

      const icon = screen.getByTestId('fa-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-icon-name', 'map');
    });

    it('should render FontAwesomeIcon with faGlobe', () => {
      render(<FAIcon iconType="faGlobe" />);

      const icon = screen.getByTestId('fa-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-icon-name', 'globe');
    });

    it('should render FontAwesomeIcon with faClock', () => {
      render(<FAIcon iconType="faClock" />);

      const icon = screen.getByTestId('fa-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-icon-name', 'clock');
    });
  });

  describe('null rendering', () => {
    it('should return null when iconType is not provided', () => {
      const {container} = render(<FAIcon />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('fa-icon')).not.toBeInTheDocument();
    });

    it('should return null when iconType is empty string', () => {
      const {container} = render(<FAIcon iconType="" />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('fa-icon')).not.toBeInTheDocument();
    });

    it('should return null when iconType is not in iconResolver', () => {
      const {container} = render(<FAIcon iconType="faInvalid" />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('fa-icon')).not.toBeInTheDocument();
    });

    it('should return null when iconType is undefined', () => {
      const {container} = render(<FAIcon iconType={undefined} />);

      expect(container.firstChild).toBeNull();
      expect(screen.queryByTestId('fa-icon')).not.toBeInTheDocument();
    });
  });

  describe('icon resolver', () => {
    it('should resolve faMap icon correctly', () => {
      render(<FAIcon iconType="faMap" />);

      expect(screen.getByText('Icon: map')).toBeInTheDocument();
    });

    it('should resolve faGlobe icon correctly', () => {
      render(<FAIcon iconType="faGlobe" />);

      expect(screen.getByText('Icon: globe')).toBeInTheDocument();
    });

    it('should resolve faClock icon correctly', () => {
      render(<FAIcon iconType="faClock" />);

      expect(screen.getByText('Icon: clock')).toBeInTheDocument();
    });

    it('should not resolve unknown icon types', () => {
      const {container} = render(<FAIcon iconType="faUnknown" />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle case-sensitive icon types', () => {
      const {container} = render(<FAIcon iconType="Famap" />);

      // Should not match because iconType is case-sensitive
      expect(container.firstChild).toBeNull();
    });

    it('should handle icon type with extra spaces', () => {
      const {container} = render(<FAIcon iconType=" faMap " />);

      // Should not match because of extra spaces
      expect(container.firstChild).toBeNull();
    });

    it('should only support three icon types', () => {
      render(<FAIcon iconType="faMap" />);
      expect(screen.getByTestId('fa-icon')).toBeInTheDocument();

      render(<FAIcon iconType="faGlobe" />);
      expect(screen.getAllByTestId('fa-icon')).toHaveLength(2);

      render(<FAIcon iconType="faClock" />);
      expect(screen.getAllByTestId('fa-icon')).toHaveLength(3);

      // Any other icon should not render
      const {container} = render(<FAIcon iconType="faHome" />);
      expect(container.firstChild).toBeNull();
    });
  });
});
