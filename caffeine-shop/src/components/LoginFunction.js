import React, { useState } from 'react';

// 21:19 21.3.23 TODOs:
// Tässä ei oikee vielä mikään toimi jostain syystä
// Havaittuja ongelmia: JSON ei päädy PHP:lle asti, vaikka bodyn pitäisi formatoitua oikein
// Ongelma mahdollisesti php päässä, ehkä fetch -methodissa ongelmaa? 
// - Samppa
export default function LoginFunction() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
    
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        console.log(username);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify({username, password})
        console.log(body);
    
        // Send a POST request to the PHP file with the user's credentials
        fetch("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/login.php", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              // Display an error message if the login failed
              setError(data.error);
            } else {
              // Redirect to the home page if the login was successful
              window.location.href = '/';
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
