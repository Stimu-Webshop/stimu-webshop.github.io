import React from 'react';
import { Link } from 'react-router-dom';
import LoginFunction from './LoginFunction';
import '../styles/Login.scss';

// Jos joku tänne eksyy nii nää vois tyylitellä (AccountPage, Loginpage, RegisteryPage, UpdateAccountInfo, LoginFunction) :) 


export default function LoginPage() {
  return (
    <>
    <div className='loginDiv'>
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