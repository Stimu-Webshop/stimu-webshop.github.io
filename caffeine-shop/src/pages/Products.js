import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Products.scss';

const ProductList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php";
    axios.get(PHP)
      .then(response => {
        setError(null);
        setIsLoaded(true);
        setProducts(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>Tuotteet</h1>
        <div className='product-container'>
          {products.map((product) => (
            <div className="product" id="product-box" key={product.id}>
              <Link to={`/productpage/${product.id}`}>
                <img src={product.img} alt="" srcSet="" />
                <ul>
                  <h5>{product.name}</h5>
                  <p id="prdprice">{product.price} eur</p>
                  <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
                </ul>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default ProductList;
