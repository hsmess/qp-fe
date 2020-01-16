import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import '../styles/news.scss';
import NewsBox from "../components/news-box";


export const query = graphql`
  query NewsPageQuery {
        site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
          title
          description
        }
        news: sanityNewsPage(id: {eq: "075913d5-04f9-5bd5-ad15-160b05a581dc"}) {
          title
          _rawContent
        }
        items: allSanityNews(sort: {fields: date, order: DESC}) {
        edges {
          node {
            id
            title
            primaryImage {
              asset {
                fluid(maxWidth: 2500) {
                   ...GatsbySanityImageFluid
                }
              }
              alt
            }
            previewText
            }
          }
        },
  }
`;

const News = ({ data }) => {
  return (
    <Layout pageTitle={data.news.title}>
      <SEO title={`${data.news.title} | ${data.site.title}`} description={data.site.description}/>

      <div className='strip'>
        <div className='strip__middle pad-sides'>
          <div className='history__intro limit-width'>
            <PortableText
              blocks={data.news._rawContent}
            />
          </div>
        </div>
        <div className='strip__middle pad-sides'>
          {
              data.items.edges.map((story, idx) => {
                  return (
                      <NewsBox data={story}></NewsBox>
                  )
              })
          }
        </div>
      </div>
    </Layout>
  );
};

export default News;
