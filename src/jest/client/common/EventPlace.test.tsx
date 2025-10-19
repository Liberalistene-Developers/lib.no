import {render, screen} from '@testing-library/react';
import {EventPlace} from '/react4xp/common/EventPlace/EventPlace';

describe('EventPlace', () => {
  it('should render event place with address', () => {
    const location = {
      address: 'Oslo, Norway',
      name: 'Oslo City Hall',
    };

    render(<EventPlace location={location} />);

    expect(screen.getByText('Oslo City Hall')).toBeInTheDocument();
  });

  it('should render with default locationLabel', () => {
    const location = {
      address: 'Oslo, Norway',
    };

    render(<EventPlace location={location} />);

    expect(screen.getByText('Sted:')).toBeInTheDocument();
  });

  it('should render with custom locationLabel', () => {
    const location = {
      address: 'Oslo, Norway',
    };

    render(<EventPlace location={location} locationLabel="Location:" />);

    expect(screen.getByText('Location:')).toBeInTheDocument();
  });

  it('should link to Google Maps for physical location', () => {
    const location = {
      address: 'Karl Johans gate 1, Oslo',
      name: 'Oslo City Hall',
    };

    render(<EventPlace location={location} />);

    const link = screen.getByRole('link', {name: 'Oslo City Hall'});
    expect(link).toHaveAttribute('href', 'https://maps.google.com?q=Karl Johans gate 1, Oslo');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('should use address when name is not provided', () => {
    const location = {
      address: 'Oslo, Norway',
    };

    render(<EventPlace location={location} />);

    expect(screen.getByText('Oslo, Norway')).toBeInTheDocument();
  });

  it('should replace newlines with commas in address', () => {
    const location = {
      address: 'Karl Johans gate 1\nOslo\nNorway',
    };

    render(<EventPlace location={location} />);

    expect(screen.getByText('Karl Johans gate 1, Oslo, Norway')).toBeInTheDocument();
  });

  it('should render virtual event with URL', () => {
    const location = {
      url: 'https://zoom.us/meeting',
      name: 'Zoom Meeting',
    };

    render(<EventPlace location={location} />);

    const link = screen.getByRole('link', {name: 'Zoom Meeting'});
    expect(link).toHaveAttribute('href', 'https://zoom.us/meeting');
  });

  it('should use URL as link text when name is not provided for virtual event', () => {
    const location = {
      url: 'https://zoom.us/meeting',
    };

    render(<EventPlace location={location} />);

    expect(screen.getByText('https://zoom.us/meeting')).toBeInTheDocument();
  });

  it('should render with empty location object', () => {
    render(<EventPlace />);
    expect(screen.getByText('Sted:')).toBeInTheDocument();
  });

  it('should apply event-place className', () => {
    const {container} = render(<EventPlace />);
    expect(container.querySelector('.event-place')).toBeInTheDocument();
  });
});
