import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

export default function CartContent({ update }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productId, setProductId] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [LocalCartItems, setLocalCartItems] = useState([]);
  const storedUserId = JSON.parse(localStorage.getItem('userId'));
  const userId = storedUserId ? storedUserId.userId : null;

  const localItems = localStorage.getItem('cartItems');
  const localCartItems = JSON.parse(localItems);

  
 // Älkää tehkö ostoksia loppuun asti ilman että olette sisäänkirjautuneena, voi mennä rikki
  // 11.4 TODOs:
  // Ei voi tehdä ostoksia ilman sisäänkirjautumista
  // Kassalle napin sijasta kirjaudu tms nappi

  useEffect(() => {
    // Tarkistaa onko käyttäjä kirjautunut sisälle, jos on hakee käyttäjän henkilökohtaisen ostoskorin.
    if (userId) {
    const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getcart.php";
    const url = `${PHP}?UserId=${userId}`;
    
    axios
      .get(url)
      .then((response) => {
        setError(null);
        setIsLoaded(true);
        setCartItems(response.data);
        if (response.data[0].product_id) {
        setProductId(response.data[0].product_id)
        }
      })
      .catch((error) => {
        if (cartItems.length != 0){
        setError(error);}
      });
      return
    }
    // Tarkistaa onko käyttäjällä localstoragessa tuotteita, jos on näytää ne ostoskorissa.
    else if (localCartItems) {
      setError(null);
      setIsLoaded(true);
      setCartItems(localCartItems);
      return;
  } else if (!localCartItems || cartItems.length == 0) {
      setIsLoaded(true);
    }

  }, [update, cartItems.length]);


  //Delete item from shopping cart 
  const deleteCartItem = (index, quantity, itemProductId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tuotteen ostoskorista?');
    if (!confirmed) {
      return
    }
    // Tarkistaa onko käyttäjä kirjautunut sisälle. Jos ei ole, poistaa tuotteen tiedot localstoragesta.
    if (!userId) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index,1);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return;
    }

    // Jos käyttää on kirjautunut poistaa tuotteen tietokannasta
    const url = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deleteitem.php"
    const deleteData = { user_id: userId, product_id: itemProductId, quantity: quantity};
    axios
      .post(url, deleteData)
      .then((response) => {
        // Refresh the cart items after deletion
        setCartItems([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (cartItems.length > 0) {
    return (
      <>
        {cartItems.map((item, index) => (
          <div className="cartItem" key={item.id}>
            <div className="left">
              <ul>
                <li className="itemName">{item.name}</li>
                <li>Määrä: {item.quantity}</li>
                <li>Summa: {parseFloat(item.total).toFixed(2)} eur</li>
                <li className="deleteItem" key={index} onClick={() => deleteCartItem(index, item.quantity, item.product_id)}><FontAwesomeIcon
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
  } else if (cartItems.length === 0 || (!localCartItems )) {
    return <div>Ostoskorisi on tyhjä</div>;
  } 
}
