function ContactForm({
  name,
  phone,
  handlePhoneNumberChange,
  handleNameChange,
  addNewContact,
}) {
  return (
    <form onSubmit={addNewContact}>
      <div>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>

      <br />

      <div>
        <label htmlFor="phone">Phone : </label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneNumberChange}
        />
      </div>

      <br />

      <div>
        <input type="submit" />
      </div>
    </form>
  );
}

export default ContactForm;
