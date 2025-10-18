import type { MenuTree } from '/lib/menu';
import { Menu } from '/react4xp/common/Menu/Menu';

/**
 * Social media link configuration.
 */
interface SocialLink {
  /** URL to the social media profile */
  href: string;
  /** FontAwesome icon class name (e.g., "fa-facebook") */
  className: string;
}

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /** Contact email address */
  email?: string;
  /** Contact phone number */
  phone?: string;
  /** Physical location/address */
  place?: string;
  /** Menu tree structure for footer navigation */
  menu?: MenuTree;
  /** Array of social media links */
  some?: SocialLink[];
}

/**
 * Footer component for the site-wide footer section.
 *
 * Renders a two-row footer with:
 * - **Top row:** Social media icons (left), footer menu (center)
 * - **Bottom row:** Contact information (place, phone, email) in three columns
 *
 * The footer is absolutely positioned at the bottom of the page.
 *
 * @example
 * ```tsx
 * <Footer
 *   email="post@liberalistene.org"
 *   phone="+47 123 45 678"
 *   place="Oslo, Norway"
 *   menu={footerMenuTree}
 *   some={[
 *     {href: 'https://facebook.com/liberalistene', className: 'fa-facebook'},
 *     {href: 'https://twitter.com/liberalistene', className: 'fa-twitter'}
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - Social icons are displayed on the left side (or centered on mobile)
 * - Contact sections are evenly distributed (1/3 width each) and stack on mobile
 * - Email is rendered as a clickable mailto link
 * - Uses FontAwesome icons for social media (via the `fab` class prefix)
 */
export const Footer = ({
  menu,
  email,
  phone,
  place,
  some = [],
}: FooterProps) => (
  <footer className="absolute bottom-0 flex flex-col w-full">
    <div className="footer-menu flex border border-[#F4F4F4] -mx-px min-h-[60px] px-5 items-center justify-center content-center mobile:flex-col">
      {some.length > 0 && (
        <div className="social-icons flex items-center text-[23px] gap-[10px] leading-[23px] absolute pl-5 left-0 mobile:justify-center mobile:pl-0 mobile:static">
          {some.map((social, index) => (
            <a key={index} href={social.href} rel="noreferrer" className="bg-background-700 text-[#63678A] no-underline">
              <i className={`fab ${social.className} text-center min-w-[24px] min-h-[24px]`}></i>
            </a>
          ))}
        </div>
      )}
      <Menu menu={menu} />
    </div>
    <div className="contact flex justify-between items-center mobile:flex-col">
      {place && <div className="place h-[60px] flex items-center justify-center w-1/3 mobile:w-full">{place}</div>}
      {phone && <div className="phone h-[60px] flex items-center justify-center w-1/3 mobile:w-full">{phone}</div>}
      {email && (
        <div className="email h-[60px] flex items-center justify-center w-1/3 mobile:w-full">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      )}
    </div>
  </footer>
);
