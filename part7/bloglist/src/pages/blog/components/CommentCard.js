import React from 'react'
import PropTypes from 'prop-types'

const CommentCard = ({id,comment,timestamp,username}) => {
  return (
    <div className='px-3 py-3 my-4' style={{border:'1px solid black',borderRadius:'12px'}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <h1>🧑</h1>
        <div style={{fontSize:"15px"}}>{username}</div>
      </div>

      <div style={{fontSize:'20px'}}>{comment}</div>
      <div style={{fontSize:"12px",fontStyle:"italic"}}>{timestamp}</div>
    </div>
  );
}

CommentCard.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};


export default CommentCard