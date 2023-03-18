// SEPI

import React, { useState } from 'react';
import coffeeImg from "../img/coffee1.png";
import edImg from "../img/energy2.png";
import stimImg from "../img/stimulants.png"

import "../styles/Carousel.scss";



export default function Carousel() {

  return (
    <div id="carouselExampleCaptions" class="vertical carousel slide">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={coffeeImg} alt="image" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Paahto on meidän intohimomme</h5>
            <p>Rakastamme kahvia yhtä paljon kuin sinäkin. Valikoimamme sisältää vain parhaita kahvilajeja, jotka on paahdettu huolella rakkaudella. 
              Ota kuppi käteesi ja nauti täydellisestä makuelämyksestä.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={edImg} alt="image" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Piristä itseäsi, kun kahvi ei riitä</h5>
            <p>Jos kahvi ei ole sinun juttusi tai haluat jotain nopeampaa, meiltä löytyy laaja valikoima mitä parhaimman laatuisia energiajuoomia.
              Valitse vain suosikkisi ja anna energian virrata.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={stimImg} alt="image" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Korkeat tavoitteet vaativat korkeaa energiatasoa</h5>
            <p>Haluatko saavuttaa tavoitteesi nopeammin? Valitse meidän laadukkaat kofeiinitabletit ja pre-workout tuotteet, jotka antavat sinulle energiaa
              ja siivittävät sinut tavotteisiisi valonnopeudella.
            </p>
          </div>
        </div>
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