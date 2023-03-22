import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/ProductPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(0);

  const buyAmount = []

  for (let i = 0; i < 11; i++) {
    buyAmount.push(i)
  }

  useEffect(() => {
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/selected.php?id=${id}`;
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

      <div className='productContainer'>
        <h1>{product.name}</h1>
        <div className='productPic'>
        <img src={product.img} alt="" srcSet="" />
        </div>
        <div className='productInfo'>
        <ul>
          <li>{product.description}</li>
          <li>Varastossa: {product.inventory_id} 
          <FontAwesomeIcon
              icon={faCheck}
              className='check'
              /> 
          <FontAwesomeIcon
              icon={faXmark} 
              className='xmark'
              /> 
              </li>
          <li>Hinta: {product.price} eur</li>
        </ul>
        <label>Määrä: </label>
        <select name="amount" onChange={e => setAmount(e.target.value)}>
          {buyAmount.map(value => <option value={value}>{value}</option>)}
          </select>

        <button onClick={ () => console.log(amount)}>Lisää ostoskoriin</button>
        {/* On click funktio jätetty, jos tarvii vielä myöhemmin tarkastaa määrää */}
        </div>
        
        <Link className='backLink' to="/products">Back</Link>
        
          <h3>Arvostelut</h3>
        <div className='rating'>
          <div className='ratingStars'>
            <FontAwesomeIcon icon={faStar} className='star' id="star1" />
            <FontAwesomeIcon icon={faStar} className='star' id="star2" />
            <FontAwesomeIcon icon={faStar} className='star' id="star3" />
            <FontAwesomeIcon icon={faStar} className='star' id="star4" />
            <FontAwesomeIcon icon={faStar} className='star' id="star5" />
            </div>
        </div>
      </div>
      
    );
  }
};

export default ProductPage;
