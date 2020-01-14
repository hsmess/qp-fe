import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import '../src/styles/generic-page.scss';

export const query = graphql`
  query TermsPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    page: sanityLegal(id: {eq:"7aa9da6a-daa3-59c9-ac65-9475d62493f5"}) {
        pageTitle
        _rawContent
    }
    
  }
`;

const Terms = ({ data }) => {
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

export default Terms;


