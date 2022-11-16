import axios from "axios";

const BASE_URL = "http://localhost:3001/contacts";
const fetchAllContacts = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const createNewContact = (contact) => {
  const request = axios.post(BASE_URL, contact);

  return request.then((response) => response.data);
};

const deleteContact = (contactId) => {
  const request = axios.delete(`${BASE_URL}/${contactId}`);

  return request.then((response) => response.data);
};

const updateContact = (updateInfo, contactId) => {
  const request = axios.patch(`${BASE_URL}/${contactId}`, updateInfo);

  return request.then((response) => response.data);
};

export { fetchAllContacts, createNewContact, deleteContact, updateContact };
