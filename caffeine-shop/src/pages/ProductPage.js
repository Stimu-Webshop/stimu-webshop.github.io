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

  // 17:09 28.3.23 CART FUNKTIOT TOIMII VAIN SISÄÄNKIRJAUTUNEENA.
  // TÄHÄN RATKAISUA LÄHITULEVAISUUDESSA
  // TOIMIVAT KÄYTTÄJÄTUNNUKSET LÖYTYY DISCORDISTA
  // - Samppa 

  // TÄMÄ HAKEE USERID:N LOCALSTORAGESTA SIVUN LADATESSA JA TALLENTAA SEN MUUTTUJAAN
  const [UserId, setUserId] = useState(null)

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(UserId);
    } else {
      console.log('User id is empty');
    }
    console.log(storedUserId);
    console.log(UserId);
  }, []);

  // STORAGE HAKU LOPPUU

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
      user_id: UserId.userId, // tällä hetkellä tilaukset menee aina käyttäjälle 1
      id: product.id,
      name: product.name,
      quantity: parseInt(amount),
      price: product.price,
      total: parseInt(amount) * product.price,
      image: product.img // Calculate the total value
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
        <button className='btn btn-secondary' id='backbutton' onClick={() => navigate(-1)}>
          <span class="material-symbols-outlined">
            arrow_back_ios
          </span>
          Takaisin kauppaan
        </button>
        <h1>{product.name}</h1>
        <div className='flexbox1'>
          <div className='productPic'>
            <img src={product.img} alt="" srcSet="" />
          </div>
          <div className='productInfo'>
            <ul>
              <li>{product.description}</li>
              <div className='orderInfo'>
                <li>
                  <h1>{product.price} €</h1>
                </li>
                <li>Varastossa: {product.inventory}
                  {product.inventory > 0 ?
                    <FontAwesomeIcon
                      icon={faCheck}
                      className='check' /> :
                    <FontAwesomeIcon
                      icon={faXmark}
                      className='xmark' />}
                </li>
                <div className='amountbuttons'>
                  <span class="material-symbols-outlined" onClick={() => setAmount(amount-1)}>
                    do_not_disturb_on
                  </span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                  <span class="material-symbols-outlined" onClick={() => setAmount(amount+1)}>
                    add_circle
                  </span>
                </div>
                <button className='btn btn-secondary' onClick={handleAddToCart}>Lisää ostoskoriin</button>
              </div>
            </ul>
          </div>
        </div>
        <Rating id={product.id} />
      </div>
    )
  }
}

export default ProductPage
