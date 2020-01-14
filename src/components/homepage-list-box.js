import React, { useEffect } from 'react';
import Img from 'gatsby-image';
import PropTypes from "prop-types";
import { Link } from 'gatsby';
import { slugify } from '../utils/utils';
import '../styles/homepage-list-box.scss';
import Tag from './tag';

function HomepageListBox({ data }) {
  useEffect(() => {
    console.log('box:', data);
  }, [data]);

  return (
    <Link to={data.link} className='homepage-list-box'>
      <div className='homepage-list-box__img-harness'>
        <Img className='homepage-list-box__img' fluid={data.asset.fluid}/>
        {/*{*/}
        {/*  data.type === 'event' &&*/}
        {/*  <div className='homepage-list-box__tags'>*/}
        {/*    {*/}
        {/*      data.suitableForTags.map((tag, idx) => {*/}
        {/*        return (*/}
        {/*          <Tag*/}
        {/*            key={idx}*/}
        {/*            tag={tag}*/}
        {/*            light*/}
        {/*          />*/}
        {/*        );*/}
        {/*      })*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*}*/}
      </div>
      <div className='homepage-list-box__inner'>
        <div className='homepage-list-box__title'>{data.title}</div>
        {
          data.type === 'event' &&
          <div className='homepage-list-box__subtitle'>{data.artist}</div>
        }
        {
          data.type === 'venue' &&
          <div className='homepage-list-box__subtitle'>{ data.sqft }ft<sup>2</sup> | {data.people} people</div>
        }
      </div>
      {/*<Link to={'/venues/' + slugify(data.title)} className='news-box__more-button'>More Information ↗</Link>*/}
    </Link>
  )
}

HomepageListBox.propTypes = {
  data: PropTypes.object
};

HomepageListBox.defaultProps = {
  data: null
};

export default HomepageListBox;
