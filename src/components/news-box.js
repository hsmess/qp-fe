import React, { useEffect } from 'react';
import Img from 'gatsby-image';
import PropTypes from "prop-types";
import PortableText from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import { slugify } from '../utils/utils';
import '../styles/news-box.scss';

function NewsBox({ data }) {
  useEffect(() => {
  }, [data]);
  return (

    <Link to={'/news/' + slugify(data.node.title)} className={`news-box news-box--home`}>
      <div className='news-box__img-harness'>
        <Img className='news-box__img' fluid={data.node.primaryImage.asset.fluid}/>
      </div>
      <div className='news-box__inner'>
          <div className='news-box__tags'>
              <div className='tag tag--light'>{data.node.date}</div>
          </div>
        <div>
          <div className='news-box__info'>
              {data.node.previewText}
              <div className='news-box__more-button-harness'>
                  <Link className='button generic-page__button' to={'news/' + slugify(data.node.title,data.node.id)}>Read More ↗</Link>
              </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

NewsBox.propTypes = {
  data: PropTypes.object
};

NewsBox.defaultProps = {
  data: null
};

export default NewsBox;
