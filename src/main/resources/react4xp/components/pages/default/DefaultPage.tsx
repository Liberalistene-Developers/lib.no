import type {ComponentProps, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

interface MenuItem {
  url: string;
  title: string;
  newWindow?: boolean;
}

interface Menu {
  ariaLabel?: string;
  menuItems: MenuItem[];
}

interface SocialItem {
  href: string;
  className: string;
}

export interface DefaultPageData extends Record<string, unknown> {
  title?: string;
  language?: string;
  image?: {
    url: string;
  };
  menu?: Menu;
  email?: string;
  phone?: string;
  place?: string;
  some?: SocialItem[];
  isFragment?: boolean;
  regions?: RegionsData;
}

export const DefaultPage = ({meta, data}: ComponentProps) => {
  const {
    title = 'Her kommer Liberalistene',
    language = 'no',
    image,
    menu,
    email,
    phone,
    place,
    some = [],
    isFragment = false,
    regions
  } = data as DefaultPageData;

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self' https://unpkg.com/* https://* 'unsafe-inline' 'unsafe-eval'"
        />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        />
      </head>
      <body data-portal-component-type="page">
        <div className="main-wrapper">
          <header>
            {image && (
              <a href="/" title="Hjem">
                <img
                  alt={title || 'Liberalistene Logo'}
                  src={image.url}
                />
              </a>
            )}
            {menu && (
              <div className="main-menu-wrapper">
                <input type="checkbox" id="overlay-input" />
                <label htmlFor="overlay-input"><span></span></label>
                <div className="overlay">
                  <ul className="main-menu" aria-label={menu.ariaLabel}>
                    {menu.menuItems.map((menuItem, index) => (
                      <li key={index}>
                        <a
                          href={menuItem.url}
                          title={menuItem.title}
                          target={menuItem.newWindow ? '_blank' : '_self'}
                          rel={menuItem.newWindow ? 'noreferrer' : undefined}
                        >
                          {menuItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </header>

          {/* Main Region */}
          {!isFragment && (
            <main>
              <Region
                data={regions?.main?.components}
                meta={meta}
                name="main"
              />
            </main>
          )}

          {/* Fragment Preview */}
          {isFragment && (
            <main>
              <div data-portal-component="fragment" />
            </main>
          )}

          {/* Footer */}
          <footer>
            <div className="footer-menu">
              {some.length > 0 && (
                <div className="social-icons">
                  {some.map((social, index) => (
                    <a key={index} href={social.href} rel="noreferrer">
                      <i className={`fab ${social.className}`}></i>
                    </a>
                  ))}
                </div>
              )}
              {menu && (
                <ul className="main-menu" aria-label={menu.ariaLabel}>
                  {menu.menuItems.map((menuItem, index) => (
                    <li key={index}>
                      <a
                        href={menuItem.url}
                        title={menuItem.title}
                        target={menuItem.newWindow ? '_blank' : '_self'}
                        rel={menuItem.newWindow ? 'noreferrer' : undefined}
                      >
                        {menuItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="contact">
              {place && <div className="place">{place}</div>}
              {phone && <div className="phone">{phone}</div>}
              {email && (
                <div className="email">
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              )}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};
