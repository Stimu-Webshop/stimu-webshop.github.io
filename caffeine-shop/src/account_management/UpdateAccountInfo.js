import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Jos joku tänne eksyy nii nää vois tyylitellä (AccountPage, Loginpage, RegisteryPage, UpdateAccountInfo, LoginFunction) :) 

export default function UpdateAccountInfo() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    current_password: '',
    new_password: ''
  });
  const [InitUsername, setInitUsername] = useState('')
  const [error, setError] = useState('');

  // Hakee alkuperäiset käyttäjätiedot tietokannasta

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(
        `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getaccountdata.php?userId=${userId}`
      )
      .then(response => {
        setUserData({...response.data, username: ''});
        setInitUsername(response.data.username);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

// Funktio vastuussa tietojen päivittämisestä, onnistuessa ilmoittaa tietojen muuttumisen onnistuneen, epäonnistuessa näyttää error-viestin

  const handleSubmit = event => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const userDataWithUserId = { ...userData, userId };
    console.log(userDataWithUserId);
    axios
      .post(
        `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateaccountdata.php`,
        userDataWithUserId
      )
      .then(response => {
        setError('Account updated succesfully!');
        setTimeout(() => {
          window.location.href = "/account";
        }, 500); // delay the redirection for 2 seconds (2000 milliseconds)
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          setError('Incorrect password.');
        } else if (error.response.status === 409){ 
          setError('Username already exists.')
        } 
          else {
          setError('Login failed. Please try again later.');
        }
      });
  };

 // Tallentaa muuttujiin tiedot

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='updateAccount'>
    <form onSubmit={handleSubmit}>
      <h2>Päivitä tietoja käyttäjätunnukselle {InitUsername}</h2>
      <label>
        Uusi käyttäjätunnus:
        <input
          type="text"
          name="username"
          onChange={handleChange}
        />
      </label>
      <label>
        Etunimi:
        <input
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Sukunimi:
        <input
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Sähköposti:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Puhelinnumero:
        <input
          type="text"
          name="telephone"
          value={userData.telephone}
          onChange={handleChange}
        />
      </label>
      <label>
        Katuosoite:
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </label>
      <label>
        Kaupunki:
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Postinumero:
        <input
          type="text"
          name="postal_code"
          value={userData.postal_code}
          onChange={handleChange}
        />
      </label>
      <label>
        Maa:
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Nykyinen salasana:
        <input
          type="password"
          name="current_password"
          value={userData.current_password}
          onChange={handleChange}
        />
      </label>
      <label>
        Uusi salasana:
        <input
          type="password"
          name="new_password"
          value={userData.new_password}
onChange={handleChange}
/>
</label>
<button type="submit">Päivitä</button>
{error && <p>{error}</p>}
</form>
</div>
);
}
