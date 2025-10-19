/**
 * Tests for EventInfo component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {EventInfo} from '@common/EventInfo/EventInfo';

describe('EventInfo', () => {
  const mockLocation = {
    address: 'Oslo, Norway',
    name: 'Oslo City Hall',
  };

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
      const {container} = render(<EventInfo location={mockLocation} locationType="place" />);

      const mapIcon = container.querySelector('.fa-map');
      expect(mapIcon).toBeInTheDocument();
      expect(mapIcon).toHaveClass('fas');
    });

    it('should render globe icon for virtual locationType', () => {
      const {container} = render(<EventInfo location={mockLocation} locationType="virtual" />);

      const globeIcon = container.querySelector('.fa-globe');
      expect(globeIcon).toBeInTheDocument();
      expect(globeIcon).toHaveClass('fas');
    });

    it('should render clock icon for date', () => {
      const {container} = render(<EventInfo date="2025-10-18" />);

      const clockIcon = container.querySelector('.fa-clock');
      expect(clockIcon).toBeInTheDocument();
      expect(clockIcon).toHaveClass('fas');
    });

    it('should default locationType to place', () => {
      const {container} = render(<EventInfo location={mockLocation} />);

      const mapIcon = container.querySelector('.fa-map');
      expect(mapIcon).toBeInTheDocument();
      expect(mapIcon).toHaveClass('fas');
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
      const {container} = render(
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

      // Verify icons are rendered
      expect(container.querySelector('.fa-map')).toBeInTheDocument();
      expect(container.querySelector('.fa-clock')).toBeInTheDocument();
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
