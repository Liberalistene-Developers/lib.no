import {render, screen} from '@testing-library/react';
import {EventTime} from '/react4xp/common/EventTime/EventTime';

describe('EventTime', () => {
  it('should render event time with date', () => {
    render(<EventTime date="2024-01-15" dateLabel="Date:" />);

    const time = screen.getByText(/Date: 2024-01-15/);
    expect(time).toBeInTheDocument();
  });

  it('should render event time with time', () => {
    render(<EventTime time="14:00" timeLabel="Time:" />);

    const time = screen.getByText(/Time: 14:00/);
    expect(time).toBeInTheDocument();
  });

  it('should render event time with both date and time', () => {
    render(<EventTime date="2024-01-15" dateLabel="Date:" time="14:00" timeLabel="Time:" />);

    const time = screen.getByText(/Date: 2024-01-15.*Time: 14:00/);
    expect(time).toBeInTheDocument();
  });

  it('should use time element with datetime attribute', () => {
    const {container} = render(<EventTime date="2024-01-15" time="14:00" />);

    const timeElement = container.querySelector('time');
    expect(timeElement).toHaveAttribute('dateTime', '2024-01-15 14:00');
  });

  it('should trim datetime attribute', () => {
    const {container} = render(<EventTime date="2024-01-15" />);

    const timeElement = container.querySelector('time');
    expect(timeElement).toHaveAttribute('dateTime', '2024-01-15');
  });

  it('should render with empty values', () => {
    const {container} = render(<EventTime />);

    const timeElement = container.querySelector('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '');
  });

  it('should apply event-time className', () => {
    const {container} = render(<EventTime />);
    expect(container.querySelector('.event-time')).toBeInTheDocument();
  });

  it('should not render date label when date is empty', () => {
    render(<EventTime dateLabel="Date:" time="14:00" timeLabel="Time:" />);

    expect(screen.queryByText('Date:')).not.toBeInTheDocument();
    expect(screen.getByText(/Time: 14:00/)).toBeInTheDocument();
  });

  it('should not render time label when time is empty', () => {
    render(<EventTime date="2024-01-15" dateLabel="Date:" timeLabel="Time:" />);

    expect(screen.getByText(/Date: 2024-01-15/)).toBeInTheDocument();
    expect(screen.queryByText(/Time:/)).not.toBeInTheDocument();
  });
});
