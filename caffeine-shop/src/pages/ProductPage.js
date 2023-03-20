import React from 'react';
import '../styles/ProductPage.scss';

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.img} alt="" srcSet="" />
      <p>{product.price} eur</p>
      <p>{product.description}</p>
    </div>
  );
}