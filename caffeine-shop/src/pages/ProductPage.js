import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php?id=${id}`;
    axios.get(PHP)
      .then(response => {
        setError(null);
        setIsLoaded(true);
        setProduct(response.data[0]);
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.img} alt="" srcSet="" />
        <ul>
          <li>{product.description}</li>
          <li>{product.price} eur</li>
        </ul>
        <Link className='backLink' to="/products">Back</Link>
      </div>
    );
  }
};

export default ProductPage;
