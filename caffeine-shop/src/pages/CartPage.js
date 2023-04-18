import React from 'react'
import axios from 'axios'
import CartContent from '../components/CartContent'
import '../styles/CartPage.scss'
import { useState, useEffect } from "react";
import Thankyou from './Thankyou';
import { Link } from 'react-router-dom';

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
    } else {
      console.log('User id is empty');
    }
  }, []);



  const handlePlaceOrder = () => {
    
  const orderData = {
    user_id: UserId.userId // Menee userId:n mukaiselle käyttäjälle
  }
    const confirmed = window.confirm('Haluatko varmasti vahvistaa tilauksen?');
    if (!confirmed) {
      return
    }
    // Päivittää inventaarion
    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateinventory.php", orderData)
      .catch(() => {
        // Inventory update failed
        console.log('Varaston päivitys epäonnistui');
      });


      // Lähettää datan order tauluun
    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/placeorder.php", orderData)
      .catch(() => {
        console.log('Tilauksen päivitys epäonnistui');
      });

      
      // Poistaa ostoskorin datan
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
    user_id: UserId.userId
  }
  const confirmed = window.confirm('Haluatko varmasti tyhjentää ostoskorin?');
  if (!confirmed) {
    return;
  }

    axios.post("https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deletecart.php",
      orderData
    )
      .then(() => {
       window.location.reload();
        // Delete successful
        // Update product list or do other actions as needed
      })
      .catch(() => {
        // Delete failed
        alert('Ostoskorin tyhjennys epäonnistui');
      });
  };
  let confirmButton = null;
  let guideText = null;
  if (UserId) {
  confirmButton = <button className='cartButton' onClick={handlePlaceOrder} disabled={isOrdering}>Vahvista ostokset</button>
  guideText = null;
  } else {
    guideText = <p>Sinun tulee olla sisäänkirjautunut tilataksesi.</p>
    confirmButton = <Link to="/login" ><button className='cartButton'>Kirjaudu</button></Link>;
  }

  let deleteButton = null;
  if (UserId) {
    deleteButton = <button className='cartButton' onClick={handleDeleteCart}>Tyhjennä kori</button>
  } else {
    deleteButton = null;
  }

  return (
  <div className='cartpage'>
  <h2>Ostoskori</h2>
  <CartContent />
  {guideText}
  {confirmButton}
  {deleteButton}
  
  </div>
  )
  }