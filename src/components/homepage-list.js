import React, {} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/homepage-list.scss';
// import HomepageListBox from './homepage-list-box';
import { Link } from 'gatsby';
import HomepageListBox from './homepage-list-box';

const HomepageList = ({ data }) => {
  console.log(data);

  return (
    <div className='homepage-list'>
      <div className='homepage-list__title'>{data.title}</div>
      <div className='homepage-list__box-list'>
        {
          data.elements.map((item, idx) => {
            return (
              <HomepageListBox data={item} />
            )
          })
        }
      </div>
    </div>
  );
}

HomepageList.propTypes = {
  data: PropTypes.array
};

HomepageList.defaultProps = {
};

export default HomepageList;
