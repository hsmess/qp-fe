import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortableText from "@sanity/block-content-to-react"
import BlockContent from "../OUT_OF_DATE/block-content"
import ReactPlayer from "react-player"
import { slugify } from "../utils/utils"
import "../styles/job-listing.scss"
import { Link } from "gatsby"

export const query = graphql`
  query ListingTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    listing: sanityP2Listing(id: { eq: $id }) {
      title
      _rawContent
      keyPoints
      externalLink {
        ctaLink
        linkText
      }
    }
    jobs: sanityP2Jobs(id: { eq: "fbc2d3b4-7870-55d3-989b-f7e41b85d416" }) {
      title
    }
    about: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
      title
    }
  }
`

const EventTemplate = ({ data }) => {
  console.log(data)
  return (
    <Layout
      pageTitle={data.listing.title}
      breadcrumb={[
        {
          title: data.about.title,
          link: `/about`,
        },
        {
          title: data.jobs.title,
          link: `/about/jobs`,
        },
      ]}
    >
      <SEO
        title={`${data.listing.title} | ${data.site.title}`}
        description={data.site.description}
      />

      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides">
          <ul className="job-listing__list">
            {data.listing.keyPoints.map((keyPoint, idx) => (
              <li key={`keyPoint_${idx}`} className="job-listing__list-item">
                {keyPoint}
              </li>
            ))}
          </ul>
          <PortableText blocks={data.listing._rawContent} />
          <div className="job-listing-item-link">
            <a
              href={data.listing.externalLink.ctaLink}
              className="job-listing-item-link__link"
              target="_blank"
            >
              {data.listing.externalLink.linkText} ↗
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EventTemplate
