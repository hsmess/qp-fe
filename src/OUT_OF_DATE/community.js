import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/community.scss"
import ImageCarousel from "../components/image-carousel"
import PortableText from "@sanity/block-content-to-react"

export const query = graphql`
  query CommunityPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
    }
    community: sanityCommunity(
      id: { eq: "b91facc9-d363-568b-b6b1-3086d969b3d4" }
    ) {
      title
      imageSlider {
        asset {
          fluid(maxWidth: 1200) {
            src
          }
        }
      }
      intro
      _rawContent
      communityItems {
        _rawContent
        externalLink {
          ctaLink
          linkText
        }
        imageSlider {
          asset {
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
        video
        title
      }
    }
  }
`

const Community = ({ data }) => {
  return (
    <Layout pageTitle={data.community.title}>
      <SEO
        title={`${data.community.title} | ${data.site.title}`}
        description={data.site.description}
      />
      {/* Carousel */}
      <div className="image-carousel-harness">
        <ImageCarousel
          images={data.community.imageSlider}
          video={data.community.video}
        />
      </div>

      <div className="strip">
        <div className="strip__middle strip__middle--central pad-sides">
          <div className="community-intro">
            <div className="community-intro__title">{data.community.intro}</div>
            <PortableText blocks={data.community._rawContent} />
          </div>
        </div>
        <div className="strip__middle pad-sides">
          {data.community.communityItems.map((item, idx) => {
            return (
              <div key={idx} className="community-item">
                <div className="community-item__content">
                  <div className="community-item__title">{item.title}</div>
                  <PortableText blocks={item._rawContent} />
                  {item.externalLink.map((link, idx) => {
                    return (
                      <div
                        key={`community_${idx}_link_{idx}`}
                        className="community-item-link"
                      >
                        <a
                          className="community-item-link__link"
                          href={link.ctaLink}
                          target="_blank"
                        >
                          {link.linkText} ↗
                        </a>
                      </div>
                    )
                  })}
                </div>
                <div className="community-item__carousel-harness">
                  <ImageCarousel images={item.imageSlider} video={item.video} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Community
