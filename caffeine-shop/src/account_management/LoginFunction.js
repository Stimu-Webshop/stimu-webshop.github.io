import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Jos joku tänne eksyy nii nää vois tyylitellä (AccountPage, Loginpage, RegisteryPage, UpdateAccountInfo, LoginFunction) :) 


export default function LoginFunction() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
    
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      useEffect(() => { 
        const userId = localStorage.getItem("userId");
        if(userId) {
          window.location.href = '/account';
        }
      }, [])
      
    
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
          console.log(data);
          console.log(data.userId);
          if (data.adminValue) {
            localStorage.setItem('adminValue', JSON.stringify(data.adminValue));
            localStorage.setItem('adminId', JSON.stringify(data.adminId));
            window.location.href = '/admin';
          } else if (data.userId) {
            localStorage.setItem('userId', JSON.stringify(data));
            window.location.href = '/';
          }
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
            Käyttäjänimi  
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Salasana
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit" className='loginButton'>Kirjaudu sisään</button>
          {error && <p>{error}</p>}
        </form>
      ); 
}
