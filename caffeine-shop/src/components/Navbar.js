//17.3.2023 Sari lisäsi ostokorin ja siihen liittyvät jutut

import React, { useEffect, useRef } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginFunction from '../account_management/LoginFunction';
import "../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import CartOffcanvas from "./CartOffcanvas";

import logo from "../img/logo_stimu.png"

export default function Navbar() {
  // This is used for closing the login form when clicking outside of it
  const loginRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginRef]);

  

  // Shopping cart functions
  const [showCart, setShowCart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const toggleCart = () => {
    setShowCart(!showCart)
  }
  // Function is used for checking if the user is logged in, if not redirects to the login page, if is redirects to account page isntead
  // Tähän vois tehä ihan oman ikonin tolle admin pagelle sitte jossai vaiheessa
  const handleUserClick = () => {
    const userId = localStorage.getItem("userId");
    const adminValue = localStorage.getItem('adminValue');
    if (userId) {
      window.location.href = '/account';
    } else if (adminValue) {
      window.location.href = '/admin';
    } else {
      setShowLogin(!showLogin);
    }
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
            <ul className="icons">
              <FontAwesomeIcon
                icon={faUser}
                className="user"
                onClick={handleUserClick}
              />
                <div className={`loginDiv ${showLogin ? 'show' : ''}`} ref={loginRef}>
                  <span class="material-symbols-outlined" id='closer' onClick={() => setShowLogin(!showLogin)}>
                    close
                  </span>
                  <h1>Kirjaudu sisään</h1>
                  <div className='login'>
                    <LoginFunction />
                  </div>
                  <p>
                    Eikö sinulla ole vielä käyttäjätiliä?{' '}
                    <Link to='/register'>Rekisteröidy.</Link>
                  </p>
                </div>

              <FontAwesomeIcon
                icon={faCartShopping}
                className="shoppingCart"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvas"
                onClick={toggleCart}
              />
            </ul>
          </div>
        </div>
      </nav>

      {/* // Shopping cart */}

      <div
        className={`offcanvas offcanvas-end ${showCart ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <CartOffcanvas showCart={showCart} />
      </div>

    </>
  );
}
