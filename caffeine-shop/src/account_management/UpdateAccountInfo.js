import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UpdateAccountInfo() {
  const [userData, setUserData] = useState({
    username: '',
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

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(
        `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getaccountdata.php?userId=${userId}`
      )
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    console.log(userId);
    axios
      .get
        (`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateaccountdata.php?userId=${userId}`,
        userData
      )
      .then(response => {
        console.log('Account updated successfully');
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Account Information</h2>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={userData.username}
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
<button type="submit">Update Account</button>
</form>
);
}
