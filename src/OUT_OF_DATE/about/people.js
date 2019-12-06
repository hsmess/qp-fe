import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Img from "gatsby-image"
import PortableText from "@sanity/block-content-to-react"
import "../../styles/about-people.scss"

export const query = graphql`
  query PeoplePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    people: sanityP2PeoplePage(
      id: { eq: "71c4925c-6e9e-574c-a0d9-25cb6f10302e" }
    ) {
      title
      people {
        jobTitle
        name
        _rawContent
        image {
          asset {
            fluid(maxWidth: 750) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
    about: sanityP2About(id: { eq: "1f486191-08f3-581c-8994-690521266d41" }) {
      title
    }
  }
`

const People = ({ data }) => {
  return (
    <Layout
      pageTitle={data.people.title}
      breadcrumb={[
        {
          title: data.about.title,
          link: `/about`,
        },
      ]}
    >
      <SEO
        title={`${data.people.title} | ${data.site.title}`}
        description={data.site.description}
      />
      <div className="strip__middle strip__middle--central pad-sides">
        {data.people.people.map((person, idx) => {
          return (
            <div key={idx} className="people-item">
              {person.image && (
                <div className="people-item__carousel-harness">
                  <Img
                    fluid={person.image.asset.fluid}
                    className="people-item__img"
                  />
                </div>
              )}
              <div className="people-item__content">
                <div className="people-item__title">{person.name}</div>
                <div className="people-item__subtitle">{person.jobTitle}</div>
                <PortableText blocks={person._rawContent} />
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default People
