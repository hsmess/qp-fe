import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/image-fader.scss';
import { TweenMax, Power2 } from 'gsap';

function ImageFader ({ images }) {
  const container = useRef(null);
  const fadeDuration = 2.5;
  const waitAfterFade = 5;
  let currentImg;

  useEffect(() => {
    if (!images.length) return;

    currentImg = images.length-1;
    showNextImg(true);

    return () => {
      TweenMax.killDelayedCallsTo(showNextImg);
      TweenMax.killChildTweensOf(container.current);
    }
  }, [images]);

  const showNextImg = (firstTime) => {
    TweenMax.to(container.current.children[currentImg], fadeDuration, {
      alpha: 0,
      ease: Power2.easeInOut
    });

    currentImg = (currentImg + 1) % (images.length-1); // wraparound

    TweenMax.set(container.current.children[currentImg], { scale: 1.1 });
    TweenMax.to(container.current.children[currentImg], firstTime ? 0 : fadeDuration, {
      alpha: 1,
      scale: 1,
      ease: Power2.easeInOut,
      onComplete: () => TweenMax.delayedCall(waitAfterFade, showNextImg)
    });
  };

  return (
    <div className='image-fader' ref={container}>
      {
        images.map((image, idx) => {
          return (
            <Img key={idx} className='image-fader__img' fluid={image.asset.fluid} alt={image.alt}/>
          );
        })
      }
    </div>
  );
}

ImageFader.propTypes = {
  images: PropTypes.array
};

ImageFader.defaultProps = {
  images: []
};

export default ImageFader;
