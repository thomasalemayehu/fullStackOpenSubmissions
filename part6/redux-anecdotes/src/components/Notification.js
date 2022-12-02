import React from 'react'
import PropTypes from 'prop-types'

function Notification({ id, content }) {
  return (
    <div>
      {id} : {content}
    </div>
  )
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Notification
