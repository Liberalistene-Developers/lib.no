import type { MenuTree } from '/lib/menu';
import { Menu } from '../Menu/Menu';

interface FooterProps {
  email?: string;
  phone?: string;
  place?: string;
  menu?: MenuTree;
  some?: Array<{
    href: string;
    className: string;
  }>;
}

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
