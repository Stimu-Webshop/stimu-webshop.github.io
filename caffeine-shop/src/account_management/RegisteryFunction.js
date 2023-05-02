import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RegisteryFunction() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [Error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('telephone', telephone);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('postal_code', postalCode);
    formData.append('country', country);
    fetch('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/register.php', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log(response);
        console.log(response.ok);
        setError(response.status);
        console.log(Error);
        if (response.ok) {
          setSuccess(true);
        } else if (Error === 409) {
          alert('This username is already in use.');
        } else {
          alert('Unknown error, please try again later!');
        }
      })
      .catch(error => {
        console.log(error.status);

        // Display error message to user
      });
  };

  
    if (success) {
      return (
        <>
        <div>
        <h1>Rekisteröinti onnistui!</h1>
        <p> Sinun tulee kirjautua sisälle tehdäksesis ostoksia.</p>
        <p>Paina <Link to='/'>Tästä</Link> kirjautuaksesi sisälle</p>
        </div>
        </>
      )
    }
    return (
      <div className='registryContainer'>
        <div className='registryAdvertisement'><h1>Kun rekisteröidyt</h1> 
        <div className='reasons'><p><FontAwesomeIcon
                      icon={faCheck}
                      className='checkMark' /> 
                      Saat parhaat etumme ja tarjouksemme</p>
                      <p><FontAwesomeIcon
                      icon={faCheck}
                      className='checkMark' /> 
                      Voit suorittaa ostoksia sivuillamme</p>
                      <p><FontAwesomeIcon
                      icon={faCheck}
                      className='checkMark' /> 
                      Lähetämme sinulle uutiskirjeemme joka kuukausi</p>
                      <p><FontAwesomeIcon
                      icon={faCheck}
                      className='checkMark' /> 
                      Pääset osaksi Stimu -yhteisöämme!</p>
                      </div>
                      </div>
        <div className='registryForm'>
        
        <form method='POST' onSubmit={handleSubmit}>
        <h1>Rekisteröidy</h1>
          <label>Käyttäjänimi
          <input type="text" name="username" value={username} required onChange={(event) => setUsername(event.target.value)}/><br/>
          </label>

          <label>Salasana
          <input type="password" name="password" value={password} required onChange={(event) => setPassword(event.target.value)}/><br/>
          </label>

          <label>Etunimi
          <input type="text" name="first_name" value={firstName} required onChange={(event) => setFirstName(event.target.value)}/><br/>
          </label>

          <label>Sukunimi
          <input type="text" name="last_name" value={lastName} required onChange={(event) => setLastName(event.target.value)}/><br/>
          </label>

          <label>Email
          <input type="email" name="email" value={email} required onChange={(event) => setEmail(event.target.value)}/><br/>
          </label>

          <label>Puhelin
          <input type="tel" name="telephone" value={telephone} required onChange={(event) => setTelephone(event.target.value)}/><br/>
          </label>

          <label>Katuosoite
          <input type="text" name="address" value={address} required onChange={(event) => setAddress(event.target.value)}/><br/>
          </label>

          <label>Kaupunki
          <input type="text" name="city" value={city} required onChange={(event) => setCity(event.target.value)}/><br/>
          </label>

          <label>Postinumero
          <input type="text" name="postal_code" value={postalCode} required onChange={(event) => setPostalCode(event.target.value)}/><br/>
          </label>

          <label>Maa
          <input type="text" name="country" value={country} required onChange={(event) => setCountry(event.target.value)}/><br/>
          </label>

          <button type="submit" className="registryButton">Rekisteröidy</button>
        </form>
        </div>
        </div>
      );
    }  
  
