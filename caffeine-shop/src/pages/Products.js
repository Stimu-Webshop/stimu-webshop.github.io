import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../styles/Products.scss'

export default function Products() {
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

    return (
      
      <div>
        <h1>Tuotteet</h1>
        <div className='product-container'>
        
        
          {searchResults.map((product) => (
            <div className="product">
            <img src={product.img} alt="" srcset="" />
            <ul key={product.id}>
                <h5>{product.name}</h5>
                <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
                <li>{product.price} eur</li>
        
            </ul>
            </div>
    ))}
    </div>
    </div>
    )
  
  
          }