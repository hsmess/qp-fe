import React, {} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/image-or-video.scss';
import ReactPlayer from 'react-player';

function ImageOrVideo ({ asset, caption, controls }) {


  return (
    <div className='image-or-video'>
      {
        asset[0].__typename === "SanityExtendedUrl" &&
        <div className='image-or-video__harness-16-9'>
          <ReactPlayer
            url={asset[0].url}
            loop
            playing={!controls}
            controls={controls}
            volume={controls ? 1 : 0}
            muted={!controls}
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
              background: !controls,
              autopause: true
            }}
          />
        </div>
      }

      {
        asset[0].__typename === "SanityImage" &&
        <Img className='image-or-video__img' fluid={asset[0].asset.fluid}/>
      }

      {
        caption &&
        <div className='image-or-video__caption'>{caption}</div>
      }
    </div>
  );
}

ImageOrVideo.propTypes = {
  asset: PropTypes.array,
  caption: PropTypes.string,
  controls: PropTypes.bool
};

ImageOrVideo.defaultProps = {
  controls: false
};

export default ImageOrVideo;
