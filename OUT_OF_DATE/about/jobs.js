import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../src/components/layout"
import SEO from "../../src/components/seo"
import PortableText from "@sanity/block-content-to-react"
import ImageCarousel from "../../src/components/image-carousel"
import "../../src/styles/about-jobs.scss"
import ImageOrVideo from "../../components/image-or-video"
import { slugify } from "../../utils/utils"
import Img from "gatsby-image"

export const query = graphql`
  query JobsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    jobs: sanityP2Jobs(id: { eq: "fbc2d3b4-7870-55d3-989b-f7e41b85d416" }) {
      image {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      jobsTitle
      _rawJobsContent
      jobListings {
        id
        title
        _rawPreviewContent
      }
      workExpTitle
      _rawWorkExpContent
      workExpListings {
        id
        title
        _rawPreviewContent
      }
      volunteerTitle
      _rawVolunteerContent
      volunteerListings {
        id
        title
        _rawPreviewContent
      }
    }
    about: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
      title
    }
  }
`

// use slugify to link to template pages
//<Link className='button generic-page__button' to={'jobs/' + slugify(data.story.hireThisSpaceVenue.title)}>Hire This Space ↗</Link>

const JobListing = ({ id, title, _rawPreviewContent }) => (
  <div key={id} className="jobs-listing-item">
    <div className="jobs-listing-item__title">{title}</div>
    <PortableText blocks={_rawPreviewContent} />
    <div className="jobs-listing-link">
      <Link
        className="jobs-listing-link__link"
        to={`/listing/${slugify(title, id)}/`}
      >
        Read more
      </Link>
    </div>
  </div>
)

const Jobs = ({ data }) => {
  return (
    <Layout
      pageTitle={data.jobs.title}
      breadcrumb={[
        {
          title: data.about.title,
          link: `/about`,
        },
      ]}
    >
      <SEO
        title={`${data.jobs.title} | ${data.site.title}`}
        description={data.site.description}
      />
      <div className="jobs-image-harness">
        {data.jobs.image && <Img fluid={data.jobs.image.asset.fluid} />}
      </div>
      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides jobs-listing-group">
          <div className="jobs-subtitle">{data.jobs.jobsTitle}</div>
          <PortableText blocks={data.jobs._rawJobsContent} />
          <div className="job-listings">
            {data.jobs.jobListings.map(job => (
              <JobListing {...job} />
            ))}
          </div>
        </div>

        <div className="strip__middle strip__middle--central pad-sides jobs-listing-group">
          <div className="jobs-subtitle">{data.jobs.workExpTitle}</div>
          <PortableText blocks={data.jobs._rawWorkExpContent} />
          <div className="job-listings">
            {data.jobs.workExpListings.map(job => (
              <JobListing {...job} />
            ))}
          </div>
        </div>

        <div className="strip__middle strip__middle--central pad-sides jobs-listing-group">
          <div className="jobs-subtitle">{data.jobs.volunteerTitle}</div>
          <PortableText blocks={data.jobs._rawVolunteerContent} />
          <div className="job-listings">
            {data.jobs.volunteerListings.map(job => (
              <JobListing {...job} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Jobs
