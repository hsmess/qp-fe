import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortableText from "@sanity/block-content-to-react"
import PricingTable from "../components/pricing-table";
import ImageCarousel from "../components/image-carousel"
import "../styles/the-club.scss"
import {slugify} from "../utils/utils";

export const query = graphql`
  query TheShopPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    theShop: sanityTheShop(id: { eq: "e60f1353-8a7f-5af4-bec7-ee65b2765418" }) {
        
        imageSlider {
              alt
              asset{
                 fluid(maxWidth: 2500) {
                 ...GatsbySanityImageFluid
                 }  
            }
        }
        _rawContent
        _rawPricingContent
        backgroundVideoUrl
       
        title
        pricing {
          rows{
            cells
          }
        }
    }
  }
`

const theShop = ({ data }) => {
  return (
    <Layout pageTitle={data.theShop.title}>
      <SEO
        title={`${data.theShop.title} | ${data.site.title}`}
        description={data.site.description}
      />
        {console.log(data.theShop)}
        {/* Carousel */}
        <div className='image-carousel-harness'>
            <ImageCarousel images={data.theShop.imageSlider} video={data.theShop.backgroundVideoUrl}/>
        </div>
      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides">
          <div className="your-visit__intro">
            <PortableText blocks={data.theShop._rawContent} />
          </div>
        </div>
          <div className="strip__middle strip__middle--central pad-sides">
              <div className="your-visit__intro">
                  <PortableText blocks={data.theShop._rawPricingContent} />
              </div>
              <PricingTable pricing={data.theShop.pricing} />
          </div>
      </div>
    </Layout>
  )
}

export default theShop
