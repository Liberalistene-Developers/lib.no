/**
 * Tests for Event component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Event, type EventProps} from '/react4xp/common/Event/Event';
import type {ImageData} from '/react4xp/common/types';

// Mock dependencies
jest.mock('@common/ImageBlock/ImageBlock', () => ({
  ImageBlock: ({title, image, ingress, position}: {
    title: Array<{title: string; titleColor?: string}>;
    image?: ImageData;
    ingress?: string;
    position?: 'left' | 'center' | 'right';
  }) => (
    <div data-testid="image-block">
      {title && title.length > 0 && (
        <div data-testid="image-block-title">{title[0].title}</div>
      )}
      {image && <img src={image.url} alt={image.alternativeText || ''} />}
      {ingress && <div data-testid="image-block-ingress">{ingress}</div>}
    </div>
  ),
}));

jest.mock('@common/SafeHtml/SafeHtml', () => ({
  SafeHtml: ({html, className}: {html: string; className?: string}) => (
    <div data-testid="safe-html" className={className}>
      {html}
    </div>
  ),
}));

jest.mock('@common/EventPlace/EventPlace', () => ({
  EventPlace: ({location, locationLabel}: {
    location: {address?: string};
    locationLabel?: string;
  }) => (
    <div data-testid="event-place">
      {locationLabel && <span>{locationLabel}: </span>}
      {location.address}
    </div>
  ),
}));

jest.mock('@common/EventTime/EventTime', () => ({
  EventTime: ({date, time, dateLabel, timeLabel}: {
    date?: string;
    time?: string;
    dateLabel?: string;
    timeLabel?: string;
  }) => (
    <div data-testid="event-time">
      {dateLabel && <span>{dateLabel}: </span>}
      {date}
      {timeLabel && <span> {timeLabel}: </span>}
      {time}
    </div>
  ),
}));

jest.mock('@common/MapLoader/MapLoader', () => ({
  MapLoader: ({position, address}: {position?: number[]; address?: string}) => (
    <div data-testid="map-loader">
      {position && position.length === 2 && (
        <div>Map: {position[0]}, {position[1]}</div>
      )}
      {address && <div>Address: {address}</div>}
    </div>
  ),
}));

jest.mock('@common/Schedule/Schedule', () => ({
  Schedules: ({schedules}: {schedules: unknown[]}) => (
    <div data-testid="schedules">
      {schedules.length} schedule(s)
    </div>
  ),
}));

describe('Event', () => {
  const mockImage: ImageData = {
    url: 'https://example.com/event-image.jpg',
    displayName: 'Event Image',
    alternativeText: 'Event alt text',
  };

  const mockLocation = {
    address: '123 Main St, Oslo',
  };

  const mockSchedules = [
    {id: '1', time: '10:00', title: 'Opening'},
    {id: '2', time: '11:00', title: 'Talk'},
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render with title in image by default', () => {
      render(<Event title="Test Event" titleInImage={true} />);

      expect(screen.getByTestId('image-block-title')).toHaveTextContent('Test Event');
      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
    });

    it('should render title as h1 when titleInImage is false', () => {
      render(<Event title="Event Title" titleInImage={false} />);

      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Event Title');
    });

    it('should render with empty title by default', () => {
      render(<Event />);

      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
    });

    it('should render ingress in image when ingressInImage is true', () => {
      render(<Event ingress="Event ingress" ingressInImage={true} />);

      expect(screen.getByTestId('image-block-ingress')).toHaveTextContent('Event ingress');
    });

    it('should render ingress as SafeHtml when ingressInImage is false', () => {
      render(<Event ingress="<p>Rich ingress</p>" ingressInImage={false} />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const ingressElement = safeHtmlElements.find((el) => el.textContent === '<p>Rich ingress</p>');
      expect(ingressElement).toBeInTheDocument();
    });
  });

  describe('image rendering', () => {
    it('should render ImageBlock component', () => {
      render(<Event title="Event" image={mockImage} />);

      expect(screen.getByTestId('image-block')).toBeInTheDocument();
    });

    it('should pass image to ImageBlock', () => {
      render(<Event image={mockImage} />);

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', mockImage.url);
    });
  });

  describe('description rendering', () => {
    it('should render description with SafeHtml', () => {
      render(<Event description="<p>Event description</p>" />);

      const safeHtmlElements = screen.getAllByTestId('safe-html');
      const descElement = safeHtmlElements.find((el) => el.textContent === '<p>Event description</p>');
      expect(descElement).toBeInTheDocument();
    });

    it('should render information label heading', () => {
      render(<Event description="Description" informationLabel="Information" />);

      expect(screen.getByRole('heading', {name: 'Information'})).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      render(<Event />);

      const safeHtmlElements = screen.queryAllByTestId('safe-html');
      expect(safeHtmlElements.length).toBe(0);
    });
  });

  describe('email and contact rendering', () => {
    it('should render email link', () => {
      render(<Event email="event@example.com" title="My Event" />);

      const emailLink = screen.getByRole('link', {name: 'event@example.com'});
      expect(emailLink).toHaveAttribute('href', 'mailto:event@example.com?subject=My Event');
      expect(emailLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('should render moreInformationLabel heading', () => {
      render(<Event email="test@example.com" moreInformationLabel="More Info" />);

      expect(screen.getByRole('heading', {name: 'More Info'})).toBeInTheDocument();
    });

    it('should render contactLabel', () => {
      render(<Event email="test@example.com" contactLabel="Contact us:" />);

      expect(screen.getByText('Contact us:')).toBeInTheDocument();
    });

    it('should not render email section when email not provided', () => {
      render(<Event />);

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('schedules rendering', () => {
    it('should render schedules when provided', () => {
      render(<Event schedules={mockSchedules as EventProps['schedules']} />);

      expect(screen.getByTestId('schedules')).toBeInTheDocument();
      expect(screen.getByTestId('schedules')).toHaveTextContent('2 schedule(s)');
    });

    it('should render agendaLabel heading', () => {
      render(<Event schedules={mockSchedules as EventProps['schedules']} agendaLabel="Agenda" />);

      expect(screen.getByRole('heading', {name: 'Agenda'})).toBeInTheDocument();
    });

    it('should not render schedules when array is empty', () => {
      render(<Event schedules={[]} />);

      expect(screen.queryByTestId('schedules')).not.toBeInTheDocument();
    });

    it('should not render schedules when not provided', () => {
      render(<Event />);

      expect(screen.queryByTestId('schedules')).not.toBeInTheDocument();
    });
  });

  describe('location and map rendering', () => {
    it('should render MapLoader with position', () => {
      render(<Event map={[59.9139, 10.7522]} />);

      expect(screen.getByTestId('map-loader')).toBeInTheDocument();
      expect(screen.getByText(/Map: 59.9139, 10.7522/)).toBeInTheDocument();
    });

    it('should render MapLoader with location address', () => {
      render(<Event location={mockLocation} />);

      expect(screen.getByTestId('map-loader')).toBeInTheDocument();
      expect(screen.getByText(/Address: 123 Main St, Oslo/)).toBeInTheDocument();
    });

    it('should render EventPlace when location provided', () => {
      render(<Event location={mockLocation} placeLabel="Venue" />);

      const eventPlace = screen.getByTestId('event-place');
      expect(eventPlace).toBeInTheDocument();
      expect(eventPlace).toHaveTextContent('123 Main St, Oslo');
    });

    it('should render locationLabel heading', () => {
      render(<Event location={mockLocation} locationLabel="Location" />);

      expect(screen.getByRole('heading', {name: 'Location'})).toBeInTheDocument();
    });

    it('should not render location section when neither map nor location provided', () => {
      render(<Event />);

      expect(screen.queryByTestId('map-loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('event-place')).not.toBeInTheDocument();
    });

    it('should not render map when position array has wrong length', () => {
      render(<Event map={[59.9139]} />);

      expect(screen.queryByText(/Map:/)).not.toBeInTheDocument();
    });
  });

  describe('time rendering', () => {
    it('should render EventTime with date and time', () => {
      render(<Event date="2025-10-18" time="14:00" location={mockLocation} />);

      expect(screen.getByTestId('event-time')).toBeInTheDocument();
      expect(screen.getByText(/2025-10-18/)).toBeInTheDocument();
      expect(screen.getByText(/14:00/)).toBeInTheDocument();
    });

    it('should render EventTime with labels', () => {
      render(<Event date="2025-10-18" dateLabel="Date" time="14:00" timeLabel="Time" location={mockLocation} />);

      expect(screen.getByText(/Date:/)).toBeInTheDocument();
      expect(screen.getByText(/Time:/)).toBeInTheDocument();
    });

    it('should not render EventTime when neither date nor time provided', () => {
      render(<Event location={mockLocation} />);

      expect(screen.queryByTestId('event-time')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render with all props', () => {
      render(
        <Event
          title="Full Event"
          headerColor="#ff0000"
          headerPosition="center"
          titleInImage={false}
          image={mockImage}
          ingress="Event ingress"
          ingressInImage={false}
          description="<p>Description</p>"
          informationLabel="Info"
          moreInformationLabel="More"
          locationLabel="Location"
          contactLabel="Contact:"
          placeLabel="Venue"
          agendaLabel="Schedule"
          dateLabel="Date"
          timeLabel="Time"
          email="event@example.com"
          date="2025-10-18"
          time="14:00"
          location={mockLocation}
          map={[59.9139, 10.7522]}
          schedules={mockSchedules as EventProps['schedules']}
        />
      );

      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Full Event');
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getAllByTestId('safe-html').length).toBeGreaterThan(0);
      expect(screen.getByTestId('schedules')).toBeInTheDocument();
      expect(screen.getByTestId('map-loader')).toBeInTheDocument();
      expect(screen.getByTestId('event-place')).toBeInTheDocument();
      expect(screen.getByTestId('event-time')).toBeInTheDocument();
      expect(screen.getByRole('link', {name: 'event@example.com'})).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      const {container} = render(<Event />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByTestId('image-block')).toBeInTheDocument();
    });

    it('should handle empty strings', () => {
      render(<Event title="" description="" ingress="" />);

      expect(screen.queryByRole('heading', {level: 1})).not.toBeInTheDocument();
      expect(screen.queryByTestId('image-block-title')).not.toBeInTheDocument();
    });

    it('should handle undefined location and map', () => {
      render(<Event location={undefined} map={undefined} />);

      expect(screen.queryByTestId('map-loader')).not.toBeInTheDocument();
      expect(screen.queryByTestId('event-place')).not.toBeInTheDocument();
    });
  });
});
