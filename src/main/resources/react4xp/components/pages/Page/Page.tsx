import {Regions, type RegionData, type ComponentProps, type PageData} from '@enonic/react-components';

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
  regions: RegionData
}

export const Page = ({meta, data, common, component}: ComponentProps<PageData>) => {
  const pageData = data as DefaultPageData;
  const {
    title,
    image,
    menu,
    email,
    phone,
    place,
    some = [],
    isFragment = false,
    regions
  } = pageData;

  // Get regions from either:
  // 1. data prop (for content type processors that manually include regions)
  // 2. component prop (for page descriptor processors with automatic region processing)

  console.info('So far so good - DefaultPage rendering');

  return (
    <>
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
          {!isFragment && regions?.name === 'main' && (
            <main>
              <Regions
                meta={meta}
                common={common}
                component={component}
              />
            </main>
          )}
          {!isFragment && regions?.name !== 'main' && (
            <main>
              {/* DEBUG: Main region not rendering - regions.main is undefined */}
              <div style={{padding: '20px', background: '#ffcccc', border: '2px solid red'}}>
                DEBUG: Main region not available. isFragment={String(isFragment)}, hasRegions={regions !== undefined }, hasRegionsMain={regions?.name === 'main'}
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
    </>
  );
};
