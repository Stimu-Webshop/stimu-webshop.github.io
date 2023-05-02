import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import '../styles/ProductPage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const { id } = useParams()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [product, setProduct] = useState(null)
  const [amount, setAmount] = useState(0)
  const [UserId, setUserId] = useState(null)


  
  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem('userId'));
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // STORAGE HAKU LOPPUU

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoaded(false)
    setProduct(null)
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
    if (amount === 0) {
      return
    }
    // Tarkastaa onko käyttäjä kirjautunut sisään, jos ei niin laittaa tavarat localstoragen muistiin.
    // Myöhemmin kirjautuessa tarkastetaan onko localstoragessa tavaraa, jos on ne asetetaan käyttäjän ostoskoriksi
    if (!UserId){
      const localCartItem = {
        id: product.id,
        name: product.name,
        quantity: parseInt(amount),
        price: product.price,
        total: parseInt(amount) * product.price,
        image: product.img,
      };
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      const cartItems = storedCartItems ? [...storedCartItems, localCartItem] : [localCartItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return;
    }
    // Luo tietokannalle lähetettävät cart itemit ja lähettää ne.
    const cartItem = {
      user_id: UserId.userId, 
      id: product.id,
      name: product.name,
      quantity: parseInt(amount),
      price: product.price,
      total: parseInt(amount) * product.price,
      image: product.img // Calculate the total value
    }
    
    axios
      .post(
        'https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/shoppingcart.php',
        [cartItem] // Send the cart data as an array
      )
      .catch(error => {
        console.log(error);
      });
    }
  ;

  // Funktiot tuotteiden määrän muuttamiseen, ei voi olla enempää kuin varastossa eikä vähempää kuin 0 t. Sari
  const handleAmountChange = (e) => {
    let productAmount = parseInt(e.target.value);
    if (productAmount > product.inventory) {
      productAmount = product.inventory
    }
    if (productAmount < 0) {
      productAmount = 0
    }
    setAmount(productAmount)
  }
  
  const handleIncrementAmount = () => {
    if (amount < product.inventory) {
      setAmount(amount + 1)
    }
  }
  
  const handleDecrementAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }
  

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <div className='productContainer'>
        <div className='headerContent'>
        <button id='backbutton' onClick={() => navigate(-1)}>
          <span class="material-symbols-outlined">
            arrow_back_ios
          </span>
          Takaisin
        </button>
        <h1>{product.name}</h1>
        <p></p>
        </div>
        <div className='flexbox1'>
          <div className='productPic'>
            <img src={product.img} alt="" srcSet="" />
          </div>
           
            <ul>
              <div className='orderInfo'>
                  <h1>{product.price} €</h1>
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
                  <button id='amount'>
                  <span class="material-symbols-outlined" onClick={handleDecrementAmount}>
                    do_not_disturb_on
                  </span>
                  </button>
                  <input type="number" id="inputValue" value={amount} onChange={handleAmountChange} />
                  <button id='amount'>
                  <span class="material-symbols-outlined" onClick={handleIncrementAmount}>
                    add_circle
                  </span>
                  </button>
                </div>
                <button id='orderbtn' onClick={handleAddToCart}>Lisää ostoskoriin</button>
              </div>
            </ul>
        </div>
        <p>{product.description}</p>
        <Rating id={product.id} />
      </div>
    )
  }
}

export default ProductPage
