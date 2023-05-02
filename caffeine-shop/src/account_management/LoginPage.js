import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginFunction from './LoginFunction';

import '../styles/Login.scss';
export default function LoginPage() {
  

  return (
    <>
      <div className='loginDiv2'>
        <h1>Kirjaudu sisään</h1>
        <div className='login'>
          <LoginFunction />
        </div>
        <p>
          Eikö sinulla ole vielä käyttäjätiliä?{' '}
          <Link to='/register'>Rekisteröidy.</Link>
        </p>
      </div>
    </>
  );
}