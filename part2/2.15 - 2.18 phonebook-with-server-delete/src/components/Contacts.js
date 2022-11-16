import React from "react";
import Contact from "./Contact";

function Contacts({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default Contacts;
