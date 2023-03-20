import React from 'react';
import '../styles/ProductPage.scss';

export default function ProductPage({product}) {
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
    );
  }