import React from 'react'

import '../../main/resources/assets/styles/main.scss'

export default {
  title: 'Parts/Responsive/Submenu'
}

const Template = () => (
  <main data-portal-region="main">
    <div
      data-portal-component-type="layout"
      className="content-holder normal  "
    >
      <div className="content">
        <div data-portal-region="content" className="content-item">
          <div data-portal-component-type="part" id="_72591286">
            <div className="sub-menu">
              <a
                href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/kjernesaker"
                className="menu-item"
                role="button"
              >
                <span className="menu-item-title">Kjernesaker</span>
              </a>
              <a
                href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram"
                className="menu-item"
                role="button"
              >
                <span className="menu-item-title">Partiprogram</span>
              </a>
              <a
                href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/faq"
                className="menu-item"
                role="button"
              >
                <span className="menu-item-title">FAQ</span>
              </a>
              <a
                href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/a-til-aa"
                className="menu-item"
                role="button"
              >
                <span className="menu-item-title">A til Å</span>
              </a>
              <a
                href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/strategi"
                className="menu-item"
                role="button"
              >
                <span className="menu-item-title">Strategi</span>
              </a>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
    <div
      data-portal-component-type="layout"
      className="content-holder normal  "
    >
      <div className="content">
        <div data-portal-region="content" className="content-item">
          <section data-portal-component-type="text">
            <h1 style={{ textAlign: 'center' }}>Partiprogram</h1>

            <figure className="captioned editor-align-justify">
              <img
                alt="Frihetsgudinnen partiprogram"
                src="Frihetsgudinnen.jpg"
                style={{ width: '100%' }}
              />
            </figure>

            <p>
              Liberalistenes partiprogram består av et prinsipprogram og
              valgprogram for kommune, fylke og Storting.
            </p>
          </section>
        </div>
        <div className="divider"></div>
      </div>
    </div>
    <div
      data-portal-component-type="layout"
      className="content-holder normal  "
    >
      <div className="content">
        <div className="content-item items">
          <div data-portal-region="top" className="content-child full">
            <div data-portal-component-type="part" id="_76293818">
              <div className="sub-menu">
                <a
                  href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/prinsipprogram"
                  className="menu-item"
                  role="button"
                >
                  <span className="menu-item-title">Prinsipprogram</span>
                </a>
                <a
                  href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/stortingsprogram"
                  className="menu-item"
                  role="button"
                >
                  <span className="menu-item-title">Stortingsprogram</span>
                </a>
              </div>
            </div>
          </div>
          <div data-portal-region="bottom" className="content-child full">
            <div data-portal-component-type="part" id="_87331594">
              <div className="sub-menu">
                <a
                  href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/fylkesprogram"
                  className="menu-item"
                  role="button"
                >
                  <span className="menu-item-title">Fylkesprogram</span>
                </a>
                <a
                  href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/kommuneprogram"
                  className="menu-item"
                  role="button"
                >
                  <span className="menu-item-title">Kommuneprogram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  </main>
)

export const Default = Template.bind({})
Default.args = {}
