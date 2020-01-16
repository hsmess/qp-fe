import React, { useEffect, useMemo, useRef } from 'react';
import {graphql, Link} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BackgroundVideo from "../components/background-video";
import ImageFader from "../components/image-fader";
import PortableText from '@sanity/block-content-to-react';
import '../styles/index.scss';
import NewsBox from "../components/news-box";
import {slugify} from "../utils/utils";
import {func} from "prop-types";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    },
    threeStories: allSanityNews(limit: 3, sort: {fields: date, order: DESC}) {
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
    homepage: sanityHomepage(id: {eq:"e07ca5b6-bcc6-5d90-8489-39702cd11394"}) {
       overlayText
       _rawOverlayText2
       backgroundVideoUrl
       imageSlider
       {
        alt
        asset
        {
           fluid(maxWidth: 2500) {
           ...GatsbySanityImageFluid
           }
        }
       }
    }
  }
`;

const IndexPage = ({ data }) => {
  return (
    <Layout isInHome>
        <SEO title={data.site.title} description={data.site.description}/>
        <div className='full-bleed-strip'>
            {
                data.homepage.backgroundVideoUrl !== null
                    ? <BackgroundVideo url={data.homepage.backgroundVideoUrl}/>
                    : <ImageFader images={data.homepage.imageSlider}/>
            }

            <div className='index__dark-layer' />

            <div className='strip__middle pad-sides'>
                <div className='index__title'>
                    {data.homepage.overlayText}
                </div>
                <div className='index__subtitle'>
                    <PortableText blocks={data.homepage._rawOverlayText2}/>
                </div>
            </div>
            <div className='strip quicklinks'>
                <div className='strip__middle pad-sides quicklinks__inner'>
                    <div><Link className='quicklinks__link' to='/visit-us'>Visit Us</Link></div>
                    <div><Link className='quicklinks__link' to='/the-club'>Join The Club</Link></div>
                    <div><Link className='quicklinks__link' to='/the-course'>About The Course</Link></div>
                </div>
            </div>
        </div>
        <div className='full-bleed-strip-no-height index__news-section'>
            <div className='strip__middle pad-sides'>
                {/*{data.threeStories.edges.map(function(story, idx){*/}
                {/*    <div className='index__news-section_news_story'>*/}
                {/*        <NewsBox data={story}></NewsBox>*/}
                {/*    </div>*/}
                {/*})}*/}
                <div className='index__title pb-3'>
                    Latest News
                </div>
                {
                    data.threeStories.edges.map((story, idx) => {
                        return (
                            <NewsBox data={story}></NewsBox>
                        )
                    })
                }
            </div>
        </div>
        <div className='full-bleed-strip-no-height index__news-btn'>
            <div className='strip__middle pad-sides readmore'>
                <Link className='button generic-page__button' to={'news'}>Read More Stories... ↗</Link>
            </div>
        </div>
    </Layout>
  );
};

export default IndexPage;

