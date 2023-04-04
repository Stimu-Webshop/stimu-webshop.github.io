import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginFunction from './LoginFunction';

import '../styles/Login.scss';

// Jos joku tänne eksyy nii nää vois tyylitellä (AccountPage, Loginpage, RegisteryPage, UpdateAccountInfo, LoginFunction) :) 

// TÄÄ ON NYT TURHA, MUTTA EN VIELÄ POISTA t. Sepi
export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin && (
      <div className='loginDiv'>
        <span class="material-symbols-outlined" id='closer' onClick={()=>setShowLogin(false)}>
          close
        </span>
        <h1>Kirjaudu sisään</h1>
        <div className='login'>
          <LoginFunction />
        </div>
        <p>
          Eikö sinulla ole vielä käyttäjätiliä?{' '}
          <Link to='/register'>Rekisteröidy.</Link>
        </p>
      </div>)}
    </>
  );
}