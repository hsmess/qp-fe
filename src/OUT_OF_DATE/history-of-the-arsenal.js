import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import { slugify } from '../utils/utils';
import ImageCarousel from '../components/image-carousel';
import '../styles/history-of-the-arsenal.scss';


export const query = graphql`
  query HistoryOfTheArsenalPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    history: sanityHistoryOfTheArsenal {
      title
      _rawContent
      imageSlider {
        asset{
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      stories {
        title
          primaryImage {
            alt
            asset {
              id
            }
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawContent
          historySections{
            _type
          }
      }
      video
    }
  }
`;

const HistoryOfTheArsenal = ({ data }) => {
  return (
    <Layout pageTitle={data.history.title}>
      <SEO title={`${data.history.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={data.history.imageSlider} video={data.history.video}/>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>
          <div className='history__intro limit-width'>
            <PortableText
              blocks={data.history._rawContent}
            />
          </div>
        </div>
        <div className='strip__middle pad-sides'>
          {
            data.history.stories.map((item, idx) => {
              return (
                <div key={idx} className='history-item'>
                  <div className='history-item__carousel-harness'>
                    <ImageCarousel images={[item.primaryImage]}/>
                  </div>
                  <div className='history-item__content'>
                    <div className='history-item__title'>{item.title}</div>
                    <PortableText
                      blocks={item._rawContent}
                    />
                    {
                      item.historySections.length > 0 &&
                      <Link className='button history-item__button' to={'/story/' + slugify(item.title)}>See More ↗</Link>
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
};

export default HistoryOfTheArsenal;
