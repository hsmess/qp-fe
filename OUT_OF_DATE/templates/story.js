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
  query StoryTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    story: sanityStory(id: {eq: $id}) {
      title
      primaryImage {
        alt
        asset {
          id
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      hireThisSpaceVenue{
        title
      }
      _rawContent
      historySections{
        asset{
          ... on SanityImage {
             asset {
              fluid(maxWidth: 900) {
                ...GatsbySanityImageFluid
              }
            }
          }
          ... on SanityExtendedUrl {
            url
          }
        }
        _rawContent
        subtitle
        dateText
        caption
      }
    }
    
    history: sanityHistoryOfTheArsenal {
      title
    }
  }
  `;

const StoryTemplate =  ({data}) => {
  return (
    <Layout pageTitle={data.story.title} breadcrumb={[
      {
        title: data.history.title,
        link: `/history-of-the-arsenal`
      }
    ]}>
      <SEO title={`${data.story.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={[data.story.primaryImage]}/>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>
          <div className='story__intro limit-width'>
            <PortableText
              blocks={data.story._rawContent}
            />
          </div>
        </div>
        <div className='strip__middle pad-sides'>
          {
            data.story.hireThisSpaceVenue &&
            <Link className='button generic-page__button' to={'venues/' + slugify(data.story.hireThisSpaceVenue.title)}>Hire This Space ↗</Link>
          }
          {
            data.story.historySections.map((item, idx) => {
              return (
                <div key={idx} className='story-item limit-width'>
                  {
                    item.dateText &&
                    <div className='story-item__date'>{item.dateText}</div>
                  }
                  <div className='story-item__title'>{item.subtitle}</div>
                  <PortableText
                    blocks={item._rawContent}
                  />
                  {
                    item.asset.length > 0 &&
                    <ImageOrVideo asset={item.asset} caption={item.caption} controls={true} />
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default StoryTemplate;
