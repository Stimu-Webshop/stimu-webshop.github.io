import React, { useState } from 'react';
import '../styles/ContactUs.scss';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    message: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/feedback.php', formData);
      alert('Feedback submitted successfully!');
    } catch (error) {
      alert('An error occurred while submitting feedback.');
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-story">
        Tervetuloa palautesivulle! Tämä on paikka, jossa voit lähettää meille kommentteja, kysymyksiä tai ehdotuksia. Ole hyvä ja täytä alla oleva lomake ja paina "Lähetä" -painiketta, kun olet valmis. Kiitos palautteestasi!
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="firstName">Etunimi:</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="lastName">Sukunimi:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="email">Sähköposti:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="address">Osoite:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

        <label htmlFor="phone">Puhelin:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="message">Viesti:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />

        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
}
