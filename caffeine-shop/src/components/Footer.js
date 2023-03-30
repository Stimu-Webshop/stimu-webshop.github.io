import React from 'react'
import '../styles/Footer.scss'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <Link className='footerLink' to="/contactus">Palaute</Link>
          
          <p>Toinen laatikko missä lukee propagandaa huumeiden käytöstä</p>
    </footer>
  )
}
