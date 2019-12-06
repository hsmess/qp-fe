import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/image-carousel.scss';
import { TweenMax, Power2 } from 'gsap';
import '../images/next.svg';
import ReactPlayer from 'react-player';
import ZingTouch from 'zingtouch/src/ZingTouch';

function ImageCarousel ({ images, video, autoPlay, controls }) {
  const carouselRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const controlsRef = useRef(null);
  const videoRef = useRef(null);

  const useAutoPlay = useRef(autoPlay);
  const waitAfterChange = 5;

  let currentImg = useRef(0);
  let touch = useRef(false);
  const activeRegion = useRef(null);

  const [numberOfSlides, setNumberOfSlides] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    window.addEventListener('touchstart', onFirstTouch);
  }, []);

  const onFirstTouch = (e) => {
    // console.log('first touch');
    window.removeEventListener('touchstart', onFirstTouch);
    touch.current = true;
  };

  useEffect(() => {
    let num = 1;

    // decide number of objects
    if (images.length) {
      num = images.length;
      if (video !== null) num++;
      if (num > 1) num++; // extra 1 for wraparound
    }

    setNumberOfSlides(num);

    // show carousel at start
    TweenMax.to(carouselRef.current, .3, {delay: .2, alpha: 1, ease: Power2.easeIn});

    return () => {
      killTweens();
    }
  }, [images]);

  const handleSwipe = (e) => {
    if (touch.current === false) return false;
    const currentDirection = e.detail.data[0].currentDirection;

    if (currentDirection >= 91 && currentDirection <= 269) {
      manualAdvance(1);
    }
    else if (currentDirection <= 90 || currentDirection >= 270) {
      manualAdvance(-1);
    }
  };

  useEffect(() => {
    currentImg.current = numberOfSlides-1;

    if (numberOfSlides > 1) {
      showNextImg(1, true);
      TweenMax.to(controlsRef.current, .5, {delay: 1.2, alpha: 1, ease: Power2.easeIn});
      window.vid = videoRef.current;

      // initialise gestures
      activeRegion.current = ZingTouch.Region(carouselContainerRef.current, false, false);
      activeRegion.current.bind(carouselContainerRef.current, 'swipe', handleSwipe);
    }
    else if (numberOfSlides === 1 && video !== null) {
      setLooping(true);
      if (!controls) restartVideo();
    }
  }, [numberOfSlides]);

  const killTweens = () => {
    TweenMax.killDelayedCallsTo(showNextImg);
    TweenMax.killChildTweensOf(sliderRef.current);
  }

  function showNextImg(moveBy = 1, firstTime = false) {
    // pause video
    setPlaying(false);

    // wrap around magic!
    let wrapAround = 'none';

    if (numberOfSlides > 1) {
      if (currentImg.current === numberOfSlides - 1 && moveBy === 1) {
        jumpToSlide(0);
        wrapAround = 'right';
      }

      if (currentImg.current === 0 && moveBy === -1) {
        jumpToSlide(numberOfSlides - 1);
        wrapAround = 'left';
      }
    }

    // update currentImg.current
    if (wrapAround === 'none') {
      // get raw next position
      let nextImgPosition = currentImg.current + moveBy;

      // correct for less than 0
      if (nextImgPosition < 0) nextImgPosition = numberOfSlides - 1;
      currentImg.current = nextImgPosition % numberOfSlides;
    }
    else if (wrapAround === 'right') currentImg.current = 1;
    else if (wrapAround === 'left') currentImg.current = numberOfSlides - 2;

    // reset video to start?
    if (currentImg.current === 1 && video !== null) videoRef.current.seekTo(0);

    // move slider
    const x = `${-100 * currentImg.current}%`;

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
  }

  useEffect(() => {
    // console.log('playing SET TO:', playing);
  }, [playing]);

  function handleSlideComplete() {
    // console.log('handleSlideComplete playing:', playing);

    const isVideoSlide = (video !== null && (currentImg.current === 1 || numberOfSlides === 1));

    if (isVideoSlide) {
      // play vid from start
      if (!controls) restartVideo();
    }
    else if (useAutoPlay.current) {
      TweenMax.delayedCall(waitAfterChange, showNextImg);
    }
  };

  const restartVideo = () => {
    // console.log('restartVideo');
    videoRef.current.seekTo(0);
    setPlaying(true);
  }

  const manualAdvance = (moveBy) => {
    useAutoPlay.current = false;
    setLooping(true);
    killTweens();

    showNextImg(moveBy, false);
  };

  const handleVideoEnded = () => {
    setPlaying(false);
    if (useAutoPlay.current) showNextImg();
    else restartVideo();
  }

  const showVideoHarness = () => {
    videoRef.current.wrapper.classList.add('image-carousel__video');
  }

  return (
    <div className='image-carousel' ref={carouselRef}>
      <div className='image-carousel__container' ref={carouselContainerRef}>
        <div className='image-carousel__slider' ref={sliderRef}>
          {
            numberOfSlides > 1 &&
            <Img className='image-carousel__img' fluid={images[images.length-1].asset.fluid}/>
          }
          {
            video &&
            <ReactPlayer
              ref={videoRef}
              url={video}
              playing={playing}
              controls={controls}
              volume={controls ? 1 : 0}
              muted={!controls}
              loop={looping}
              width={'100%'}
              height={'100%'}
              style={{
                display: 'inline-block',
                opacity: 0,
                pointerEvents: controls ? 'auto' : 'none'
              }}
              playsinline
              onReady={() => {
                showVideoHarness();
              }}
              onPlay={() => {
                setPlaying(true);
              }}
              onEnded={handleVideoEnded}
              config={{
                background: !controls,
                transparent: true,
                autopause: true
              }}
            />
          }
          {
            images.map((image, idx) => {
              return (
                <Img key={idx} className='image-carousel__img' fluid={image.asset.fluid}/>
              );
            })
          }
        </div>
        {
          numberOfSlides > 1 &&
          <div className='image-carousel__controls' ref={controlsRef}>
            <div className='image-carousel__advance image-carousel__advance--prev' onClick={() => manualAdvance(-1)}>
              <div className='image-carousel__arrow' />
            </div>
            <div className='image-carousel__advance image-carousel__advance--next' onClick={() => manualAdvance(1)}>
              <div className='image-carousel__arrow' />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
  video: PropTypes.string,
  autoPlay: PropTypes.bool,
  controls: PropTypes.bool
};

ImageCarousel.defaultProps = {
  images: [],
  video: null,
  autoPlay: false,
  controls: false
};

export default ImageCarousel;
