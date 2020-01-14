import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../src/components/layout"
import SEO from "../src/components/seo"
import Faqs from "../src/components/faqs"
import PortableText from "@sanity/block-content-to-react"
import ImageCarousel from "../src/components/image-carousel"
import "../src/styles/your-visit.scss"
import {slugify} from "../utils/utils";

export const query = graphql`
  query YourVisitPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    yourVisit: sanityP2Yourvisit(
      id: { eq: "d51ef68b-b8ca-5676-8b2c-20d99dc282e7" }
    ) {
      title
      _rawIntroCopy
      faqTitle
      faqItems {
        _rawAnswer
        question
      }
      visitItems {
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

const YourVisit = ({ data }) => {
  console.log({ data })
  return (
    <Layout pageTitle={data.yourVisit.title}>
      <SEO
        title={`${data.yourVisit.title} | ${data.site.title}`}
        description={data.site.description}
      />
      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides">
          <div className="your-visit__intro">
            <PortableText blocks={data.yourVisit._rawIntroCopy} />
          </div>
        </div>
      </div>

      <div className="strip">
        <div className="strip__middle pad-sides your-visit-items">
          {data.yourVisit.visitItems.map((visitItem, idx) => {
            return (
              <div key={`your-visit-item_${idx}`} className="your-visit-item">
                <div className="your-visit-item__carousel-harness">
                    {console.log(visitItem.imageSlider)}
                  {visitItem.imageSlider && (
                    <ImageCarousel images={visitItem.imageSlider}  video={visitItem.video} />
                  )}
                </div>
                <div className="your-visit-item__content">
                  <div className="your-visit-item__title">
                    {visitItem.title}
                  </div>
                  <PortableText blocks={visitItem._rawContent} />
                  {visitItem.externalLink.map((link, idx) => {
                    return (
                      <div className="your-visit-link">
                        <a
                          href={link.ctaLink}
                          target="_blank"
                          className="your-visit-link__link"
                        >
                          {link.linkText}
                        </a>
                      </div>
                    )
                  })}
                  <div className="your-visit-item__button-section">
                      {
                          visitItem.genericPageSection.length > 0 &&
                          <Link className='button your-visit-item__button' to={'/your-visit/' + slugify(visitItem.title, visitItem.id)}>See More ↗</Link>
                      }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="strip__middle pad-sides">
          <Faqs items={data.yourVisit.faqItems} />
        </div>
      </div>
    </Layout>
  )
}

export default YourVisit
