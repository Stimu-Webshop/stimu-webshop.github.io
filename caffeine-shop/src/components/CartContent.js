import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

export default function CartContent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const storedUserId = JSON.parse(localStorage.getItem('userId'));
  const userId = storedUserId ? storedUserId.userId : null;
  
  // 17:09 28.3.23 CART FUNKTIOT TOIMII VAIN SISÄÄNKIRJAUTUNEENA.
  // TÄHÄN RATKAISUA LÄHITULEVAISUUDESSA
  // TOIMIVAT KÄYTTÄJÄTUNNUKSET LÖYTYY DISCORDISTA
  // - Samppa 
  useEffect(() => {
    const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getcart.php";
    const url = `${PHP}?UserId=${userId}`;
    axios
      .get(url)
      .then((response) => {
        setError(null);
        setIsLoaded(true);
        setCartItems(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [cartItems, userId]);
 

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (cartItems.length === 0) {
    return <div>Ostoskorisi on tyhjä</div>;
  } else {
    return (
      <>
        {cartItems.map((item) => (
          <div className="cartItem" key={item.id}>
            <div className="left">
              <ul>
                <li className="itemName">{item.name}</li>
                <li>Määrä: {item.quantity}</li>
                <li>Summa: {item.total} eur</li>
                <li className="deleteItem"><FontAwesomeIcon
            icon={faTrashCan}/> Poista tuote</li>
              </ul>
            </div>
            <div className="right">
              <img src={item.image} alt={item.name} />
            </div>
          </div>
        ))}
        <p>Yhteensä: {totalPrice} eur</p>
      </>
    );
  }
}
