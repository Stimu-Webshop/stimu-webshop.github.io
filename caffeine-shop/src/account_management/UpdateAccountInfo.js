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
    <form onSubmit={handleSubmit}>
      <h2>Update Account Information</h2>
      <label>
        Current Username : {InitUsername}
        <input
          type="text"
          name="username"
          placeholder='Enter new username:'
          onChange={handleChange}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Telephone:
        <input
          type="text"
          name="telephone"
          value={userData.telephone}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Postal Code:
        <input
          type="text"
          name="postal_code"
          value={userData.postal_code}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={userData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Password:
        <input
          type="password"
          name="current_password"
          value={userData.current_password}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          name="new_password"
          value={userData.new_password}
onChange={handleChange}
/>
</label>
<button type="submit">Update</button>
{error && <p>{error}</p>}
</form>
);
}
