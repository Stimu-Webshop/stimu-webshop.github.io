import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";


import logo from "../img/logo_stimu.png"

export default function Navbar() {
    return (
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Tuotteet
                            </Link>
                        </li>
                        <form className="search-bar-container">
                            <Search />
                        </form>
                        
                    </ul>
                    <FontAwesomeIcon icon={faMugHot}className="shoppingCart"/>
                </div>
            </div>
        </nav>
    );
}