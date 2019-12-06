import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import "../styles/about-box.scss"

const AboutBox = ({ image, title, colour, url }) => {
  return (
    <Link
      to={url}
      className={`about-box about-box--${
        colour === undefined ? "no-colour" : colour
      }`}
    >
      <div className="about-box__inner">
        <Img className="about-box__img" fluid={image.asset.fluid} />
        <div className="about-box__title">{title}</div>
      </div>
    </Link>
  )
}

export default AboutBox
