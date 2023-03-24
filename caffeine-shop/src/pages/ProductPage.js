import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import '../styles/ProductPage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark, faStar } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [product, setProduct] = useState(null)
  const [amount, setAmount] = useState(0)

  const buyAmount = []

  for (let i = 0; i < 11; i++) {
    buyAmount.push(i)
  }
  const navigate = useNavigate()

  useEffect(() => {
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/selected.php?id=${id}`;
    axios.get(PHP)
      .then(response => {
        setError(null)
        setIsLoaded(true)
        setProduct(response.data[0])
      })
      .catch(error => {
        setError(error)
      })
  }, [id])

const handleAddToCart = () => {
  const cartItem = {
    user_id: 1, // tällä hetkellä tilaukset menee aina käyttäjälle 1
    id: product.id,
    name: product.name,
    quantity: parseInt(amount),
    price: product.price,
    total: parseInt(amount) * product.price // Calculate the total value
  };

  axios
    .post(
      'https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/shoppingcart.php',
      [cartItem] // Send the cart data as an array
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
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
            <li>Varastossa: {product.quantity}
              {product.quantity > 0 ?
                <FontAwesomeIcon
                  icon={faCheck}
                  className='check' /> :
                <FontAwesomeIcon
                  icon={faXmark}
                  className='xmark' />}
            </li>
            <li>Hinta: {product.price} eur</li>
          </ul>
          <label>Määrä: </label>
          <select name="amount" onChange={e => setAmount(e.target.value)}>
            {buyAmount.map(value => <option value={value}>{value}</option>)}
          </select>
          <button className='btn btn-secondary' onClick={handleAddToCart}>Lisää ostoskoriin</button>
        </div>
        <button className='btn btn-secondary' onClick={() => navigate(-1)}>Go back</button>
        <Rating id={product.id}/>
      </div>
    )
  }
}

export default ProductPage
