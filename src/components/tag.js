import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/tag.scss';

function Tag ({
                tag,
                light,
                selected,
                handleSelect,
                handleRemove,
                onlyHoverWhenDeselected,
                disabled
              }) {
  const tagButton = useRef(null);
  const handleClick = () => {
    selected ? handleRemove(tag) : handleSelect(tag);
  };

  return (
    <div className={`tag 
            ${light ? 'tag--light' : ''} 
            ${selected ? 'tag--selected' : ''}
            ${disabled ? 'tag--disabled' : ''}
            ${onlyHoverWhenDeselected ? 'tag--only-hover-when-deselected' : ''}`}
         ref={tagButton}
         onClick={handleClick}>
      {tag ? tag.title : 'no tag!'}
    </div>
  );
}

Tag.propTypes = {
  title: PropTypes.string,
  light: PropTypes.bool,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  handleRemove: PropTypes.func,
  onlyHoverWhenDeselected: PropTypes.bool
};

Tag.defaultProps = {
  light: false,
  selected: false,
  onlyHoverWhenDeselected: false
};

export default Tag;
