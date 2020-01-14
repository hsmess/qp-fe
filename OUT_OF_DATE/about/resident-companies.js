import React from "react"
import { graphql } from "gatsby"
import Layout from "../../src/components/layout"
import SEO from "../../src/components/seo"
import Img from "gatsby-image"
import PortableText from "@sanity/block-content-to-react"
import "../../src/styles/about-resident-companies.scss"

export const query = graphql`
  query ResidentCompaniesPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    companies: sanityP2CompaniesPage(
      id: { eq: "d6152b95-5858-5f48-ad6a-688fe461284e" }
    ) {
      title
      companies {
        image {
          asset {
            fluid(maxWidth: 750) {
              ...GatsbySanityImageFluid
            }
          }
        }
        name
        _rawContent
        link {
          ctaLink
          linkText
        }
      }
    }
    about: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
      title
    }
  }
`

const ResidentCompanies = ({ data }) => {
  return (
    <Layout
      pageTitle={data.companies.title}
      breadcrumb={[
        {
          title: data.about.title,
          link: `/about`,
        },
      ]}
    >
      <SEO
        title={`${data.companies.title} | ${data.site.title}`}
        description={data.site.description}
      />
      <div className="strip__middle pad-sides">
        {data.companies.companies.map((company, idx) => {
          return (
            <div key={idx} className="resident-companies-item">
              {company.image && (
                <div className="resident-companies-item__carousel-harness">
                  <Img fluid={company.image.asset.fluid} />
                </div>
              )}
              <div className="resident-companies-item__content">
                <div className="resident-companies-item__title">
                  {company.name}
                </div>
                <PortableText blocks={company._rawContent} />
                {company.link && (
                  <div key={idx} className="resident-companies-item-link">
                    <a
                      href={company.link.ctaLink}
                      className="resident-companies-item-link__link"
                    >
                      {company.link.linkText} ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default ResidentCompanies
