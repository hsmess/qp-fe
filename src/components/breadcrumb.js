import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/breadcrumb.scss';
import { Link } from 'gatsby';

function Breadcrumb ({ crumbs, pageTitle, show }) {
  const mainRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => mainRef.current.classList.add('breadcrumb--fade-in'), 20);
  }, []);
  
  return (
    <div className={`strip breadcrumb ${show ? '' : 'breadcrumb--hidden' }`} ref={mainRef}>
      <div className='breadcrumb__container'>
        <div className='strip__middle pad-sides'>
          {
            crumbs.map((crumb, idx) => {
              return (
                <Link key={idx} className='breadcrumb__link' to={crumb.link}>
                  {crumb.title}&nbsp;→&nbsp;
                </Link>
              )
            })
          }
          <div className='breadcrumb__link'>
            {pageTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.array,
  pageTitle: PropTypes.string,
  show: PropTypes.bool
};

Breadcrumb.defaultProps = {
  show: true
};

export default Breadcrumb;
