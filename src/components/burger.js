import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import '../styles/burger.scss'

const Burger = ({ light, handleClick }) => (
  <div className='burger' onClick={() => handleClick(true)}>
    <div className='burger__line burger__line--1' />
    <div className='burger__line burger__line--2' />
    <div className='burger__line burger__line--3' />
  </div>
)

Burger.propTypes = {
  light: PropTypes.bool,
}

Burger.defaultProps = {
  light: false,
}

export default Burger
