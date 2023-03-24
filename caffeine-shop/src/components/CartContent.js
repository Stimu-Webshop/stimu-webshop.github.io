import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CartContent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getcart.php";
    axios
      .get(PHP)
      .then((response) => {
        setError(null);
        setIsLoaded(true);
        setCartItems(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [cartItems]);

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.total), 0);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {cartItems.map((item) => (
          <div className="cartItem" key={item.id}>
            <div className="left">
              <ul>
                <li>{item.name}</li>
                <li>Määrä: {item.quantity}</li>
                <li>Summa: {item.total} eur</li>
              </ul>
            </div>
            <div className="right">
              <img src="https://via.placeholder.com/300x300" alt="" />
            </div>
          </div>
        ))}
        <p>Yhteensä: {totalPrice} eur</p>
      </>
    );
  }
}
