
import React from 'react'
import LoginFunction from './LoginFunction'
import '../styles/Login.scss'

export default function LoginPage() {
  return (
    <>
    <h1>Kirjaudu sisään</h1>
    <div className='login'>
    <LoginFunction/>
    </div>
    <p>Eikö sinulla ole vielä käyttäjätiliä? Rekisteröidy.</p>
    </>
    )
}
