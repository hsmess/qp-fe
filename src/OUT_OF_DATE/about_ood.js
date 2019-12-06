import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../components/image-carousel';
import '../styles/about.scss';
import ImageOrVideo from '../components/image-or-video';

export const query = graphql`
  query OODAboutPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    about: sanityAbout(id: {eq: "f593c083-8d6d-559c-8587-0042da70f7a9"}) {
        title
        imageSlider {
          asset {
            fluid(maxWidth: 1200) {
              ...GatsbySanityImageFluid
            }
          }
        }
        video
        _rawContent
        aboutItems {
          title
          _rawContent
          asset {
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
          links {
            ctaLink
            linkText
          }
        }
      }
}

`;

const About = ({ data }) => {
  return (
    <Layout pageTitle={data.about.title}>
      <SEO title={`${data.about.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={data.about.imageSlider} video={data.about.video}/>
      </div>

      <div className='strip'>
        <div className='strip__middle strip__middle--central pad-sides'>

          <div className='about-intro'>
            <div className='about-intro__title'>
              <PortableText
                blocks={data.about._rawContent}
              />
            </div>
          </div>

        </div>

        <div className='strip__middle pad-sides'>
          {
            data.about.aboutItems.map((item, idx) => {
              console.log(item);
              return (
                <div key={idx} className='about-item'>

                  {
                    item.asset.length > 0 &&
                    <div className='about-item__carousel-harness'>
                      <ImageOrVideo asset={item.asset} caption={item.caption} />
                    </div>
                  }

                  <div className='about-item__content'>
                    <div className='about-item__title'>{item.title}</div>
                    <PortableText
                      blocks={item._rawContent}
                    />

                    {
                      item.links.length && item.links.map((link, idx) => {
                        return (
                          <div key={idx} className='about-item-link'>
                            <a href={link.ctaLink} className='about-item-link__link'>
                              {link.linkText} ↗
                            </a>
                          </div>
                        )
                      })
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

export default About;


