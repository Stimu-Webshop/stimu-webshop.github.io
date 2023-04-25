import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateAccountInfo from './UpdateAccountInfo';
import '../styles/AccountPage.scss'

// Jos joku tänne eksyy nii nää vois tyylitellä (AccountPage, Loginpage, RegisteryPage, UpdateAccountInfo, LoginFunction) :) 


export default function AccountPage() {

  const [user, setUser] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  
  // Hakee käyttäjän IDseen liittyvän datan.
  useEffect(() => {
    const userId = localStorage.getItem("userId");
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
    localStorage.removeItem('adminValue');
    localStorage.removeItem('adminId');
    window.location.href = '/#/';
  };

  // Siirtyy käyttäjän tietojen päivitysmoodiin
  const handleUpdateInfo = () => {
    setUpdateMode(true);
    document.getElementById("updateInfoButton").classList.add('hidden') //piilota siirtymänappi kun ollaan päivitysmoodissa
  }

  return (
    <>
    <div className='accountInfoDiv'>
      <h1>Käyttäjätilin tiedot</h1>
     
      {updateMode ? (
        <UpdateAccountInfo user={user} setUser={setUser} setUpdateMode={setUpdateMode} />
      ) : (
        <div className='userInfo'>
          <h2>{user.username}</h2>
          <p><label>Etunimi:</label> {user.first_name}</p> <p><label>Sukunimi:</label> {user.last_name}</p>
          <p><label>Sähköposti:</label> {user.email}</p>
          <p><label>Puhelinnumero:</label> {user.telephone}</p>
          <p><label>Katuosoite:</label> {user.address} <label>Kaupunki:</label> {user.city} <label>Postinumero:</label> {user.postal_code} <label>Maa:</label> {user.country}</p>
        </div>
      )}
      <div className='accountButtons'>
      <button id="logOutButton" onClick={handleLogout}>Kirjaudu ulos</button>
      <button id="updateInfoButton" onClick={handleUpdateInfo}>Päivitä tietoja</button>
      </div>
      </div>
    </>

  );
}
