import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/header.scss';
import Burger from './burger';
import WoolwichLogo from "./woolwich-logo";
import { Power2, TweenMax } from 'gsap/TweenMax';
import Breadcrumb from "./breadcrumb";

function Header({ pageTitle, breadcrumb, isWhite, isInHome, isInNav, handleBurgerClick }) {
  const headerRef = useRef(null);
  const headerInnerRef = useRef(null);
  const titleRef = useRef(null);
  const [top, setTop] = useState(null);
  const [showBreadcrumbInHeader, setShowBreadcrumbInHeader] = useState(false);
  let lastYScroll = 0;

  useEffect(() => {
    TweenMax.set(titleRef.current, {
      x: -10,
      alpha: 0
    });

    TweenMax.to(titleRef.current, .7, {
      delay: .3,
      x: 0,
      alpha: 1,
      ease: Power2.easeOut
    });

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function onScroll(e) {
    if (window.pageYOffset > 150 && window.pageYOffset > lastYScroll) {
      setTop(`-${headerRef.current.clientHeight + 10}px`)
    }
    else setTop(0);

    const breadcrumb = document.querySelectorAll('.breadcrumb')[0];

    if (window.pageYOffset > headerInnerRef.current.clientHeight + titleRef.current.clientHeight) setShowBreadcrumbInHeader(true);
    else setShowBreadcrumbInHeader(false);

    lastYScroll = window.pageYOffset;
  }

  return (
    <>
      <header className={`header ${isWhite ? 'header--white' : ''} ${isInNav ? 'header--in-nav' : ''} ${isInHome ? 'header--in-home' : ''}`} ref={headerRef} style={{ top: top }}>
        <div className='header__bg'>
          <div className='header__main pad-sides' ref={headerInnerRef}>
            <div className='header__side'>
              <Link to="/">
                <WoolwichLogo classes='header__logo' />
              </Link>
            </div>
            <div className='header__side header__side--right'>
              <Burger handleClick={handleBurgerClick} />
            </div>
          </div>
        </div>
        {
          (breadcrumb && showBreadcrumbInHeader) &&
          <Breadcrumb crumbs={breadcrumb} pageTitle={pageTitle} show={showBreadcrumbInHeader}/>
        }
      </header>

      <div className={`header__title-harness pad-sides ${isInHome ? 'header__title-harness--in-home' : ''}`}>
        <div className='header__title' ref={titleRef}>{pageTitle}</div>
      </div>

      {
        (breadcrumb && !showBreadcrumbInHeader) &&
        <Breadcrumb crumbs={breadcrumb} pageTitle={pageTitle}/>
      }
    </>
  )
}

Header.propTypes = {
  pageTitle: PropTypes.string,
  breadcrumb: PropTypes.array,
  isWhite: PropTypes.bool,
  isInNav: PropTypes.bool,
  isInHome: PropTypes.bool,
  handleBurgerClick: PropTypes.func
};

Header.defaultProps = {
  pageTitle: ``,
  breadcrumb: null,
  isWhite: false,
  isInNav: false,
  isInHome: false,
  handleBurgerClick: () => {}
};

export default Header;
