import React from 'react'
import axios from 'axios'
import CartContent from '../components/CartContent'
import '../styles/CartPage.scss'
import { useState, useEffect } from "react";
import Thankyou from './Thankyou';

export default function CartPage() {

  const [isOrdering, setIsOrdering] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [UserId, setUserId] = useState(null)

  // 17:09 28.3.23 CART FUNKTIOT TOIMII VAIN SISÄÄNKIRJAUTUNEENA.
  // TÄHÄN RATKAISUA LÄHITULEVAISUUDESSA
  // TOIMIVAT KÄYTTÄJÄTUNNUKSET LÖYTYY DISCORDISTA
  // - Samppa 
  
  // TÄMÄ HAKEE USERID:N LOCALSTORAGESTA SIVUN LADATESSA JA TALLENTAA SEN MUUTTUJAAN
  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(UserId);
    } else {
      console.log('User id is empty');
    }
    console.log(storedUserId);
  }, []);



  const handlePlaceOrder = () => {
    
  const orderData = {
    user_id: UserId.userId // Menee userId:n mukaiselle käyttäjälle
  }
    const confirmed = window.confirm('Haluatko varmasti vahvistaa tilauksen?');
    if (!confirmed) {
      return
    }
    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateinventory.php", orderData)
      .then(() => {
        // Inventory update successful
        console.log('Varasto päivitetty');
        // Clear cart or update cart as needed
      })
      .catch(() => {
        // Inventory update failed
        console.log('Varaston päivitys epäonnistui');
      });
    axios
      .post(
        "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deletecart.php",
        orderData
      )
      .then(() => {
        // Order successful
        setShouldRedirect(true);

      })
      .catch(() => {
        // Order failed
        alert('Tilaus epäonnistui');
      });
  };

  if (shouldRedirect) {
    return <Thankyou />
  }

  const handleDeleteCart = () => {
    
  const orderData = {
    user_id: UserId.userId // tällä hetkellä tilaukset menee aina käyttäjälle 1
  }
    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deletecart.php",
      orderData
    )
      .then(() => {
        // Delete successful
        alert('Ostoskori tyhjennetty');
        // Update product list or do other actions as needed
      })
      .catch(() => {
        // Delete failed
        alert('Ostoskorin tyhjennys epäonnistui');
      });
  };
  return (
    <div className='cartpage'>
      <h2>Ostoskori</h2>
      <CartContent />
      <button className='cartButton' onClick={handlePlaceOrder} disabled={isOrdering}>Vahvista ostokset</button>
      <button className='cartButton' onClick={handleDeleteCart}>Tyhjennä kori</button>
    </div>
  )
}