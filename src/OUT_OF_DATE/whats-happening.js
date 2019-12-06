import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../components/image-carousel';
import '../styles/whats-happening.scss';
import Faqs from '../components/faqs';

export const query = graphql`
  query WhatsHappeningPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    happening: sanityWhatsHappening {
      id
      title
      _rawContent
      intro
      imageSlider {
        asset{
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      video
      faqItems {
         _rawAnswer
         question
      }
      happeningItems {
        _rawContent
        imageSlider {
          asset{
            fluid(maxWidth: 1200) {
              ...GatsbySanityImageFluid
            }
          }
        }
        title
        video
      }
    }
    
  }
`;

const WhatsHappening = ({ data }) => {
  return (
    <Layout pageTitle={data.happening.title}>
      <SEO title={`${data.happening.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={data.happening.imageSlider} video={data.happening.video}/>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>

          <div className='happening-intro limit-width'>
            <div className='happening-intro__title'>{data.happening.intro}</div>
            <PortableText
              blocks={data.happening._rawContent}
            />
          </div>

        </div>

        <div className='strip__middle pad-sides'>
          {
            data.happening.happeningItems.map((item, idx) => {
              return (
                <div key={idx} className='happening-item'>
                  <div className='happening-item__carousel-harness'>
                    <ImageCarousel images={item.imageSlider} video={item.video} autoPlay={false} controls={true}/>
                  </div>
                  <div className='happening-item__content'>
                    <div className='happening-item__title'>{item.title}</div>
                    <PortableText
                      blocks={item._rawContent}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className='strip__middle pad-sides'>
          <Faqs items={data.happening.faqItems} />
        </div>
      </div>
    </Layout>
  );
};

export default WhatsHappening;


