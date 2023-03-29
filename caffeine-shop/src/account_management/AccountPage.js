import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateAccountInfo from './UpdateAccountInfo';

// TODOs:
// Tässä nyt toimii vain tietojen haku, korjattavaa käyttäjälle mahdollisuus muokata käyttäjätietoja
// Salasanan vaihto, yms (tämän varmennus myös)
// Vastaavaa PHP tiedostoa ei vielä ole, UpdateAccountInfo.js on mockup tiedosto joka pienellä fixillä saattais toimia
// 17:06 29.3.23 - Samppa

export default function AccountPage() {

  const [User, setUser] = useState({})

  
  // Hakee käyttäjän IDseen liittyvän datan.
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios.get(`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getaccountdata.php?userId=${userId}`)
    .then((response) => {
      setUser(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  

  // Kirjaa käyttäjän ulos
  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  


  return (
    <>
      <h1>Account Page</h1>
     
    <div>
      <h2>{User.username}</h2>
      <p>{User.first_name} {User.last_name}</p>
      <p>{User.email}</p>
      <p>{User.telephone}</p>
      <p>{User.address}, {User.city} {User.postal_code}, {User.country}</p>
    </div>
      <button onClick={handleLogout}>Kirjaudu ulos</button>
      <button onClick={<UpdateAccountInfo/>}>Päivitä tietoja</button>
    </>
  );
}
