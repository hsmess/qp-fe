/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import '../styles/layout.scss';
import Nav from './nav';
import Footer from './footer';

const Layout = ({ isInHome, pageTitle, breadcrumb, children }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Header
        pageTitle={pageTitle}
        handleBurgerClick={setShowNav}
        isInHome={isInHome}
        isWhite={isInHome}
        breadcrumb={breadcrumb}
      />

      <main>{children}</main>

      <Footer isInHome={isInHome}/>
      <Nav
        show={showNav}
        setShowNav={setShowNav}
        isInHome={isInHome}
      />
    </>
  );
};

Layout.propTypes = {
  isInHome: PropTypes.bool,
  pageTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  isInHome: false,
  pageTitle: 'page title'
};

export default Layout;
