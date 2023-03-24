import React from 'react'
import axios from 'axios'
import CartContent from '../components/CartContent'
import '../styles/CartPage.scss'
import { useState } from "react";

export default function CartPage() {

  const [error, setError] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [message, setMessage] = useState(null);
  const orderData = {
    user_id: 2, // replace with the actual user ID
    // other order data...
  };

  const handlePlaceOrder = () => {
    setIsOrdering(true);

    axios
      .post(
        "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deletecart.php",
        orderData
      )
      .then((response) => {
        setIsOrdering(false);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setIsOrdering(false);
        setError(error);
      });
  };

  const handleDeleteCart = () => {
    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/shopping_cart/deletecart.php",
      orderData
      )
      .then(response => {
        alert("Cart deleted successfully");
        // Clear cart
      })
      .catch(error => {
        console.log(error);
        alert("Error deleting cart");
      });
  }
  return (
    <div className='cartpage'>
      <h2>Ostoskori</h2>
      <CartContent />
      <button onClick={handlePlaceOrder} disabled={isOrdering}>Vahvista ostokset</button>
      {message && <p>{message}</p>}
      {error && <p>Error: {error.message}</p>}
      <button className='emptyCart' onClick={handleDeleteCart}>Tyhjennä kori</button>
    </div>
  )
}