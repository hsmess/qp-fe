import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../src/components/image-carousel';
import '../src/styles/about.scss';
import ImageOrVideo from '../components/image-or-video';

export const query = graphql`
  query WhatsOnPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    whatson: sanityP2Whatson(id: {eq: "94896bc7-b6ae-5dfa-ba4a-89c582acdd74"}) {
      title
    }
    events: allSanityP2Event {
        edges {
          node {
            id
            image{
              asset{
                fluid{
                  src
                }
              }
            }
            eventDates{
              eventDateRange{
                eventDateEnd
                eventDateStart
              }
              eventDates
            }
            title
          }
        }
    }
    specialtags:  sanitySpecialTag {
      id
      title
    }
    whattags: sanityWhatTag {
      id
      title
    }
}

`;

const WhatsOn = ({ data }) => {
  return (
    <Layout pageTitle={data.whatson.title}>
      <SEO title={`${data.whatson.title} | ${data.site.title}`} description={data.site.description}/>

    </Layout>
  );
};

export default WhatsOn;


