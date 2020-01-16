import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import ImageCarousel from '../components/image-carousel';
import '../styles/story.scss';
import ImageOrVideo from '../components/image-or-video';
import {Link} from "gatsby";

export const query = graphql`
  query NewsItemTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    news_page: sanityNewsPage(id: {eq: "075913d5-04f9-5bd5-ad15-160b05a581dc"}) {
          title
    }
    news: sanityNews(id: {eq: $id}) {
      id
      title
      primaryImage {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
      _rawContent
      newsSections {
        subtitle
        _rawContent
        asset {
          ... on SanityExtendedUrl {
            url
          }
          ... on SanityImage {
            asset{
              fluid(maxWidth: 1200) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
  `;

const NewsTemplate =  ({data}) => {
  return (
    <Layout pageTitle={data.news.title} breadcrumb={[
      {
        title: data.news.title,
        link: `/news`
      }
    ]}>
      <SEO title={`${data.news.title} | ${data.news_page.title}`} description={data.news.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={[data.news.primaryImage]}/>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>
          <div className='story__intro limit-width'>
            <PortableText
              blocks={data.news._rawContent}
            />
          </div>
        </div>
        <div className='strip__middle pad-sides'>
          {
            data.news.newsSections.map((item, idx) => {
              return (
                <div key={idx} className='story-item limit-width'>
                  <div className='story-item__title'>{item.subtitle}</div>
                  <PortableText
                    blocks={item._rawContent}
                  />
                  {
                    item.asset.length > 0 &&
                    <ImageOrVideo asset={item.asset} caption={item.caption} controls={true} />
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default NewsTemplate;
