import type {ComponentProps, RegionsData, PageData} from '@enonic/react-components';
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
  cssUrl?: string;
  regions?: RegionsData; // For content type processors that manually include regions
}

export const DefaultPage = ({meta, data, component}: ComponentProps) => {
  const pageData = data as DefaultPageData;
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
    cssUrl
  } = pageData;

  // Get regions from either:
  // 1. data prop (for content type processors that manually include regions)
  // 2. component prop (for page descriptor processors with automatic region processing)
  const regions: RegionsData | undefined = pageData.regions ||
    ('regions' in component ? (component as PageData).regions : undefined);

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
        {cssUrl && <link rel="stylesheet" href={cssUrl} />}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
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
          {/* DEBUG: isFragment={String(isFragment)}, regions={String(!!regions)}, regions.main={String(!!regions?.main)} */}
          {!isFragment && regions?.main && (
            <main>
              <Region
                data={regions.main.components}
                meta={meta}
                name="main"
              />
            </main>
          )}
          {!isFragment && !regions?.main && (
            <main>
              {/* DEBUG: Main region not rendering - regions.main is undefined */}
              <div style={{padding: '20px', background: '#ffcccc', border: '2px solid red'}}>
                DEBUG: Main region not available. isFragment={String(isFragment)}, hasRegions={String(!!regions)}, hasRegionsMain={String(!!regions?.main)}
              </div>
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
