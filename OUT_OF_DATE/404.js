import React from 'react';
import {graphql, Link} from 'gatsby';
import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import PortableText from '@sanity/block-content-to-react';
import '../src/styles/generic-page.scss';
import {slugify} from "../utils/utils";

export const query = graphql`
  query FourZeroFourPageQuery {
  
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    }
    
    page: sanityFourzerofour(id: {eq:"41d500e1-7c82-5e5c-b4a7-88503c6f1556"}) {
        pageTitle
        title
        _rawContent
        link{
          linkText
          ctaLink
        }
    }
    
  }
`;

// page: sanity404(id: {eq:""}) {
//     pageTitle
//     _rawContent
//     link
// }
const NotFoundPage = ({ data }) => {
    return (
        <Layout pageTitle={data.page.title}>
            <SEO title={`${data.page.title} | ${data.site.title}`} description={data.site.description}/>

            <div className='strip'>
                <div className='strip__middle pad-sides'>
                    <div className='generic-intro'>
                        <div className='generic-page__styled-title'>{data.page.pageTitle}</div>
                        <PortableText
                            blocks={data.page._rawContent}
                        />
                        {
                            data.page.link.ctaLink.length > 0 &&
                            <Link className='button generic-page__button' to={data.page.link.ctaLink}>{data.page.link.linkText} ↗</Link>
                        }
                    </div>


                </div>

            </div>
        </Layout>
    );
};

export default NotFoundPage;


