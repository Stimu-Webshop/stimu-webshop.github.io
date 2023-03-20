
import React from 'react';

function ProductPage(props) {
  const { product, onClose } = props;

  return (
    <div className="product-page">
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price} eur</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ProductPage;
