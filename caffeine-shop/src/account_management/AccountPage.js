import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AccountPage() {

  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    axios.get(`https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getaccountdata.php?userId=${userId}`)
    .then((response) => {
      console.log(response);
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
      <p>Filler sisältöä</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
