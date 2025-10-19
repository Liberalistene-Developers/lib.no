import {render, screen} from '@testing-library/react';
import {Footer} from '/react4xp/common/Footer/Footer';

// Mock the Menu component
jest.mock('/react4xp/common/Menu/Menu', () => ({
  Menu: ({menu}: {menu?: unknown}) => (
    <div data-testid="mock-menu">{menu ? 'Menu content' : 'No menu'}</div>
  ),
}));

describe('Footer', () => {
  it('should render footer element', () => {
    const {container} = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('should render email with mailto link', () => {
    const email = 'kontakt@liberalistene.org';

    render(<Footer email={email} />);

    const emailLink = screen.getByRole('link', {name: email});
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${email}`);
  });

  it('should render phone number', () => {
    const phone = '+47 123 45 678';

    render(<Footer phone={phone} />);

    expect(screen.getByText(phone)).toBeInTheDocument();
  });

  it('should render place', () => {
    const place = 'Oslo, Norway';

    render(<Footer place={place} />);

    expect(screen.getByText(place)).toBeInTheDocument();
  });

  it('should render social media icons', () => {
    const some = [
      {href: 'https://facebook.com/liberalistene', className: 'fa-facebook'},
      {href: 'https://twitter.com/liberalistene', className: 'fa-twitter'},
    ];

    const {container} = render(<Footer some={some} />);

    const facebookIcon = container.querySelector('.fa-facebook');
    const twitterIcon = container.querySelector('.fa-twitter');

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
  });

  it('should not render social icons when some is empty', () => {
    const {container} = render(<Footer some={[]} />);

    const socialIcons = container.querySelector('.social-icons');
    expect(socialIcons).not.toBeInTheDocument();
  });

  it('should render Menu component', () => {
    render(<Footer />);
    expect(screen.getByTestId('mock-menu')).toBeInTheDocument();
  });

  it('should pass menu prop to Menu component', () => {
    const menu = {menuItems: []};

    render(<Footer menu={menu} />);

    const menuElement = screen.getByTestId('mock-menu');
    expect(menuElement).toHaveTextContent('Menu content');
  });

  it('should not render contact info when not provided', () => {
    const {container} = render(<Footer />);

    const place = container.querySelector('.place');
    const phone = container.querySelector('.phone');
    const email = container.querySelector('.email');

    expect(place).not.toBeInTheDocument();
    expect(phone).not.toBeInTheDocument();
    expect(email).not.toBeInTheDocument();
  });

  it('should render all contact info together', () => {
    const email = 'kontakt@liberalistene.org';
    const phone = '+47 123 45 678';
    const place = 'Oslo, Norway';

    render(<Footer email={email} phone={phone} place={place} />);

    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText(phone)).toBeInTheDocument();
    expect(screen.getByText(place)).toBeInTheDocument();
  });

  it('should render social links with correct href', () => {
    const some = [
      {href: 'https://facebook.com/liberalistene', className: 'fa-facebook'},
    ];

    const {container} = render(<Footer some={some} />);

    const link = container.querySelector('a[href="https://facebook.com/liberalistene"]');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
