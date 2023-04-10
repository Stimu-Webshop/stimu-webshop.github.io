import React from 'react'
import '../styles/Footer.scss'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <Link className='footerLink' to="/contactus">Palaute</Link>
          
          <p>
            Stimu.fi on TIK22SP Study Group 1 Ryhmä A:n yhteistyöprojekti web-palveluiden projektikurssille. <br />
            Aiheeksi valitsimme jokaiselle koodarille tutut kofeiini- ja piristetuotteet. <br />
            Stimu.fi on toteutettu Reactilla, PHP:lla ja MySQL-tietokannalla, taustatukenaan Bootstrap ja SASS. <br />
            <br />
            Työryhmä:<br />
            Severi Jokelainen <br />
            Sari Suomela<br />
            Tommi Järvenpää<br />
            Samuli Ruotsalainen<br />
          </p>
    </footer>
  )
}
