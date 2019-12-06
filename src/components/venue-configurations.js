import React, { useState } from 'react';
import Img from 'gatsby-image';
import PortableText from '@sanity/block-content-to-react';
import '../styles/venue-configurations.scss';

function VenueConfigurations ({items}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!items.length) return null;
  return (
    <div className='venue-configurations'>
      <div className='venue-configurations__title'>Configurations</div>
    
      <div className='venue-configurations__tabs'>
        {
          items.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`venue-configurations__tab ${idx === activeTab ? 'venue-configurations__tab--active' : ''}`}
                onClick={() => setActiveTab(idx)}>
                {item.navHeading}
              </div>
            );
          })
        }
      </div>
      
      {
        items.map((item, idx) => {
          return (
            <div key={idx} className={`venue-configurations__tab-panel ${idx !== activeTab ? 'venue-configurations__tab-panel--hidden' : ''}`}>
              <div className='venue-configurations__tab-pane venue-configurations__tab-pane--info'>
                <div className='venue-configurations__tab-title'>{item.title}</div>
                <PortableText
                  serializers={{types: {}}}
                  blocks={item._rawContent}
                />
              </div>
              <div className='venue-configurations__tab-pane venue-configurations__tab-pane--img'>
                <Img fluid={item.asset[0].asset.fluid}/>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

VenueConfigurations.propTypes = {};

VenueConfigurations.defaultProps = {};

export default VenueConfigurations;
