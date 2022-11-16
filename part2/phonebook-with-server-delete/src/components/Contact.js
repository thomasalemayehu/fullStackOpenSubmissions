import React from "react";

function Contact({ contact, onDelete }) {
  return (
    <div>
      <br />
      <b>
        <em>{contact.id} - {contact.name}</em>
      </b>

      <span> : {contact.phone}</span>

      <span> {"    "}</span>

      <button
        onClick={() => {
          onDelete(contact.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
