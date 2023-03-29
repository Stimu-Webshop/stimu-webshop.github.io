import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function UpdateAccountInfo() {
    

      const [user, setUser] = useState({});
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [telephone, setTelephone] = useState('');
      const [address, setAddress] = useState('');
      const [city, setCity] = useState('');
      const [postalCode, setPostalCode] = useState('');
      const [country, setCountry] = useState('');
    
      useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios
          .get(`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getaccountdata.php?userId=${userId}`)
          .then((response) => {
            setUser(response.data);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);
            setEmail(response.data.email);
            setTelephone(response.data.telephone);
            setAddress(response.data.address);
            setCity(response.data.city);
            setPostalCode(response.data.postal_code);
            setCountry(response.data.country);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.href = '/';
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        axios
          .post(`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateaccountdata.php?userId=${userId}`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            telephone: telephone,
            address: address,
            city: city,
            postal_code: postalCode,
            country: country,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      return (
        <>
          <h1>Account Page</h1>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
              Last Name:
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Telephone:
              <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </label>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
              City:
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
              Postal Code:
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        </form>
    </>
    )
}
