import React, { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

export default function CartContent() {
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

  
  // 17:09 28.3.23 CART FUNKTIOT TOIMII VAIN SISÄÄNKIRJAUTUNEENA.
  // TÄHÄN RATKAISUA LÄHITULEVAISUUDESSA
  // TOIMIVAT KÄYTTÄJÄTUNNUKSET LÖYTYY DISCORDISTA
  // - Samppa 
  useEffect(() => {
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
    else if (localCartItems) {
      setError(null);
      setIsLoaded(true);
      setCartItems(localCartItems);
      return;
  } else if (!localCartItems || cartItems.length == 0) {
      setIsLoaded(true);
    }

  }, [cartItems, userId, localCartItems]);


  //Delete item from shopping cart TÄMÄ EI TOIMI VIELÄ! 
  const deleteCartItem = (index, quantity, itemProductId) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tuotteen ostoskorista?');
    if (!confirmed) {
      return
    }
    if (!userId) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index,1);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return;
    }
    const url = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deleteitem.php"
    const deleteData = { user_id: userId, product_id: itemProductId, quantity: quantity};
    axios
      .post(url, deleteData)
      .then((response) => {
        console.log(response)
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
  } else if (cartItems.length === 0 || (!localCartItems && localCartItems.length === 0)) {
    return <div className="emptyCart">Ostoskorisi on tyhjä</div>;
  } else {
    return (
      <>
        {cartItems.map((item, index) => (
          <div className="cartItem" key={item.id}>
            <div className="left">
              <ul>
                <li className="itemName">{item.name}</li>
                <li>Määrä: {item.quantity}</li>
                <li>Summa: {item.total} eur</li>
                <li className="deleteItem" key={index} onClick={() => deleteCartItem(index, item.quantity, item.product_id)}><FontAwesomeIcon
            icon={faTrashCan}/> Poista tuote</li> {/* Ei toimi vielä, linkki vaan näkyy tällä hetkellä. */}
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
