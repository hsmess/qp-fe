import React from "react"
import { graphql, Link } from "gatsby"
import PortableText from "@sanity/block-content-to-react"
import Layout from "../src/components/layout"
import SEO from "../src/components/seo"
import ImageCarousel from "../src/components/image-carousel"
import "../src/styles/about.scss"
import AboutBox from "../components/about-box"
import ImageOrVideo from "../components/image-or-video"
import {slugify} from "../utils/utils";

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    people: sanityP2PeoplePage(
      id: { eq: "71c4925c-6e9e-574c-a0d9-25cb6f10302e" }
    ) {
      image {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
    }
    companies: sanityP2CompaniesPage(
      id: { eq: "d6152b95-5858-5f48-ad6a-688fe461284e" }
    ) {
      image {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
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
    }
    about: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
      title
      primaryImage {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      _rawAboutCopy
      content {
        id
        imageSlider {
          alt
          asset {
             fluid(maxWidth: 2000) {
               ...GatsbySanityImageFluid
             }
           }
        }
        video
        title
        genericPageSection{
          title
        }
        _rawContent
        externalLink {
          ctaLink
          linkText
        }
      }
    }
  }
`

const About = ({ data }) => {
  return (
    <Layout pageTitle={data.about.title}>
      <SEO
        title={`${data.about.title} | ${data.site.title}`}
        description={data.site.description}
      />
      {/* Carousel */}
      <div className="image-carousel-harness">
        {data.about.primaryImage && (
          <ImageCarousel images={[data.about.primaryImage]} />
        )}
      </div>
      <div className="strip">
        <div className="strip__middle pad-sides">
          <div className="about-intro limit-width">
            <div className="about-intro__title">
              <PortableText blocks={data.about._rawAboutCopy} />
            </div>
          </div>
        </div>
      </div>

      <div className="strip">
        <div className="strip__middle pad-sides">
          <div className="about-box-list">
            <AboutBox
              image={data.companies.image}
              title={data.companies.title}
              colour="pink"
              url="/about/resident-companies"
            />
            <AboutBox
              image={data.jobs.image}
              title={data.jobs.title}
              colour="purple"
              url="/about/jobs"
            />
            <AboutBox
              image={data.people.image}
              title={data.people.title}
              colour="blue"
              url="/about/people"
            />
          </div>
        </div>

          <div className="strip__middle pad-sides about-items">
              {data.about.content.map((aboutItem, idx) => {
                  return (
                      <div key={`about-item_${idx}`} className="about-item">
                          <div className="about-item__carousel-harness">
                              {aboutItem.imageSlider && (
                                  <ImageCarousel images={aboutItem.imageSlider}  video={aboutItem.video} />
                              )}
                          </div>
                          <div className="about-item__content">
                              <div className="about-item__title">
                                  {aboutItem.title}
                              </div>
                              <PortableText blocks={aboutItem._rawContent} />
                              {aboutItem.externalLink.map((link, idx) => {
                                  return (
                                      <div className="about-link">
                                          <a
                                              href={link.ctaLink}
                                              target="_blank"
                                              className="about-link__link"
                                          >
                                              {link.linkText}
                                          </a>
                                      </div>
                                  )
                              })}
                              <div className="about-item__button-section">
                                  {
                                      aboutItem.genericPageSection.length > 0 &&
                                      <Link className='button about-item__button' to={'/about/' + slugify(aboutItem.title, aboutItem.id)}>See More ↗</Link>
                                  }
                              </div>
                          </div>
                      </div>
                  )
              })}
          </div>


      </div>
    </Layout>
  )
}

export default About
