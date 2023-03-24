import React from 'react'
import axios from 'axios'
import CartContent from '../components/CartContent'
import '../styles/CartPage.scss'
import { useState } from "react";

export default function CartPage() {

  const [isOrdering, setIsOrdering] = useState(false);
  const orderData = {
    user_id: 1, // tällä hetkellä tilaukset menee aina käyttäjälle 1
  };

  const handlePlaceOrder = () => {
    setIsOrdering(true);

    axios
      .post(
        "https://www.students.oamk.fi/~n2jato00/PHP/products/deletecart.php",
        orderData
      )
      .then(() => {
        // Order successful
        alert('Order successful');
        // Clear cart or update cart as needed
      })
      .catch(() => {
        // Order failed
        alert('Order failed');
      });
  };

  const handleDeleteCart = () => {
    axios.post("https://www.students.oamk.fi/~n2jato00/PHP/products/deletecart.php",
      orderData
      )
      .then(() => {
        // Delete successful
        alert('Delete successful');
        // Update product list or do other actions as needed
      })
      .catch(() => {
        // Delete failed
        alert('Delete failed');
      });
  };
  return (
    <div className='cartpage'>
      <h2>Ostoskori</h2>
      <CartContent />
      <button onClick={handlePlaceOrder} disabled={isOrdering}>Vahvista ostokset</button>
      <button className='emptyCart' onClick={handleDeleteCart}>Tyhjennä kori</button>
    </div>
  )
}