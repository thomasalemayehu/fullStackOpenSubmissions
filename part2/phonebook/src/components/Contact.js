import React from 'react'

function Contact({contact}) {
    
  return (
    <div>
      <b>
        <em> {contact.name}</em>
      </b>

      <span> : {contact.phone}</span>
    </div>
  );
}

export default Contact