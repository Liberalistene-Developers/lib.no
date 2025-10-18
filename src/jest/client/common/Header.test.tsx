import {render, screen} from '@testing-library/react';
import {Header} from '/react4xp/common/Header/Header';

// Mock the Menu component
jest.mock('/react4xp/common/Menu/Menu', () => ({
  Menu: ({menu}: {menu?: unknown}) => (
    <div data-testid="mock-menu">{menu ? 'Menu content' : 'No menu'}</div>
  ),
}));

describe('Header', () => {
  it('should render header element', () => {
    const {container} = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('bg-background-700');
  });

  it('should render logo when image is provided', () => {
    const image = {url: '/path/to/logo.png'};
    const title = 'Liberalistene';

    render(<Header image={image} title={title} />);

    const logo = screen.getByAltText('Liberalistene');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/path/to/logo.png');
  });

  it('should render logo link to home page', () => {
    const image = {url: '/path/to/logo.png'};

    const {container} = render(<Header image={image} />);

    const link = container.querySelector('a[href="/"]');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('title', 'Hjem');
  });

  it('should use title in alt text when provided', () => {
    const image = {url: '/path/to/logo.png'};
    const title = 'Custom Title';

    render(<Header image={image} title={title} />);

    const logo = screen.getByAltText('Custom Title');
    expect(logo).toBeInTheDocument();
  });

  it('should not render logo when image is not provided', () => {
    const {container} = render(<Header />);

    const link = container.querySelector('a[href="/"]');
    expect(link).not.toBeInTheDocument();
  });

  it('should render Menu component', () => {
    render(<Header />);
    expect(screen.getByTestId('mock-menu')).toBeInTheDocument();
  });

  it('should pass menu prop to Menu component', () => {
    const menu = {menuItems: []};

    render(<Header menu={menu} />);

    const menuElement = screen.getByTestId('mock-menu');
    expect(menuElement).toHaveTextContent('Menu content');
  });

  it('should render without menu prop', () => {
    render(<Header />);

    const menuElement = screen.getByTestId('mock-menu');
    expect(menuElement).toHaveTextContent('No menu');
  });
});
