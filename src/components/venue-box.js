import React, { useEffect } from 'react';
import Img from 'gatsby-image';
import PropTypes from "prop-types";
import PortableText from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import { slugify } from '../utils/utils';
import '../styles/venue-box.scss';
import Tag from './tag';

function VenueBox({ data }) {
  useEffect(() => {
  }, [data]);

  return (
    <Link to={'/venues/' + slugify(data.title)} className={`venue-box venue-box--${
        data.boxColour === undefined ? 'no-colour' : data.boxColour
    }`}>
      <div className='venue-box__img-harness'>
        <Img className='venue-box__img' fluid={data.preview.previewImage.asset.fluid}/>
        <div className='venue-box__tags'>
          {
            data.suitableForTags.map((tag, idx) => {
              return (
                <Tag
                  key={idx}
                  tag={tag}
                  light
                />
              );
            })
          }
        </div>
      </div>
      <div className='venue-box__inner'>
        <div>
          <div className='venue-box__title'>{data.title}</div>
          <div className='venue-box__info'>{data.sqft}ft<sup>2</sup> | {data.people} people</div>
        </div>
      </div>
      {/*<Link to={'/venues/' + slugify(data.title)} className='venue-box__more-button'>More Information ↗</Link>*/}
    </Link>
  )
}

VenueBox.propTypes = {
  data: PropTypes.object
};

VenueBox.defaultProps = {
  data: null
};

export default VenueBox;
