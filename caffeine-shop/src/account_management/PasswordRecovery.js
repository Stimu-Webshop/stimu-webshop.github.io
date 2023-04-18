import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function PasswordRecovery() {

    const [Email, setEmail] = useState('');
    
    function handlePost (){
        axios
        .post(
            'https://students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/passwordrecovery.php', Email
        )
        .then((response) => {
         
        })
        .catch((error) => {
            console.log(error);
          });
}

    return (
    <>
    <div>
    <h1>Palauta salasanasi</h1>
    <p>Salasanasi lähetetään sähköpostiisi, mikäli sillä on olemassaoleva käyttäjätili</p> 
    <input type="text" name='email' placeholder='Syötä sähköpostiosoitteesi' onChange={(e) => {setEmail(e.target.value)}}/>
    <button name='reset-request-submit' onClick={handlePost}>Pyydä uusi salasana.</button>
    </div>
    </>
 )
}
