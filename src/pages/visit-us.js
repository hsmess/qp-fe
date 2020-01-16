import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortableText from "@sanity/block-content-to-react"
import PricingTable from "../components/pricing-table";
import ImageCarousel from "../components/image-carousel"
import "../styles/the-club.scss"
import {slugify} from "../utils/utils";
import ImageOrVideo from "../components/image-or-video";

export const query = graphql`
  query YourVisitPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    yourVisit: sanityYourVisit(id: { eq: "dee95f2b-d49c-5ef3-aab6-6e7135920e07" }) {
        _rawContent
        title
        yourVisitSections {
          _rawContent
          caption
          mapLocation
          subtitle
          asset {
              ... on SanityExtendedUrl {
                url
              }
              ... on SanityImage {
                asset{
                  fluid(maxWidth: 1200) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
        }
    }
  }
`

const VisitUs = ({ data }) => {
  return (
    <Layout pageTitle={data.yourVisit.title}>
      <SEO
        title={`${data.yourVisit.title} | ${data.site.title}`}
        description={data.site.description}
      />
        {/*{console.log(data.yourVisit)}*/}
        {/*/!* Carousel *!/*/}
        {/*<div className='image-carousel-harness'>*/}
        {/*    <ImageCarousel images={data.yourVisit.imageSlider} video={data.yourVisit.backgroundVideoUrl}/>*/}
        {/*</div>*/}
        <div className='strip'>
            <div className='strip__middle pad-sides'>
                <div className='story__intro limit-width'>
                    <PortableText
                        blocks={data.yourVisit._rawContent}
                    />
                </div>
            </div>
            <div className='strip__middle pad-sides'>
                {
                    data.yourVisit.yourVisitSections.map((item, idx) => {
                        return (
                            <div key={idx} className='story-item limit-width'>
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
  )
}

export default VisitUs
