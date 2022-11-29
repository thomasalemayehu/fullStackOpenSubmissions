import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Toggleable = ({ buttonLabel, cancelButtonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const displayStyle = { display: '' };
  const hideStyle = { display: 'none' };

  return (
    <div className='toggleable__container'>
      <button
        className='toggleable__show__button'
        style={isVisible ? hideStyle : displayStyle}
        onClick={() => setIsVisible(true)}
      >
        {buttonLabel}
      </button>

      <div className='toggleable__content__container' style={isVisible ? displayStyle : hideStyle}>{children}</div>

      <button
        className='toggleable__hide__button'
        style={isVisible ? displayStyle : hideStyle}
        onClick={() => setIsVisible(false)}
      >
        {cancelButtonLabel}
      </button>
    </div>
  );
};
Toggleable.displayName ='CustomToggleable';
Toggleable.propTypes = {
  buttonLabel:PropTypes.string.isRequired,
  cancelButtonLabel:PropTypes.string.isRequired,
  children:PropTypes.element.isRequired
};


export default Toggleable;
