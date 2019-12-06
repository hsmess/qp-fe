import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/index-carousel.scss';
import { TweenMax, Power2 } from 'gsap';
import '../images/next.svg';
import ZingTouch from 'zingtouch/src/ZingTouch';

function IndexCarousel ({ slides, autoPlay }) {
  const carouselRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const controlsRef = useRef(null);

  const useAutoPlay = useRef(autoPlay);
  const waitAfterChange = 5;

  let currentSlide = useRef(0);
  let touch = useRef(false);
  const activeRegion = useRef(null);

  const [numberOfSlides, setNumberOfSlides] = useState(0);

  useEffect(() => {
    window.addEventListener('touchstart', onFirstTouch);
  }, []);

  const onFirstTouch = (e) => {
    // console.log('first touch');
    window.removeEventListener('touchstart', onFirstTouch);
    touch.current = true;
  };

  useEffect(() => {
    console.log('slides:', slides);

    // decide number of objects
    setNumberOfSlides(slides.length);

    // show carousel at start
    TweenMax.to(carouselRef.current, .3, { delay: .2, alpha: 1, ease: Power2.easeIn });

    return () => {
      killTweens();
    };
  }, [slides]);

  const handleSwipe = (e) => {
    if (touch.current === false) return false;
    const currentDirection = e.detail.data[0].currentDirection;

    if (currentDirection >= 91 && currentDirection <= 269) {
      manualAdvance(1);
    } else if (currentDirection <= 90 || currentDirection >= 270) {
      manualAdvance(-1);
    }
  };

  useEffect(() => {
    currentSlide.current = numberOfSlides;

    if (numberOfSlides > 1) {
      showNextSlide(1, true);
      TweenMax.to(controlsRef.current, .5, { delay: 1.2, alpha: 1, ease: Power2.easeIn });

      // initialise gestures
      activeRegion.current = ZingTouch.Region(carouselContainerRef.current, false, false);
      activeRegion.current.bind(carouselContainerRef.current, 'swipe', handleSwipe);
    }
  }, [numberOfSlides]);

  const killTweens = () => {
    TweenMax.killDelayedCallsTo(showNextSlide);
    TweenMax.killChildTweensOf(sliderRef.current);
  };

  function showNextSlide (moveBy = 1, firstTime = false) {
    // wrap around magic!
    let wrapAround = 'none';

    if (numberOfSlides > 1) {
      if (currentSlide.current === numberOfSlides && moveBy === 1) {
        jumpToSlide(0);
        wrapAround = 'right';
      }

      if (currentSlide.current === 0 && moveBy === -1) {
        jumpToSlide(numberOfSlides);
        wrapAround = 'left';
      }
    }

    // update currentSlide.current
    if (wrapAround === 'none') {
      // get raw next position
      let nextSlidePosition = currentSlide.current + moveBy;

      // correct for less than 0
      if (nextSlidePosition < 0) nextSlidePosition = numberOfSlides - 1;
      currentSlide.current = nextSlidePosition; // % numberOfSlides;
    } else if (wrapAround === 'right') currentSlide.current = 1;
    else if (wrapAround === 'left') currentSlide.current = numberOfSlides - 1;

    // move slider
    const x = `${-100 * currentSlide.current}%`;

    TweenMax.to(sliderRef.current, firstTime ? 0 : window.innerWidth < 768 ? .5 : 1, { // 1
      x: x,
      ease: Power2.easeInOut,
      onComplete: handleSlideComplete
    });
  };

  const jumpToSlide = (slideNum) => {
    TweenMax.set(sliderRef.current, {
      x: `${-100 * slideNum}%`
    });
  };

  function handleSlideComplete () {
    if (useAutoPlay.current) {
      TweenMax.delayedCall(waitAfterChange, showNextSlide);
    }
  };

  const manualAdvance = (moveBy) => {
    useAutoPlay.current = false;
    killTweens();

    showNextSlide(moveBy, false);
  };

  return (
    <div className='index-carousel' ref={carouselRef}>
      <div className='index-carousel__container' ref={carouselContainerRef}>
        <div className='index-carousel__slider' ref={sliderRef}>
          {
            numberOfSlides > 1 &&
            <div className='index-carousel-slide'>
              <Img className='index-carousel-slide__bg' fluid={slides[slides.length - 1].sliderImage.asset.fluid}/>
              <div className='strip index-carousel-slide-info__strip'>
                <div className='strip__middle pad-sides'>
                  <div className='index-carousel-slide-info'>
                    <div className='index-carousel-slide-info__title'>{slides[slides.length - 1].title}</div>
                    <div className='index-carousel-slide-info__subtitle'>{slides[slides.length - 1].subtitle}</div>
                    {
                      (slides[slides.length - 1].buttonText !== null && slides[slides.length - 1].ctaLink.ctaLink !== null) &&
                      <a href={slides[slides.length - 1].ctaLink.ctaLink}
                         className='button button--empty button--homepage'>{slides[slides.length - 1].buttonText} →</a>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
          {
            slides.map((slide, idx) => {
              return (
                <div className='index-carousel-slide' key={idx}>
                  <Img className='index-carousel-slide__bg' fluid={slide.sliderImage.asset.fluid}/>
                  <div className='strip index-carousel-slide-info__strip'>
                    <div className='strip__middle'>
                      <div className='index-carousel-slide-info pad-sides'>
                        <div className='index-carousel-slide-info__title'>{slide.title}</div>
                        <div className='index-carousel-slide-info__subtitle'>{slide.subtitle}</div>
                        {
                          (slide.buttonText !== null && slide.ctaLink.ctaLink !== null) &&
                          <a href={slide.ctaLink.ctaLink}
                             className='button button--empty button--homepage'>{slide.buttonText} →</a>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
        {
          numberOfSlides > 1 &&
          <div className='index-carousel__controls' ref={controlsRef}>
            <div className='index-carousel__advance index-carousel__advance--prev' onClick={() => manualAdvance(-1)}>
              <div className='index-carousel__arrow'/>
            </div>
            <div className='index-carousel__advance index-carousel__advance--next' onClick={() => manualAdvance(1)}>
              <div className='index-carousel__arrow'/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

IndexCarousel.propTypes = {
  slides: PropTypes.array,
  autoPlay: PropTypes.bool
};

IndexCarousel.defaultProps = {
  slides: [],
  autoPlay: false
};

export default IndexCarousel;
