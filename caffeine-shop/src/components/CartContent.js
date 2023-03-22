import React from "react";
import {Link} from "react-router-dom";


export default function CartContent()    {
    return (
        <>
        <div className="cartItem">
  <div className="left">
    <ul>
      <li>Tuote</li>
      <li>Määrä: x</li>
      <li>Summa: y</li>
    </ul>
  </div>
  <div className="right">
    <img src="https://via.placeholder.com/300x300" />
  </div>
</div>
<p>Yhteensä: 94 589 eur</p>
    
    

    </>
    )
}