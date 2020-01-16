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
  query TheClubPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    theClub: sanityTheClub(id: { eq: "e8700271-0bac-5f29-8fee-c4a994f290ec" }) {
        _rawContent
        _rawMembershipContent
        backgroundVideoUrl
        imageSlider {
              alt
              asset{
                 fluid(maxWidth: 2500) {
                 ...GatsbySanityImageFluid
                 }  
            }
        }
        title
        pricing {
          rows{
            cells
          }
        }
    }
  }
`

const TheClub = ({ data }) => {
  return (
    <Layout pageTitle={data.theClub.title}>
      <SEO
        title={`${data.theClub.title} | ${data.site.title}`}
        description={data.site.description}
      />
        {console.log(data.theClub)}
        {/* Carousel */}
        <div className='image-carousel-harness'>
            <ImageCarousel images={data.theClub.imageSlider} video={data.theClub.backgroundVideoUrl}/>
        </div>
      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides">
          <div className="your-visit__intro">
            <PortableText blocks={data.theClub._rawContent} />
          </div>
        </div>
          <div className="strip__middle strip__middle--central pad-sides">
              <div className="your-visit__intro">
                  <PortableText blocks={data.theClub._rawMembershipContent} />
              </div>
              <PricingTable pricing={data.theClub.pricing} />
          </div>
      </div>
    </Layout>
  )
}

export default TheClub
