import React from "react";
import fb from '../images/fb.svg';

const SocialButton = ({classes, url}) => (
  <a href={url} target='_blank' className={classes}></a>
);

export default SocialButton;
