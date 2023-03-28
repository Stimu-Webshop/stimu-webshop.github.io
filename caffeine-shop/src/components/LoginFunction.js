import React, { useState } from 'react';
import axios from 'axios';

// 21:19 21.3.23 TODOs:
// Tässä ei oikee vielä mikään toimi jostain syystä - KORJATTU
// Havaittuja ongelmia: JSON ei päädy PHP:lle asti, vaikka bodyn pitäisi formatoitua oikein - KORJATTU
// Ongelma mahdollisesti php päässä, ehkä fetch -methodissa ongelmaa?  - KORJATTU
// - Samppa

// 14:28 28.3.23 TODOS:
// Toiminnallisuus korjattu
// Tehtäviä asioita, ongelmatilanteessa (wrong user/pass) tiedon näyttäminen kirjautujalle  - KORJATTU 
// User ID:n hakeminen kirjautuessa ja tallentaminen shoppingcart:ia varten  - KORJATTU
export default function LoginFunction() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [userId, setUserId] = useState('');
    
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const body = {username: username, password: password}
        console.log(body);
    
        // Send a POST request to the PHP file with the user's credentials
        axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/login.php", body, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
         if (!response.data) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then((data) => {
          if (data) { 
            setUserId(data);
            localStorage.setItem('userId', JSON.stringify(data));
            window.location.href = '/'; }
        })
        .catch((error) => {
          console.log(error);
          // Display a generic error message if the network request fails
          if (error.response.status === 401) {
            setError('Incorrect username or password.');
          } else {
            setError('Login failed. Please try again later.');
          }
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Käyttäjänimi:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Salasana:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Kirjaudu sisään</button>
          {error && <p>{error}</p>}
        </form>
      ); 
}
