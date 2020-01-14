import React from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../../src/components/image-carousel';
import '../../src/styles/about.scss';

export const query = graphql`
  query AboutTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
     ap: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
        title
    }
    about: sanityP2AboutPageItem(id: { eq: $id }) {
       id
        title
        _rawContent
        imageSlider {
          alt
          asset {
             fluid(maxWidth: 2000) {
               ...GatsbySanityImageFluid
             }
           }
        }
        video
        genericPageSection {
          title
          imageSlider {
              alt
              asset {
                 fluid(maxWidth: 2000) {
                   ...GatsbySanityImageFluid
                 }
               }
           }
           video
          _rawContent
          externalLink {
            ctaLink
            linkText
          }
        }
    }
  }
  `;

const About =  ({data}) => {
  return (
    <Layout pageTitle={data.about.title} breadcrumb={[
      {
        title: data.ap.title,
        link: `/about`
      }
    ]}>
      <SEO title={`${data.about.title} | ${data.site.title}`} description={data.site.description}/>
        {/* Carousel */}
        <div className='image-carousel-harness'>
            <ImageCarousel images={data.about.imageSlider} video={data.about.video}/>
        </div>

        <div className='strip'>
            <div className='strip__middle strip__middle--central pad-sides'>
                <div className='about-subpage__intro'>
                    <PortableText
                        blocks={data.about._rawContent}
                    />
                </div>
            </div>

            <div className="strip__middle pad-sides">
                {
                    data.about.genericPageSection.map((item, idx) => {
                        return (
                            <div key={idx} className="about-subpage-item">
                                <div className="about-subpage-item__content">
                                    <div className="about-subpage-item__title">{item.title}</div>
                                    <PortableText blocks={item._rawContent}/>
                                    {item.externalLink.map((link, idx) => {
                                        return (
                                            <div
                                                key={`community_${idx}_link_{idx}`}
                                                className="about-subpage-item-link"
                                            >
                                                <a
                                                    className="about-subpage-item-link__link"
                                                    href={link.ctaLink}
                                                    target="_blank"
                                                >
                                                    {link.linkText} ↗
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="about-subpage-item__carousel-harness">
                                    <ImageCarousel images={item.imageSlider} video={item.video}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>

    </Layout>
  );
}

export default About;
