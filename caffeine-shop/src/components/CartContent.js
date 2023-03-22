import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export default function CartContent() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/shopping_cart/getcart.php";
        axios.get(PHP)
            .then(response => {
                setError(null);
                setIsLoaded(true);
                setCartItems(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

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