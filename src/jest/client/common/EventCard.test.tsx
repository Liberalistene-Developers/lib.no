/**
 * Tests for EventCard component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {EventCard} from '@common/EventCard/EventCard';
import type {ImageData, LocationData} from '@common/types';

// Mock dependencies
jest.mock('@common/Card/Card', () => ({
  Card: ({
    image,
    title,
    text,
    noIngress,
    url,
    children,
  }: {
    image?: ImageData | null;
    title?: string;
    text?: string;
    noIngress?: boolean;
    url?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="card">
      {title && <h3 data-testid="card-title">{title}</h3>}
      {image && <img src={image.url} alt={image.alternativeText || ''} data-testid="card-image" />}
      {text && !noIngress && <p data-testid="card-text">{text}</p>}
      {url && <a href={url} data-testid="card-url">Link</a>}
      {children}
    </div>
  ),
}));

jest.mock('@common/EventInfo/EventInfo', () => ({
  EventInfo: ({
    location,
    locationLabel,
    date,
    locationType,
  }: {
    location?: LocationData;
    locationLabel?: string;
    date?: string;
    locationType?: string;
  }) => (
    <div data-testid="event-info">
      {locationLabel && <span data-testid="location-label">{locationLabel}</span>}
      {location?.address && <span data-testid="location">{location.address}</span>}
      {date && <span data-testid="date">{date}</span>}
      {locationType && <span data-testid="location-type">{locationType}</span>}
    </div>
  ),
}));

describe('EventCard', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/event-image.jpg',
    displayName: 'Event Image',
    alternativeText: 'Event alt text',
  };

  const mockLocation: LocationData = {
    address: 'Oslo, Norway',
    name: 'Oslo City Hall',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render Card wrapper', () => {
      render(<EventCard title="Test Event" />);

      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should render EventInfo component', () => {
      render(<EventCard title="Test Event" />);

      expect(screen.getByTestId('event-info')).toBeInTheDocument();
    });

    it('should render with all props', () => {
      render(
        <EventCard
          title="Full Event"
          date="2025-10-18"
          image={mockImage}
          location={mockLocation}
          locationType="virtual"
          locationLabel="Location:"
          text="Event description"
          url="/event/full"
          noIngress={false}
        />
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('event-info')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      render(<EventCard />);

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('event-info')).toBeInTheDocument();
    });
  });

  describe('Card props', () => {
    it('should pass title to Card', () => {
      render(<EventCard title="Event Title" />);

      expect(screen.getByTestId('card-title')).toHaveTextContent('Event Title');
    });

    it('should pass image to Card', () => {
      render(<EventCard image={mockImage} />);

      const image = screen.getByTestId('card-image');
      expect(image).toHaveAttribute('src', mockImage.url);
    });

    it('should pass null image to Card', () => {
      render(<EventCard image={null} />);

      expect(screen.queryByTestId('card-image')).not.toBeInTheDocument();
    });

    it('should pass text to Card', () => {
      render(<EventCard text="Event text content" />);

      expect(screen.getByTestId('card-text')).toHaveTextContent('Event text content');
    });

    it('should pass url to Card', () => {
      render(<EventCard url="/event/test" />);

      const link = screen.getByTestId('card-url');
      expect(link).toHaveAttribute('href', '/event/test');
    });

    it('should pass noIngress to Card', () => {
      render(<EventCard text="Hidden text" noIngress={true} />);

      // Text should not be rendered when noIngress is true
      expect(screen.queryByTestId('card-text')).not.toBeInTheDocument();
    });

    it('should show text when noIngress is false', () => {
      render(<EventCard text="Visible text" noIngress={false} />);

      expect(screen.getByTestId('card-text')).toHaveTextContent('Visible text');
    });
  });

  describe('EventInfo props', () => {
    it('should pass location to EventInfo', () => {
      render(<EventCard location={mockLocation} />);

      expect(screen.getByTestId('location')).toHaveTextContent('Oslo, Norway');
    });

    it('should pass locationLabel to EventInfo', () => {
      render(<EventCard locationLabel="Venue:" />);

      expect(screen.getByTestId('location-label')).toHaveTextContent('Venue:');
    });

    it('should pass date to EventInfo', () => {
      render(<EventCard date="2025-10-18" />);

      expect(screen.getByTestId('date')).toHaveTextContent('2025-10-18');
    });

    it('should pass locationType to EventInfo', () => {
      render(<EventCard locationType="virtual" />);

      expect(screen.getByTestId('location-type')).toHaveTextContent('virtual');
    });

    it('should pass place locationType to EventInfo', () => {
      render(<EventCard locationType="place" />);

      expect(screen.getByTestId('location-type')).toHaveTextContent('place');
    });
  });

  describe('default values', () => {
    it('should default image to null', () => {
      render(<EventCard />);

      expect(screen.queryByTestId('card-image')).not.toBeInTheDocument();
    });

    it('should default location to empty address', () => {
      render(<EventCard />);

      // EventInfo is rendered but location address is empty
      expect(screen.getByTestId('event-info')).toBeInTheDocument();
      expect(screen.queryByTestId('location')).not.toBeInTheDocument();
    });

    it('should default locationType to place', () => {
      render(<EventCard />);

      expect(screen.getByTestId('location-type')).toHaveTextContent('place');
    });

    it('should default locationLabel to Sted:', () => {
      render(<EventCard />);

      expect(screen.getByTestId('location-label')).toHaveTextContent('Sted:');
    });

    it('should default url to empty string', () => {
      render(<EventCard />);

      // Card is rendered with empty url
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render EventInfo as child of Card', () => {
      render(<EventCard title="Event" />);

      const card = screen.getByTestId('card');
      const eventInfo = screen.getByTestId('event-info');

      // EventInfo should be inside Card
      expect(card).toContainElement(eventInfo);
    });

    it('should handle undefined props', () => {
      render(
        <EventCard
          title={undefined}
          date={undefined}
          image={undefined}
          location={undefined}
          text={undefined}
          url={undefined}
        />
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('event-info')).toBeInTheDocument();
    });

    it('should handle empty strings', () => {
      render(
        <EventCard
          title=""
          date=""
          text=""
          url=""
        />
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('event-info')).toBeInTheDocument();
    });

    it('should handle location with only address', () => {
      const locationWithAddress: LocationData = {
        address: 'Test Address',
      };

      render(<EventCard location={locationWithAddress} />);

      expect(screen.getByTestId('location')).toHaveTextContent('Test Address');
    });

    it('should handle location with both address and name', () => {
      render(<EventCard location={mockLocation} />);

      expect(screen.getByTestId('location')).toHaveTextContent('Oslo, Norway');
    });

    it('should combine all features correctly', () => {
      render(
        <EventCard
          title="Complete Event"
          date="2025-12-25"
          image={mockImage}
          location={mockLocation}
          locationType="place"
          locationLabel="Where:"
          text="Full event description"
          url="/events/complete"
          noIngress={false}
        />
      );

      expect(screen.getByTestId('card-title')).toHaveTextContent('Complete Event');
      expect(screen.getByTestId('card-image')).toBeInTheDocument();
      expect(screen.getByTestId('card-text')).toHaveTextContent('Full event description');
      expect(screen.getByTestId('card-url')).toHaveAttribute('href', '/events/complete');
      expect(screen.getByTestId('date')).toHaveTextContent('2025-12-25');
      expect(screen.getByTestId('location')).toHaveTextContent('Oslo, Norway');
      expect(screen.getByTestId('location-label')).toHaveTextContent('Where:');
      expect(screen.getByTestId('location-type')).toHaveTextContent('place');
    });
  });
});
