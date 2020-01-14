import React, {useEffect, useMemo, useRef, useState} from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import "../styles/nav.scss"
import Header from "./header"
import { TweenMax, Elastic, Power2 } from "gsap"

const Nav = ({ show, isInHome, setShowNav }) => {
  const [displayNav, setDisplayNav] = useState(false)
  const bg = useRef(null)
  const links = useRef(null)

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      contact: sanityContactDetails {
        email
        phone 
      }

      news: sanityNewsPage {
        title
      }

      theClub: sanityTheClub {
        title
      }

      yourVisit: sanityYourVisit
      {
        title
      }

      theShop: sanityTheShop {
        title
      }
      aboutDel: sanityAboutDel{
        title
      }
      aboutTheCourse: sanityAboutTheCourse{
        title
      }
    }
  `)

  //(id: { eq: "b91facc9-d363-568b-b6b1-3086d969b3d4" })

  useMemo(() => {
    if (show) {
      setDisplayNav(true)

      // fade logo to white
      const logo = document.querySelectorAll(".header--in-nav .header__logo")[0]
      TweenMax.set(logo, { alpha: 0 })
      TweenMax.to(logo, 0.5, { alpha: 1, ease: Power2.easeIn })

      // morph burger into X
      const burgers = document.querySelectorAll(".burger")
      TweenMax.set(burgers, { delay: 0.1, className: "+=burger--cross" })

      // bring in background
      TweenMax.set(bg.current, {
        alpha: 0,
        x: "-100vw",
        y: "100vh",
      })

      TweenMax.to(bg.current, 0.1, {
        alpha: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeIn,
      })

      // bring on BIG links
      TweenMax.set(".nav__section-link", {
        alpha: 0,
        x: "-3vw",
      })

      TweenMax.staggerTo(
        ".nav__section-link",
        1.4,
        {
          delay: 0.3,
          alpha: 1,
          x: 0,
          ease: Elastic.easeOut,
        },
        0.1
      )

      // bring on links
      TweenMax.set(links.current, {
        alpha: 0,
        x: "-3vw",
      })

      TweenMax.to(links.current, 0.7, {
        delay: 0.5,
        alpha: 1,
        x: 0,
        ease: Elastic.easeOut,
      })
    } else {
      if (!displayNav) return false
      // fade logo back in
      const logo = document.querySelectorAll(".header--in-nav .header__logo")[0]
      TweenMax.to(logo, 0.24, { alpha: 0, ease: Elastic.easeIn })

      // morph X into burger
      const burgers = document.querySelectorAll(".burger")
      TweenMax.set(burgers, { delay: 0.1, className: "-=burger--cross" })

      // remove red bg
      TweenMax.to(bg.current, 0.35, {
        alpha: 0,
        x: "100vw",
        y: "-100vh",
        ease: Power2.easeIn,
        onComplete: () => {
          setDisplayNav(false)
        },
      })

      TweenMax.staggerTo(
        ".nav__section-link",
        0.2,
        {
          alpha: 0,
          x: "3vw",
          ease: Elastic.easeIn,
        },
        -0.01
      )

      // hide links
      TweenMax.to(links.current, 0.2, {
        alpha: 0,
        x: "3vw",
        ease: Elastic.easeIn,
      })
    }
  }, [show, displayNav])

  function handleClose() {
    setShowNav(false)
  }

  return (
    <div className={`nav ${displayNav ? "nav--show" : ""}`}>
      <div className="nav__bg" ref={bg} />
      <Header
        pageTitle={" "} //leave empty to stop nav items jumping
        isWhite
        isInNav
        isInHome={isInHome}
        handleBurgerClick={handleClose}
      />
      <div className="strip">
        <nav className="strip__middle pad-sides">
          <Link
            className="nav__section-link"
            onClick={handleClose}
            to="/news"
          >
            {data.news.title}
          </Link>
          <Link
            className="nav__section-link"
            onClick={handleClose}
            to="/the-club"
        >
          {data.theClub.title}
        </Link>
          <Link
              className="nav__section-link"
              onClick={handleClose}
              to="/your-visit"
          >
            {data.yourVisit.title}
          </Link>
          <Link className="nav__section-link" onClick={handleClose} to="/the-shop">
            {data.theShop.title}
          </Link>
          <Link
              className="nav__section-link"
              onClick={handleClose}
              to="/about-derek-robins"
          >
            {data.aboutDel.title}
          </Link>
          <Link
              className="nav__section-link"
              onClick={handleClose}
              to="/about-the-course"
          >
            {data.aboutTheCourse.title}
          </Link>
        </nav>
      </div>
      <div className="strip nav-links" ref={links}>
        <div className="strip__middle pad-sides">
          <a className="nav-links__link" href={`tel:${data.contact.phone}`}>
            {data.contact.phone}
          </a>
          <a className="nav-links__link" href={`mailto:${data.contact.email}`}>
            {data.contact.email}
          </a>
        </div>
      </div>
    </div>
  )
}

Nav.propTypes = {
  show: PropTypes.bool,
  isInHome: PropTypes.bool,
  setShowNav: PropTypes.func,
}

Nav.defaultProps = {
  show: false,
  isInHome: false,
  setShowNav: () => {},
}

export default Nav
