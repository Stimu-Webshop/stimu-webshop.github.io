import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateAccountInfo from './UpdateAccountInfo';

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
    window.location.href = '/';
  };

  // Siirtyy käyttäjän tietojen päivitysmoodiin
  const handleUpdateInfo = () => {
    setUpdateMode(true);
  }

  return (
    <>
      <h1>Account Page</h1>
     
      {updateMode ? (
        <UpdateAccountInfo user={user} setUser={setUser} setUpdateMode={setUpdateMode} />
      ) : (
        <div>
          <h2>{user.username}</h2>
          <p>{user.first_name} {user.last_name}</p>
          <p>{user.email}</p>
          <p>{user.telephone}</p>
          <p>{user.address}, {user.city} {user.postal_code}, {user.country}</p>
        </div>
      )}
      
      <button onClick={handleLogout}>Kirjaudu ulos</button>
      <button onClick={handleUpdateInfo}>Päivitä tietoja</button>
    </>
  );
}
