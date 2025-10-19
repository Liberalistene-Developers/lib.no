import type { MenuTree } from '/lib/menu';

/**
 * Props for the Menu component
 */
interface MenuProps {
  /** Menu tree data structure containing menu items */
  menu?: MenuTree;
}

/**
 * Menu component displays the main navigation menu with mobile responsive overlay.
 *
 * Renders a horizontal navigation menu on desktop that transforms into a hamburger
 * menu with full-screen overlay on mobile. The mobile menu uses a checkbox-based
 * toggle mechanism with animated hamburger icon. Menu items support external links
 * with target="_blank" when newWindow is true.
 *
 * @example
 * ```tsx
 * <Menu
 *   menu={{
 *     ariaLabel: 'Main navigation',
 *     menuItems: [
 *       {title: 'Home', url: '/', newWindow: false},
 *       {title: 'About', url: '/about', newWindow: false}
 *     ]
 *   }}
 * />
 * ```
 */
export const Menu = ({ menu }: MenuProps ) => {

  return (
    <>
      {menu && (
        <div className="main-menu-wrapper">
          <input type="checkbox" id="overlay-input" className="hidden peer" />
          <label htmlFor="overlay-input" className="hidden mobile:block absolute right-2.5 top-[25px] z-[25] cursor-pointer select-none">
            <span className="cursor-pointer h-1 w-[35px] rounded-[2px] bg-primary-700 relative block transition-all duration-200 ease-in-out
                           before:content-[''] before:absolute before:h-1 before:w-[35px] before:rounded-[2px] before:bg-primary-700 before:top-[-10px] before:transition-all before:duration-200 before:ease-in-out
                           after:content-[''] after:absolute after:h-1 after:w-[35px] after:rounded-[2px] after:bg-primary-700 after:top-[10px] after:transition-all after:duration-200 after:ease-in-out
                           peer-checked:bg-transparent peer-checked:before:rotate-45 peer-checked:before:translate-x-[7px] peer-checked:before:translate-y-[7px] peer-checked:after:-rotate-45 peer-checked:after:translate-x-[7px] peer-checked:after:-translate-y-[7px]
                           hover:bg-primary-100 hover:before:bg-primary-100 hover:after:bg-primary-100 peer-checked:hover:bg-transparent"></span>
          </label>
          <div className="overlay mobile:h-[110vh] mobile:w-screen mobile:bg-menu-bg mobile:z-20 mobile:invisible mobile:fixed mobile:left-0 mobile:top-0 peer-checked:visible">
            <ul className="main-menu flex list-none p-0 mobile:flex-col mobile:justify-center mobile:items-center mobile:text-center mobile:h-screen" aria-label={menu.ariaLabel}>
              {menu.menuItems.map((menuItem, index) => (
                <li key={index} className="mobile:p-4">
                  <a
                    href={menuItem.url}
                    title={menuItem.title}
                    target={menuItem.newWindow ? '_blank' : '_self'}
                    rel={menuItem.newWindow ? 'noreferrer' : undefined}
                    className="font-semibold text-sm leading-[17px] flex items-center text-center px-5 py-0 text-primary-100 hover:text-primary-700 mobile:no-underline mobile:text-2xl"
                  >
                    {menuItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
