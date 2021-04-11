import React from 'react';

import '../../main/resources/assets/styles/main.scss';

export default {
  title: 'Parts/Responsive/Submenu',
};

const Template = () => (
	<main data-portal-region="main">
		<div data-portal-component-type="layout" class="content-holder normal  ">
		  <div class="content">
		    <div data-portal-region="content" class="content-item">
		        <div data-portal-component-type="part" id="_72591286">
              <div class="sub-menu">
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/kjernesaker" class="menu-item" role="button">
                  <span class="menu-item-title">Kjernesaker</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram" class="menu-item" role="button">
                  <span class="menu-item-title">Partiprogram</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/faq" class="menu-item" role="button">
                  <span class="menu-item-title">FAQ</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/a-til-aa" class="menu-item" role="button">
                  <span class="menu-item-title">A til Å</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/strategi" class="menu-item" role="button">
                  <span class="menu-item-title">Strategi</span>
                </a>
              </div>
            </div>		      
          </div>
		    <div class="divider"></div>
		  </div>
		</div>
    <div data-portal-component-type="layout" class="content-holder normal  ">
		  <div class="content">
		    <div data-portal-region="content" class="content-item">		      
		       <section data-portal-component-type="text">
            <h1 style={{ textAlign: 'center' }}>Partiprogram</h1>

        		<figure class="captioned editor-align-justify">
        			<img alt="Frihetsgudinnen partiprogram" src="Frihetsgudinnen.jpg" style={{width: '100%'}} />

        		</figure>

        		<p>Liberalistenes partiprogram består av et prinsipprogram og valgprogram for kommune, fylke og Storting.</p>
        	</section>		      
		    </div>
		    <div class="divider"></div>
		  </div>
		</div>
    <div data-portal-component-type="layout" class="content-holder normal  ">
      <div class="content">
        <div class="content-item items">
          <div data-portal-region="top" class="content-child full">
            
            <div data-portal-component-type="part" id="_76293818">
              <div class="sub-menu">
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/prinsipprogram" class="menu-item" role="button">
                  <span class="menu-item-title">Prinsipprogram</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/stortingsprogram" class="menu-item" role="button">
                  <span class="menu-item-title">Stortingsprogram</span>
                </a>
              </div>
            </div>
            
          </div>
          <div data-portal-region="bottom" class="content-child full">
            <div data-portal-component-type="part" id="_87331594">
              <div class="sub-menu">
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/fylkesprogram" class="menu-item" role="button">
                  <span class="menu-item-title">Fylkesprogram</span>
                </a>
                <a href="/admin/site/preview/default/draft/liberalistene-hovedside/politikk/partiprogram/kommuneprogram" class="menu-item" role="button">
                  <span class="menu-item-title">Kommuneprogram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
    </div>
	</main>
);

export const Default = Template.bind({});
Default.args = {};
