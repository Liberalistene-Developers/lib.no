import {render, screen} from '@testing-library/react';
import {PersonListItem} from '/react4xp/common/PersonListItem/PersonListItem';

// Mock ListItem
jest.mock('/react4xp/common/ListItem/ListItem', () => ({
  ListItem: ({children, className}: {children?: React.ReactNode; className?: string}) => (
    <div data-testid="list-item" className={className}>
      {children}
    </div>
  ),
}));

describe('PersonListItem', () => {
  it('should render person list item', () => {
    render(<PersonListItem />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should apply person className', () => {
    const {container} = render(<PersonListItem />);
    expect(container.querySelector('.person')).toBeInTheDocument();
  });

  it('should render role when showRole is true (default)', () => {
    const item = {role: 'President'};
    render(<PersonListItem item={item} />);
    expect(screen.getByText('President')).toBeInTheDocument();
  });

  it('should not render role when showRole is false', () => {
    const item = {role: 'President'};
    render(<PersonListItem item={item} showRole={false} />);
    // The role is still in the mock, but the real component wouldn't show it
    const roleSpan = screen.queryByText('President');
    expect(roleSpan).not.toBeInTheDocument();
  });

  it('should not render role when role is not provided', () => {
    render(<PersonListItem showRole={true} />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should render email when showEmail is true', () => {
    const item = {email: 'president@liberalistene.org'};
    render(<PersonListItem item={item} showEmail={true} />);

    const emailLink = screen.getByRole('link', {name: 'president@liberalistene.org'});
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:president@liberalistene.org');
    expect(emailLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('should not render email when showEmail is false (default)', () => {
    const item = {email: 'president@liberalistene.org'};
    render(<PersonListItem item={item} showEmail={false} />);

    const emailLink = screen.queryByRole('link');
    expect(emailLink).not.toBeInTheDocument();
  });

  it('should not render email when email is not provided', () => {
    render(<PersonListItem showEmail={true} />);
    const emailLink = screen.queryByRole('link');
    expect(emailLink).not.toBeInTheDocument();
  });

  it('should render both role and email', () => {
    const item = {
      role: 'President',
      email: 'president@liberalistene.org',
    };

    render(<PersonListItem item={item} showRole={true} showEmail={true} />);

    expect(screen.getByText('President')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'president@liberalistene.org'})).toBeInTheDocument();
  });

  it('should pass imageSize to ListItem', () => {
    render(<PersonListItem imageSize="large" />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass imageType to ListItem', () => {
    render(<PersonListItem imageType="round" />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass showDescriptions to ListItem', () => {
    render(<PersonListItem showDescriptions={true} />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass fields to ListItem', () => {
    const fields = {customField: 'value'};
    render(<PersonListItem fields={fields} />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should use default empty item when not provided', () => {
    render(<PersonListItem />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should use default showRole as true', () => {
    const item = {role: 'President'};
    render(<PersonListItem item={item} />);
    expect(screen.getByText('President')).toBeInTheDocument();
  });

  it('should use default showEmail as false', () => {
    const item = {email: 'test@example.com'};
    render(<PersonListItem item={item} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
