import React, { useEffect, useMemo, useRef } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../styles/index.scss';

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    },
    homepage: sanityP2Homepage(id: {eq:""}) {
     
    }
  },
`;

const IndexPage = ({ data }) => {

  return (
    <Layout isInHome>
      <SEO title={data.site.title} description={data.site.description}/>

      <div className='full-bleed-strip'>
        <div className='index__dark-layer'/>
        {/*<IndexCarousel slides={data.homepage.p2HomepageSliders} autoPlay/>*/}
      </div>

      <div className="strip">
        <div className="strip__middle pad-sides">
          {/*{*/}
          {/*  boxes.map((box, idx) => {*/}
          {/*    return (*/}
          {/*      <HomepageList data={box} key={idx} />*/}
          {/*    )*/}
          {/*  })*/}
          {/*}*/}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

