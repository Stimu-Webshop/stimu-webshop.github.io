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
        if (response.data[0].product_id) {
        setProductId(response.data[0].product_id)
        }
      })
      .catch((error) => {
        if (cartItems.length != 0){
        setError(error);}
      });
  }, [cartItems, userId]);


  //Delete item from shopping cart TÄMÄ EI TOIMI VIELÄ! 
  const deleteCartItem = (itemProduct_id, quantity) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tuotteen ostoskorista?');
    if (!confirmed) {
      return
    }
    const url = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/deleteitem.php"
    const deleteData = { user_id: userId, product_id: itemProduct_id, quantity: quantity};
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
                <li className="deleteItem" key={item.product_id} onClick={() => deleteCartItem(item.product_id, item.quantity)}><FontAwesomeIcon
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
