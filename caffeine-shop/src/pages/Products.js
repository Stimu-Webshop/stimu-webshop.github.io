import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import ProductPage from './ProductPage'
import '../styles/Products.scss'

function MainComponent() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php"
    axios.get(PHP)
      .then(response => {
        const results = response.data
        console.log(results)
        setSearchResults(results)
      })
  }, [])

  const handleProductClick = (product) => {
    console.log(product) 
    setSelectedProduct(product)
  }

  return (
    <div>
      <h1>Tuotteet</h1>
      <div className='product-container'>
        {searchResults.map((product) => (
           <Link to="/productpage" className='divLink'> 
          <div className="product" div key={product.id} onClick={() =>
            handleProductClick(product)}>
            <img src={product.img} alt="" srcset="" />
            <ul key={product.id}>
              <h5>{product.name}</h5>
              <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
              <li>{product.price} eur</li>
            </ul>
          </div>
           </Link> 
        ))}
        {selectedProduct && <ProductPage product={selectedProduct} />}
      </div>
      
    </div>
  )
}

export default function Products() {
  return (
    <div>
      <MainComponent />
    </div>
  )
}