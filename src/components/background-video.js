import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import '../styles/background-video.scss';
import ReactPlayer from 'react-player';
import {TweenMax} from 'gsap';

function BackgroundVideo ({ url, container }) {
  const videoContainer = useRef(null);
  const mainContainer = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    if (mainContainer.current.clientHeight <= mainContainer.current.clientWidth * .5625) {
      TweenMax.set(videoContainer.current, {
        width: '100vw',
        height: '56.25vw',
        marginLeft: '-50vw',
        marginTop: '-28.128vw'
      });
    }
    else {
      TweenMax.set(videoContainer.current, {
        width: '160vh',
        height: '90vh',
        marginLeft: '-80vh',
        marginTop: '-45vh'
      });
    }
  };

  return (
    <div className='background-video' ref={mainContainer}>
      <div className='background-video__container' ref={videoContainer}>
        <ReactPlayer
          url={url}
          playing
          loop
          controls={false}
          volume={0}
          muted
          width={'100%'}
          height={'100%'}
          style={{
            display: 'block',
            position: 'absolute',
            top: '0',
            left: '0'
          }}
          playsinline
          config={{
            background: 'true'
          }}
        />
      </div>
    </div>
  );
}

BackgroundVideo.propTypes = {
  url: PropTypes.string
};

BackgroundVideo.defaultProps = {
};

export default BackgroundVideo;
