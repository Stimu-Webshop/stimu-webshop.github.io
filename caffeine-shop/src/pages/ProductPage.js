import React from 'react';
import '../styles/ProductPage.scss';

export default function ProductPage({product}) {
    return (
      <div>
        <p>Näkyykö tämä?</p>
         <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  }