import {render, screen} from '@testing-library/react';
import {Submenu} from '/react4xp/common/Submenu/Submenu';

// Mock MenuItem component
jest.mock('/react4xp/common/MenuItem/MenuItem', () => ({
  MenuItem: ({title, url}: {title?: string; url?: string}) => (
    <a href={url} data-testid="menu-item">
      {title}
    </a>
  ),
}));

describe('Submenu', () => {
  it('should render without items', () => {
    const {container} = render(<Submenu />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render empty div when items array is empty', () => {
    const {container} = render(<Submenu items={[]} />);
    const menuItems = container.querySelectorAll('[data-testid="menu-item"]');
    expect(menuItems).toHaveLength(0);
  });

  it('should render single menu item', () => {
    const items = [
      {itemID: '1', title: 'Home', url: '/'},
    ];

    render(<Submenu items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('should render multiple menu items', () => {
    const items = [
      {itemID: '1', title: 'Home', url: '/'},
      {itemID: '2', title: 'About', url: '/about'},
      {itemID: '3', title: 'Contact', url: '/contact'},
    ];

    render(<Submenu items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should pass correct props to MenuItem components', () => {
    const items = [
      {itemID: '1', title: 'Test', url: '/test'},
    ];

    render(<Submenu items={items} />);

    const menuItem = screen.getByRole('link', {name: 'Test'});
    expect(menuItem).toHaveAttribute('href', '/test');
  });

  it('should use itemID as key for each MenuItem', () => {
    const items = [
      {itemID: 'unique-1', title: 'First', url: '/first'},
      {itemID: 'unique-2', title: 'Second', url: '/second'},
    ];

    const {container} = render(<Submenu items={items} />);
    const menuItems = container.querySelectorAll('[data-testid="menu-item"]');

    expect(menuItems).toHaveLength(2);
  });

  it('should apply correct container styling', () => {
    const {container} = render(<Submenu items={[]} />);
    const wrapper = container.querySelector('div');

    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('justify-center');
    expect(wrapper).toHaveClass('flex-wrap');
    expect(wrapper).toHaveClass('content-center');
    expect(wrapper).toHaveClass('mobile:flex-col');
  });

  it('should handle items without all properties', () => {
    const items = [
      {itemID: '1'},
      {title: 'No ID'},
      {url: '/no-title'},
    ];

    const {container} = render(<Submenu items={items} />);
    const menuItems = container.querySelectorAll('[data-testid="menu-item"]');

    expect(menuItems).toHaveLength(3);
  });
});
