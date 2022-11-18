import axios from "axios";

const BASE_URL = "/api";
const fetchAllContacts = () => {
  const request = axios.get(`${BASE_URL}/contacts`);
  return request.then((response) => {
    return response.data;
  });
};

const createNewContact = (contact) => {
  const request = axios.post(`${BASE_URL}/contact`, contact);

  return request.then((response) =>  response.data);
};

const deleteContact = (contactId) => {
  const request = axios.delete(`${BASE_URL}/contact/${contactId}`);

  return request.then((response) => response.data);
};

const updateContact = (updateInfo, contactId) => {
  const request = axios.put(`${BASE_URL}/contact/${contactId}`, updateInfo);

  return request.then((response) => response.data);
};

export { fetchAllContacts, createNewContact, deleteContact, updateContact };
