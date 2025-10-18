/**
 * Tests for EventInfo component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {EventInfo} from '@common/EventInfo/EventInfo';

// Mock dependencies
jest.mock('@common/FAIcon/FAIconEdit', () => ({
  FAIconEdit: ({iconType}: {iconType: string}) => (
    <span data-testid="fa-icon-edit" data-icon-type={iconType}>
      {iconType}
    </span>
  ),
}));

describe('EventInfo', () => {
  const mockLocation = {
    address: 'Oslo, Norway',
    name: 'Oslo City Hall',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render wrapper with correct classes', () => {
      const {container} = render(<EventInfo date="2025-10-18" location={mockLocation} />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('text-secondary-500');
      expect(wrapper).toHaveClass('flex');
      expect(wrapper).toHaveClass('flex-row');
    });

    it('should render location section', () => {
      const {container} = render(<EventInfo location={mockLocation} />);

      const locationSection = container.querySelector('.max-w-\\[60\\%\\]');
      expect(locationSection).toBeInTheDocument();
    });

    it('should render date section', () => {
      const {container} = render(<EventInfo date="2025-10-18" />);

      const dateSection = container.querySelector('.max-w-\\[40\\%\\]');
      expect(dateSection).toBeInTheDocument();
    });
  });

  describe('location rendering', () => {
    it('should render location name when provided', () => {
      render(<EventInfo location={mockLocation} />);

      expect(screen.getByText('Oslo City Hall')).toBeInTheDocument();
    });

    it('should render location address when name is not provided', () => {
      const locationWithoutName = {address: 'Bergen, Norway'};
      render(<EventInfo location={locationWithoutName} />);

      expect(screen.getByText('Bergen, Norway')).toBeInTheDocument();
    });

    it('should prefer location name over address', () => {
      render(<EventInfo location={mockLocation} />);

      expect(screen.getByText('Oslo City Hall')).toBeInTheDocument();
      expect(screen.queryByText('Oslo, Norway')).not.toBeInTheDocument();
    });

    it('should render locationLabel', () => {
      render(<EventInfo location={mockLocation} locationLabel="Venue:" />);

      expect(screen.getByText('Venue:')).toBeInTheDocument();
    });

    it('should default locationLabel to Sted:', () => {
      render(<EventInfo location={mockLocation} />);

      expect(screen.getByText('Sted:')).toBeInTheDocument();
    });

    it('should render location link with google maps for place type', () => {
      render(<EventInfo location={mockLocation} locationType="place" />);

      const link = screen.getByRole('link', {name: 'Oslo City Hall'});
      expect(link).toHaveAttribute('href', 'https://maps.google.com?q=Oslo, Norway');
      expect(link).toHaveAttribute('title', 'Oslo, Norway');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('should render location link with address for virtual type', () => {
      const virtualLocation = {address: 'https://zoom.us/meeting', name: 'Online Meeting'};
      render(<EventInfo location={virtualLocation} locationType="virtual" />);

      const link = screen.getByRole('link', {name: 'Online Meeting'});
      expect(link).toHaveAttribute('href', 'https://zoom.us/meeting');
    });

    it('should default location to empty address and name', () => {
      render(<EventInfo />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://maps.google.com?q=');
    });
  });

  describe('icon rendering', () => {
    it('should render map icon for place locationType', () => {
      render(<EventInfo location={mockLocation} locationType="place" />);

      const icons = screen.getAllByTestId('fa-icon-edit');
      const mapIcon = icons.find((icon) => icon.getAttribute('data-icon-type') === 'fa-map');
      expect(mapIcon).toBeInTheDocument();
    });

    it('should render globe icon for virtual locationType', () => {
      render(<EventInfo location={mockLocation} locationType="virtual" />);

      const icons = screen.getAllByTestId('fa-icon-edit');
      const globeIcon = icons.find((icon) => icon.getAttribute('data-icon-type') === 'fa-globe');
      expect(globeIcon).toBeInTheDocument();
    });

    it('should render clock icon for date', () => {
      render(<EventInfo date="2025-10-18" />);

      const icons = screen.getAllByTestId('fa-icon-edit');
      const clockIcon = icons.find((icon) => icon.getAttribute('data-icon-type') === 'fa-clock');
      expect(clockIcon).toBeInTheDocument();
    });

    it('should default locationType to place', () => {
      render(<EventInfo location={mockLocation} />);

      const icons = screen.getAllByTestId('fa-icon-edit');
      const mapIcon = icons.find((icon) => icon.getAttribute('data-icon-type') === 'fa-map');
      expect(mapIcon).toBeInTheDocument();
    });
  });

  describe('date rendering', () => {
    it('should render date in time element', () => {
      render(<EventInfo date="2025-10-18" />);

      const timeElement = screen.getByText('2025-10-18');
      expect(timeElement.tagName).toBe('TIME');
      expect(timeElement).toHaveAttribute('dateTime', '2025-10-18');
    });

    it('should render date with title attribute', () => {
      const {container} = render(<EventInfo date="2025-10-18" />);

      const dateSection = container.querySelector('.max-w-\\[40\\%\\]');
      expect(dateSection).toHaveAttribute('title', '2025-10-18');
    });

    it('should default date to empty string', () => {
      const {container} = render(<EventInfo />);

      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveAttribute('dateTime', '');
    });

    it('should handle custom date format', () => {
      render(<EventInfo date="October 18, 2025" />);

      expect(screen.getByText('October 18, 2025')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <EventInfo
          date="2025-12-25"
          location={mockLocation}
          locationType="place"
          locationLabel="Location:"
        />
      );

      expect(screen.getByText('Location:')).toBeInTheDocument();
      expect(screen.getByText('Oslo City Hall')).toBeInTheDocument();
      expect(screen.getByText('2025-12-25')).toBeInTheDocument();
      expect(screen.getAllByTestId('fa-icon-edit')).toHaveLength(2);
    });

    it('should render with minimal props', () => {
      render(<EventInfo />);

      expect(screen.getByText('Sted:')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should handle virtual event with URL', () => {
      const virtualLocation = {
        address: 'https://meet.google.com/abc-defg-hij',
        name: 'Google Meet',
      };

      render(<EventInfo location={virtualLocation} locationType="virtual" />);

      const link = screen.getByRole('link', {name: 'Google Meet'});
      expect(link).toHaveAttribute('href', 'https://meet.google.com/abc-defg-hij');
    });

    it('should handle location with special characters', () => {
      const specialLocation = {
        address: 'Café & Restaurant, Oslo',
        name: 'Café Møllergata',
      };

      render(<EventInfo location={specialLocation} />);

      expect(screen.getByText('Café Møllergata')).toBeInTheDocument();
    });

    it('should handle long location names with ellipsis', () => {
      const {container} = render(<EventInfo location={mockLocation} />);

      const locationSection = container.querySelector('.max-w-\\[60\\%\\]');
      expect(locationSection).toHaveClass('overflow-hidden');
      expect(locationSection).toHaveClass('text-ellipsis');
      expect(locationSection).toHaveClass('whitespace-nowrap');
    });

    it('should handle long dates with ellipsis', () => {
      const {container} = render(<EventInfo date="Very long date string" />);

      const dateSection = container.querySelector('.max-w-\\[40\\%\\]');
      expect(dateSection).toHaveClass('overflow-hidden');
      expect(dateSection).toHaveClass('text-ellipsis');
      expect(dateSection).toHaveClass('whitespace-nowrap');
    });

    it('should handle undefined location properties', () => {
      const emptyLocation = {};
      render(<EventInfo location={emptyLocation} />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });
});
