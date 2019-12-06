import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PortableText from '@sanity/block-content-to-react';
import '../styles/generic-page.scss';

export const query = graphql`
  query CookiesPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    page: sanityLegal(id: {eq:"758565eb-3fe1-5b82-971a-c491caccfd3b"}) {
        pageTitle
        _rawContent
    }
    
  }
`;

const Cookies = ({ data }) => {
  return (
    <Layout pageTitle={data.page.pageTitle}>
      <SEO title={`${data.page.pageTitle} | ${data.site.title}`} description={data.site.description}/>

      <div className='strip'>
        <div className='strip__middle pad-sides'>

          <div className='generic-intro'>
            <PortableText
              blocks={data.page._rawContent}
            />
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Cookies;


