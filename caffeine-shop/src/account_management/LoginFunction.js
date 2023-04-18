import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function LoginFunction() {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
  

      const [LocalCartItems, setLocalCartItems] = useState([]);
      
     
      
    
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

      
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const body = { username: username, password: password };
             
        // Send a POST request to the PHP file with the user's credentials
        axios
          .post(
            "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/login.php",
            body,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((response) => {
            if (!response.data) {
              throw new Error("Network response was not ok");
            }
            return response.data;
          })
          .then((data) => {

            // If block for if the user is admin
            if (data.adminValue) {
              localStorage.setItem("adminValue", JSON.stringify(data.adminValue));
              localStorage.setItem("adminId", JSON.stringify(data.adminId));
              localStorage.removeItem("cartItems");
              window.location.href = "/admin";
              return;
            } else if (data.userId) {
              // If block for if the user is a regular user
              localStorage.setItem("userId", JSON.stringify(data));

              // Checks if the user has stored items in the shopping cart while anonymous shopping. Adds the items to the user's personal cart
              if (LocalCartItems && LocalCartItems.length > 0)  {
                const cartItems = LocalCartItems.map(item => {
                  return {
                    user_id: data.userId,
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.quantity * item.price,
                    image: item.image,
                  };
                });
                setLocalCartItems(cartItems); 
              // Post request to send the data to the database  
                axios
                .post(
                  "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/shoppingcart.php",
                  cartItems // Send the cart data as an array
                )
                .then(() => {
                  // Tämä ei toimi vielä, location ei muutu, cartItems poistuu(?)
                  localStorage.removeItem('cartItems');
                })
                .catch((error) => {
                  console.log(error);
                });
            }            
            window.location.href = '/';
          }
          })
          .catch((error) => {
            console.log(error);
            // Display a generic error message if the network request fails
            if (error.response.status === 401) {
              setError("Väärä käyttäjätunnus tai salasana");
            } else {
              setError("Kirjautuminen epäonnistui. Yritä uudelleen.");
            }
          });
        
      };
      // Updates cart items on submit
      const handleCartUpdate = () => {
        const cartItems2 = JSON.parse(localStorage.getItem('cartItems'));
        setLocalCartItems(cartItems2); 
      }
    
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
          <button type="submit" className='loginButton' onClick={handleCartUpdate}>Kirjaudu sisään</button>
          {error && <p>{error}</p>}
        </form>
      ); 
}
