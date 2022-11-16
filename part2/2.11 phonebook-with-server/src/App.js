import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // states
  const [contacts, setContacts] = useState([]);
  const [contactsToShow,setContactsToShow] = useState(contacts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [filterString,setFilterString] = useState("");


  const getAllContacts = async()=>{
     axios
       .get("http://localhost:3001/contacts")
       .then((response) => {
        setContactsToShow(response.data); 
        setContacts(response.data)}
        );
  }


  useEffect(()=>{
   getAllContacts();
  },[]);




  // event handlers
  const onNameInputChange = (event) => setName(event.target.value);

  const onPhoneInputChange = (event) => setPhone(event.target.value);

  const onFilterStringChange = (event) => {
    setFilterString(event.target.value)
    if (event.target.value != null && event.target.value !== "") {
      setContactsToShow(
        contacts.filter((contact) =>
          contact.name.toUpperCase().includes(event.target.value.toUpperCase())
        )
      );
    } else {
      setContactsToShow(contacts);
    }
   
    
  }

  //  submit functions
  const addNewContact = (event) => {
    event.preventDefault();
    const newContact = {
      "name":name,
      "phone":phone,
    };

    const count = contacts.filter((contact) => contact.name.toUpperCase() === newContact.name.toUpperCase()).length;

    if(count === 0){
      setContacts(contacts.concat(newContact));
      setContactsToShow(contacts.concat(newContact));
    }else{
      alert(`${newContact.name} already added`)
    }

    setName("");
    setPhone("");
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
      <Contacts contacts={contactsToShow} />
    </div>
  );
}

export default App;
