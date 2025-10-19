/**
 * Tests for Menu component
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import {Menu} from '@common/Menu/Menu';
import type {MenuTree} from '/lib/menu';

describe('Menu', () => {
  const mockMenu: MenuTree = {
    ariaLabel: 'Main navigation',
    menuItems: [
      {
        title: 'Home',
        displayName: 'Home',
        menuName: null,
        path: '/',
        name: 'home',
        id: '1',
        hasChildren: false,
        inPath: false,
        isActive: false,
        newWindow: false,
        type: 'content',
        url: '/',
        children: [],
      },
      {
        title: 'About',
        displayName: 'About',
        menuName: null,
        path: '/about',
        name: 'about',
        id: '2',
        hasChildren: false,
        inPath: false,
        isActive: false,
        newWindow: false,
        type: 'content',
        url: '/about',
        children: [],
      },
      {
        title: 'External Link',
        displayName: 'External Link',
        menuName: null,
        path: '/external',
        name: 'external',
        id: '3',
        hasChildren: false,
        inPath: false,
        isActive: false,
        newWindow: true,
        type: 'content',
        url: 'https://example.com',
        children: [],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('should render menu with aria-label', () => {
      render(<Menu menu={mockMenu} />);

      const menuList = screen.getByRole('list', {name: 'Main navigation'});
      expect(menuList).toBeInTheDocument();
      expect(menuList).toHaveClass('main-menu');
    });

    it('should not render menu when menu prop is undefined', () => {
      render(<Menu menu={undefined} />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should not render menu when menu prop is not provided', () => {
      render(<Menu />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('menu items rendering', () => {
    it('should render all menu items', () => {
      render(<Menu menu={mockMenu} />);

      const menuItems = screen.getAllByRole('listitem');
      expect(menuItems).toHaveLength(3);
    });

    it('should render menu item links', () => {
      render(<Menu menu={mockMenu} />);

      expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', {name: 'About'})).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', {name: 'External Link'})).toHaveAttribute('href', 'https://example.com');
    });

    it('should set title attribute on links', () => {
      render(<Menu menu={mockMenu} />);

      expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('title', 'Home');
      expect(screen.getByRole('link', {name: 'About'})).toHaveAttribute('title', 'About');
    });

    it('should open external links in new window', () => {
      render(<Menu menu={mockMenu} />);

      const externalLink = screen.getByRole('link', {name: 'External Link'});
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noreferrer');
    });

    it('should open internal links in same window', () => {
      render(<Menu menu={mockMenu} />);

      const homeLink = screen.getByRole('link', {name: 'Home'});
      expect(homeLink).toHaveAttribute('target', '_self');
      expect(homeLink).not.toHaveAttribute('rel');
    });

    it('should render empty menu with no items', () => {
      const emptyMenu: MenuTree = {
        ariaLabel: 'Empty menu',
        menuItems: [],
      };

      render(<Menu menu={emptyMenu} />);

      const menuList = screen.getByRole('list', {name: 'Empty menu'});
      expect(menuList).toBeInTheDocument();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });

  describe('hamburger menu structure', () => {
    it('should render checkbox input for mobile menu toggle', () => {
      render(<Menu menu={mockMenu} />);

      const checkbox = document.querySelector('#overlay-input') as HTMLInputElement;
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveClass('hidden', 'peer');
    });

    it('should render label for mobile menu toggle', () => {
      render(<Menu menu={mockMenu} />);

      const label = document.querySelector('label[for="overlay-input"]');
      expect(label).toBeInTheDocument();
    });

    it('should render hamburger icon span', () => {
      render(<Menu menu={mockMenu} />);

      const label = document.querySelector('label[for="overlay-input"]');
      const hamburgerIcon = label?.querySelector('span');
      expect(hamburgerIcon).toBeInTheDocument();
      expect(hamburgerIcon).toHaveClass('cursor-pointer');
    });

    it('should render overlay div', () => {
      const {container} = render(<Menu menu={mockMenu} />);

      const overlay = container.querySelector('.overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply main-menu-wrapper class', () => {
      const {container} = render(<Menu menu={mockMenu} />);

      const wrapper = container.querySelector('.main-menu-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply correct classes to menu list', () => {
      render(<Menu menu={mockMenu} />);

      const menuList = screen.getByRole('list');
      expect(menuList).toHaveClass('main-menu');
      expect(menuList).toHaveClass('flex');
      expect(menuList).toHaveClass('list-none');
      expect(menuList).toHaveClass('p-0');
    });

    it('should apply correct classes to menu items', () => {
      render(<Menu menu={mockMenu} />);

      const menuItems = screen.getAllByRole('listitem');
      menuItems.forEach((item) => {
        expect(item).toHaveClass('mobile:p-4');
      });
    });

    it('should apply correct classes to menu links', () => {
      render(<Menu menu={mockMenu} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveClass('font-semibold');
        expect(link).toHaveClass('text-sm');
        expect(link).toHaveClass('text-primary-100');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle single menu item', () => {
      const singleItemMenu: MenuTree = {
        ariaLabel: 'Single item',
        menuItems: [
          {
            title: 'Only Item',
            displayName: 'Only Item',
            menuName: null,
            path: '/only',
            name: 'only',
            id: '1',
            hasChildren: false,
            inPath: false,
            isActive: false,
            newWindow: false,
            type: 'content',
            url: '/only',
            children: [],
          },
        ],
      };

      render(<Menu menu={singleItemMenu} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByRole('link', {name: 'Only Item'})).toBeInTheDocument();
    });

    it('should handle menu items with all newWindow true', () => {
      const allExternalMenu: MenuTree = {
        ariaLabel: 'External menu',
        menuItems: [
          {title: 'Link 1', displayName: 'Link 1', menuName: null, path: '/link1', name: 'link1', id: '1', hasChildren: false, inPath: false, isActive: false, type: 'content', url: 'https://example1.com', newWindow: true, children: []},
          {title: 'Link 2', displayName: 'Link 2', menuName: null, path: '/link2', name: 'link2', id: '2', hasChildren: false, inPath: false, isActive: false, type: 'content', url: 'https://example2.com', newWindow: true, children: []},
        ],
      };

      render(<Menu menu={allExternalMenu} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });

    it('should handle menu items with all newWindow false', () => {
      const allInternalMenu: MenuTree = {
        ariaLabel: 'Internal menu',
        menuItems: [
          {title: 'Link 1', displayName: 'Link 1', menuName: null, path: '/page1', name: 'page1', id: '1', hasChildren: false, inPath: false, isActive: false, type: 'content', url: '/page1', newWindow: false, children: []},
          {title: 'Link 2', displayName: 'Link 2', menuName: null, path: '/page2', name: 'page2', id: '2', hasChildren: false, inPath: false, isActive: false, type: 'content', url: '/page2', newWindow: false, children: []},
        ],
      };

      render(<Menu menu={allInternalMenu} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_self');
        expect(link).not.toHaveAttribute('rel');
      });
    });

    it('should render when ariaLabel is empty', () => {
      const menuWithoutLabel: MenuTree = {
        ariaLabel: '',
        menuItems: mockMenu.menuItems,
      };

      render(<Menu menu={menuWithoutLabel} />);

      // Should still render, just without aria-label value
      const menuList = screen.getByRole('list');
      expect(menuList).toBeInTheDocument();
    });
  });
});
