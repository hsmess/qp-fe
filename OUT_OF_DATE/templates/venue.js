import React, {useState, useEffect, useMemo} from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import { slugify } from '../../src/utils/utils';
import '../../src/styles/venue.scss';
import ImageCarousel from '../components/image-carousel';
import '../images/tick-pink.svg';
import VenueConfigurations from "../components/venue-configurations";
import PricingTable from '../components/pricing-table';
import VenueBox from "../components/news-box";
import WoolwichLogo from "../components/woolwich-logo";
import Img from "gatsby-image";
export const query = graphql`
  query VenueTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    venue: sanityVenue(id: {eq: $id}) {
      people
      sqft
      clearHeight
      title
      imageSlider{
          asset{
             fluid(maxWidth: 1200) {
             ...GatsbySanityImageFluid
           }
       }
      }
      video
      story{
          title
      }
      configurationItems{
          _rawContent
           asset{
               ... on SanityImage {
                asset {
                  url
                   fluid(maxWidth: 1200) {
                     ...GatsbySanityImageFluid
                   }
                }
              }
              ... on SanityExtendedUrl {
                url
              }
           }
           navHeading
           title
      }
      pricing {
        rows {
          cells
        }
      }
      contactName
      contactEmail
      contactNumber
      _rawParagraph
      technicalSpec {
        asset {
          url
        }
      }
      suitableForTags {
        title
      }
      facilitiesTags {
        title
      }
      relatedVenues {
        people
        sqft
        title
        suitableForTags{
          title
        }
        preview {
          previewImage{
              asset{
                  fluid(maxWidth: 1200) {
                    ...GatsbySanityImageFluid
                  }
              }
          }
        }        
      }
    }
    venueHire: sanityVenueHire {
      title
    }
  }
`;

const VenueTemplate = ({ data }) => {
  const venue = data && data.venue;
  if (typeof window === 'undefined') {
    global.window = {}
  }
  // add box background colours into venues at the start

  let storyButton = null;
  if (venue.story != null) {
    storyButton =
      <Link to={'story/' + slugify(venue.story.title)} className="i-am-a-button">TBC: HOW DO WE NAME THIS BUTTON</Link>;
  }

  return (
    <Layout pageTitle={venue.title} breadcrumb={[
      {
        title: data.venueHire.title,
        link: `/venue-hire`
      }
    ]}>
      <SEO title={`${venue.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={venue.imageSlider} video={venue.video}/>
      </div>
      <div className='print-style-logo'>
        <WoolwichLogo classes='header__logo' />
      </div>
      <div className='print-style-title'>{venue.title}</div>
      <div className='strip strip--pad-top-small'>
        <div className='strip__middle pad-sides'>

          {/* Info boxes */}
          <div className='venue__info-boxes-harness'>
            <div className='venue-info-box'>
              <div className='venue-info-box__title'>Space</div>
              <div className='venue__top-line-info'>{venue.sqft}ft<sup>2</sup></div>
              <div className='venue__top-line-info'>Up to {venue.people} people</div>
              <div className='venue__top-line-info'>{venue.clearHeight}m clear height</div>
            </div>

            <div className='venue-info-box'>
              <div className='venue-info-box__title'>Facilities</div>
              {
                venue.facilitiesTags.map((tag, idx) => {
                  return <div key={idx} className='venue__top-line-info'>{tag.title}</div>
                })
              }
            </div>

            <div className='venue-info-box'>
              <div className='venue-info-box__title'>Suitable for</div>
              {
                venue.suitableForTags.map((tag, idx) => {
                  return <div key={idx} className='venue__top-line-info'>{tag.title}</div>
                })
              }
            </div>
          </div>

          {/* Description */}
          <div className='venue__description'>
            <div className='venue__description-title'>{venue.title}</div>
            <PortableText
              serializers={{ types: {} }}
              blocks={venue._rawParagraph}
            />
          </div>
          {
            venue.story &&
            <div className='venue__story'>
              <Link className='button generic-page__button' to={'story/' + slugify(venue.story.title)}>{venue.story.title} ↗</Link>
            </div>
          }
          {/* Configurations */}
          <VenueConfigurations items={venue.configurationItems} />

          <div className="venue-configurations__printonly">
            {
              venue.configurationItems.map((item, idx) => {
                return <div key={idx} className='configuration-item__item'>
                  <div className='venue-configurations__tab-title'>{item.title}</div>
                  <PortableText
                      serializers={{types: {}}}
                      blocks={item._rawContent}
                  />
                  <div className='venue-configurations__tab-pane venue-configurations__tab-pane--img'>
                    <Img fluid={item.asset[0].asset.fluid}/>
                  </div>
                </div>
              })


            }
          </div>

          {/* Pricing table */}
          <PricingTable pricing={venue.pricing} />

          {/* Misc Info */}
          <div className='venue__info-boxes-harness venue__info-boxes-harness--contact'>
            <div className='venue-info-box'>
              <div className='venue-contact__title'>Contact</div>
              <a className='venue-contact__link' href={`mailto:${venue.contactEmail}`}>Email {venue.contactName}</a>
              <a className='venue-contact__link' href={`tel:${venue.contactNumber}`}>{venue.contactNumber}</a>
            </div>

            <div className='venue-info-box tech-spec-print'>
              <div className='venue-contact__title'>Details</div>
              {
                venue.technicalSpec &&
                <a className='venue-contact__link'
                   href={`${venue.technicalSpec.asset.url}?dl=${slugify(venue.title)}.pdf`} download>Technical
                  Specifications PDF</a>
              }
              <a className='venue-contact__link' href='#' onClick={window.print}>Print this page</a>
            </div>
          </div>
        </div>
      </div>
      {
        !!venue.relatedVenues.length &&
        <div className='strip strip--beige venue__similar-venues'>
          <div className='strip__middle pad-sides'>
            <div className='venue__similar-venues__title'>Similar Venues</div>
            <div className='venue__similar-venues-box-list'>
              {
                venue.relatedVenues && venue.relatedVenues.map((venue, idx) => {
                      return (
                          <VenueBox data={venue} key={idx}/>
                      );
                    }
                )
              }
            </div>
          </div>
        </div>
      }

    </Layout>
  );
}

export default VenueTemplate;

