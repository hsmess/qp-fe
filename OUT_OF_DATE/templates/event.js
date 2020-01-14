import React from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import Img from 'gatsby-image';
import PortableText from '@sanity/block-content-to-react';
import BlockContent from '../block-content';
import ReactPlayer from 'react-player';
import { slugify } from '../../src/utils/utils';
import ImageCarousel from '../../src/components/image-carousel';
import '../../src/styles/story.scss';
import ImageOrVideo from '../components/image-or-video';
import {Link} from "gatsby";

export const query = graphql`
  query EventTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    event: sanityP2Event(id: {eq: $id}) {
      title
      artist
      _rawContent
      eventDates{
        eventDateRange{
           eventDateEnd
           eventDateStart
        }
        eventDates
      }
      limitedRemaining
      maxTicketPrice
      minTicketPrice
      promoter
      relatedEvents{
        image{
            asset{
              fluid(maxWidth: 1200) {
                 ...GatsbySanityImageFluid
               }
            }
        }
        title
        eventDates{
          eventDateRange{
             eventDateEnd
             eventDateStart
          }
          eventDates
        }
      }
      seasonTags{
        title
      }
      whatTags{
        title
      }
      specialTags{
        title
      }
      ticketLink
      ticketSaleDate
      venue
      soldOut
      image {
        asset{
          fluid(maxWidth: 1200) {
             ...GatsbySanityImageFluid
           }
        }
      }
    }
  }
  `;

const EventTemplate =  ({data}) => {
  return (
    <Layout pageTitle={data.event.title} breadcrumb={[
      {
        title: 'What\'s On',
        link: `/whats-on`
      }
    ]}>
      <SEO title={`${data.event.title} | ${data.site.title}`} description={data.site.description}/>


    </Layout>
  );
}

export default EventTemplate;
