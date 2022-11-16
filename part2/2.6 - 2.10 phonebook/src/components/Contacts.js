import React from "react";
import Contact from "./Contact";

function Contacts({ contacts }) {
  return (
    <ul>
      {contacts.map((contact,index) => (
        <Contact key={index} contact={contact} />
      ))}
    </ul>
  );
}

export default Contacts;
