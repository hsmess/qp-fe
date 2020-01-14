import React from 'react';
import Layout from '../../src/components/layout';
import SEO from '../../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../../src/components/image-carousel';
import "../../src/styles/your-visit.scss"

export const query = graphql`
  query YourVisitTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    yvp: sanityP2Yourvisit( id: { eq: "d51ef68b-b8ca-5676-8b2c-20d99dc282e7" }){
        title
    }
    yourVisit: sanityP2YourVisitPageItem(id: { eq: $id }) {
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

const YourVisit =  ({data}) => {
    return (
        <Layout pageTitle={data.yourVisit.title} breadcrumb={[
            {
                title: data.yvp.title,
                link: `/your-visit`
            }
        ]}>
            <SEO title={`${data.yourVisit.title} | ${data.site.title}`} description={data.site.description}/>
            {/* Carousel */}
            <div className='image-carousel-harness'>
                <ImageCarousel images={data.yourVisit.imageSlider} video={data.yourVisit.video}/>
            </div>

            <div className='strip'>
                <div className='strip__middle strip__middle--central pad-sides'>
                    <div className='your-visit-subpage__intro'>
                        <PortableText
                            blocks={data.yourVisit._rawContent}
                        />
                    </div>
                </div>

                <div className="strip__middle pad-sides">
                    {
                        data.yourVisit.genericPageSection.map((item, idx) => {
                            return (
                                <div key={idx} className="your-visit-subpage-item">
                                    <div className="your-visit-subpage-item__content">
                                        <div className="your-visit-subpage-item__title">{item.title}</div>
                                        <PortableText blocks={item._rawContent}/>
                                        {item.externalLink.map((link, idx) => {
                                            return (
                                                <div
                                                    key={`community_${idx}_link_{idx}`}
                                                    className="your-visit-subpage-item-link"
                                                >
                                                    <a
                                                        className="your-visit-subpage-item-link__link"
                                                        href={link.ctaLink}
                                                        target="_blank"
                                                    >
                                                        {link.linkText} ↗
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="your-visit-subpage-item__carousel-harness">
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

export default YourVisit;
