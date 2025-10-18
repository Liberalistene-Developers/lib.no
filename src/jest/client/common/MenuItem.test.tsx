import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MenuItem} from '/react4xp/common/MenuItem/MenuItem';

describe('MenuItem', () => {
  it('should render menu item with title', () => {
    render(<MenuItem title="Home" url="/" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    render(<MenuItem title="About" url="/about" />);

    const link = screen.getByRole('button', {name: 'About'});
    expect(link).toHaveAttribute('href', '/about');
  });

  it('should render with empty title when not provided', () => {
    const {container} = render(<MenuItem url="/" />);

    const span = container.querySelector('span');
    expect(span).toHaveTextContent('');
  });

  it('should apply correct styling classes', () => {
    render(<MenuItem title="Test" url="/" />);

    const link = screen.getByRole('button', {name: 'Test'});
    expect(link).toHaveClass('bg-primary-700');
    expect(link).toHaveClass('border-background-700');
    expect(link).toHaveClass('skew-x-[20deg]');
  });

  it('should apply negative skew to inner span', () => {
    const {container} = render(<MenuItem title="Test" url="/" />);

    const span = container.querySelector('span');
    expect(span).toHaveClass('-skew-x-[20deg]');
  });

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<MenuItem title="Clickable" url="/" onClick={handleClick} />);

    const link = screen.getByRole('button', {name: 'Clickable'});
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render without onClick handler', () => {
    render(<MenuItem title="No Click" url="/" />);

    const link = screen.getByRole('button', {name: 'No Click'});
    expect(link).toBeInTheDocument();
  });

  it('should render with all props', () => {
    const handleClick = jest.fn();

    render(
      <MenuItem
        title="Complete"
        url="/complete"
        onClick={handleClick}
      />
    );

    const link = screen.getByRole('button', {name: 'Complete'});
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/complete');
  });
});
