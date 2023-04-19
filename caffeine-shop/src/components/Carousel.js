// SEPI
// 17.3.2023 Sari lisäili vähän mainostekstiä

import React, { useEffect, useState } from 'react';


import coffeeImg from "../img/coffee1.png";
import edImg from "../img/energy2.png";
import stimImg from "../img/stimulants.png"

import "../styles/Carousel.scss";
import { Link } from 'react-router-dom';



export default function Carousel() {

  return (
    
    <div id="carouselExampleCaptions" class="vertical carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <Link to="/coffee">
        <div class="carousel-item active" >
          <img src={coffeeImg} alt="image" />
          <div class="carousel-caption  d-md-block">
          <div class="ad-text-container">
            <h5>Paahto on meidän intohimomme</h5>
            <p>Rakastamme kahvia yhtä paljon kuin sinäkin. Valikoimamme sisältää vain parhaita kahvilajeja, jotka on paahdettu rakkaudella. 
              Ota kuppi käteesi ja nauti täydellisestä makuelämyksestä.</p>
              </div>
          </div>
        </div>
        </Link>
        <Link to="/energydrinks">
        <div class="carousel-item">
          <img src={edImg} alt="image" />
          <div class="carousel-caption  d-md-block">
            <div class="ad-text-container">
            <h5>Tölkillinen tehokkuutta</h5>
            <p>Stimun premium-valikoima maistuvia, raikkaita ja piristäviä energiajuomia.
              Valitse vain suosikkisi ja anna energian virrata.
            </p>
            </div>
          </div>
        </div>
        </Link>
        <Link to="/pwo">
        <div class="carousel-item">
          <img src={stimImg} alt="image" />
          <div class="carousel-caption  d-md-block">
          <div class="ad-text-container">
            <h5>Pre-workoutit ja piristeet</h5>
            <p>Haluatko saavuttaa maalisi tehokkaammin? Valitse laadukkaat kofeiinitabletit ja pre-workout tuotteet, jotka antavat sinulle energiaa
              ja siivittävät sinut onnistumiseen valonnopeudella.
            </p>
            </div>
          </div>
        </div>
        </Link> 
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  )

}