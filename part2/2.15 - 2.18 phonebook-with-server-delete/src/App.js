import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import React, { useEffect, useState } from "react";

import {
  fetchAllContacts,
  createNewContact,
  deleteContact,
  updateContact,
} from "./services/methods";

function App() {
  // states
  const [contacts, setContacts] = useState([]);
  const [contactsToShow, setContactsToShow] = useState(contacts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filterString, setFilterString] = useState("");

  const getAllContacts = () => {
    fetchAllContacts().then((response) => {
      setContactsToShow(response);
      setContacts(response);
    });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  // event handlers
  const onNameInputChange = (event) => setName(event.target.value);

  const onPhoneInputChange = (event) => setPhone(event.target.value);

  const onFilterStringChange = (event) => {
    setFilterString(event.target.value);
    if (event.target.value != null && event.target.value !== "") {
      setContactsToShow(
        contacts.filter((contact) =>
          contact.name.toUpperCase().includes(event.target.value.toUpperCase())
        )
      );
    } else {
      setContactsToShow(contacts);
    }
  };

  //  submit functions
  const addNewContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: name,
      phone: phone,
    };

    const filteredContacts = contacts.filter(
      (contact) => contact.name.toUpperCase() === newContact.name.toUpperCase()
    );

    if (filteredContacts.length === 0) {
      // send request to json-server
      createNewContact(newContact).then((response) => {
        setContacts(contacts.concat(response));
        setContactsToShow(contacts.concat(response));
      });
    } else {
      if (
        window.confirm(
          `${newContact.name} already exists. Do you want to replace?`
        )
      ) {
        updateContact(newContact, filteredContacts[0].id).then((response) => {
          setContacts(
            contacts.map((contact) =>
              contact.id === response.id ? response : contact
            )
          );
          setContactsToShow(
            contactsToShow.map((contact) =>
              contact.id === response.id ? response : contact
            )
          );
        });
      }
    }

    setName("");
    setPhone("");
  };

  const deleteAContact = (contactId) => {
    // console.log(contactId);
    if (window.confirm("Do you want to delete this contact")) {
      deleteContact(contactId).then((response) => {
        setContacts(contacts.filter((contact) => contact.id !== contactId));
        setContactsToShow(
          contactsToShow.filter((contact) => contact.id !== contactId)
        );
      });
    }
  };
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <hr />

      <Filter
        onFilterStringChange={onFilterStringChange}
        filterString={filterString}
      />

      <h1>Add a new note</h1>

      <ContactForm
        name={name}
        phone={phone}
        handleNameChange={onNameInputChange}
        handlePhoneNumberChange={onPhoneInputChange}
        addNewContact={addNewContact}
      />

      <hr />

      <h1>Numbers</h1>
      <Contacts contacts={contactsToShow} onDelete={deleteAContact} />
    </div>
  );
}

export default App;
