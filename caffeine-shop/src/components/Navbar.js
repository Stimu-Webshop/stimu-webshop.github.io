//17.3.2023 Sari lisäsi ostokorin ja siihen liittyvät jutut

import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ShoppingCart from "./Shoppingcart";

import logo from "../img/logo_stimu.png"

export default function Navbar() {

  // Shopping cart functions
  const [showCart, setShowCart] = useState(false)

  const toggleCart = () => {
    setShowCart(!showCart)
  }

  return (
    <>
      <nav id="nav" className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <div class="dropdown">
                <button class="btn btn-dropdown btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Tuotteet
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link class="dropdown-item" to="/products">Kaikki tuotteet</Link>
                  <Link class="dropdown-item" to="/coffee">Kahvit</Link>
                  <Link class="dropdown-item" to="/energydrinks">Energiajuomat</Link>
                  <Link class="dropdown-item" to="/pwo">Pre-workout</Link>
                </div>
              </div>
              <form className="search-bar-container">
                <Search />
              </form>
            </ul>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="shoppingCart"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas"
              onClick={toggleCart}
            />
          </div>
        </div>
      </nav>

      {/* // Shopping cart */}
      <div
        className={`offcanvas offcanvas-end ${showCart ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel">

        <ShoppingCart />

      </div>
    </>
  );
}
