import React, { useRef } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import GraphQLErrorList from '../components/graphql-error-list';

import '../styles/index.scss';
import ImageFader from '../components/image-fader';
import BackgroundVideo from '../components/background-video';

export const query = graphql`
  query OODIndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    },
    
    home: sanityHomepage {
     backgroundVideoUrl,
     imageSlider{
        alt
        asset{
           fluid(maxWidth: 2500) {
           ...GatsbySanityImageFluid
         }
       }
      },
     overlayText
    },
    
    venue: sanityVenueHire {
        title
    },
    
    happening: sanityWhatsHappening {
        title
    },
    
    history: sanityHistoryOfTheArsenal {
        title
    },
  },
`;

const IndexPage = ({ data }) => {
  const videoContainer = useRef(null);
  const site = (data || {}).site;
  const home = (data || {}).home;

  return (
      <Layout isInHome>
        <SEO title={site.title} description={site.description}/>
        <div className='full-bleed-strip'>
          {
            home.backgroundVideoUrl !== null
                ? <BackgroundVideo url={home.backgroundVideoUrl}/>
                : <ImageFader images={home.imageSlider}/>
          }

          <div className='index__dark-layer' />

          <div className='strip__middle pad-sides'>
            <div className='index__title'>
              {home.overlayText}
            </div>
          </div>

          <div className='strip quicklinks'>
            <div className='strip__middle pad-sides quicklinks__inner'>
              <div><Link className='quicklinks__link' to='/venue-hire'>{data.venue.title}</Link></div>
              <div><Link className='quicklinks__link' to='/whats-happening'>{data.happening.title}</Link></div>
              <div><Link className='quicklinks__link' to='/history-of-the-arsenal'>{data.history.title}</Link></div>
            </div>
          </div>
        </div>
      </Layout>
  );
};

export default IndexPage;
