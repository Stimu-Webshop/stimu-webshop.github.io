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
      <div className='product-container'>
        <h1>Tuotteet</h1>
        <div className="product-container">
          {searchResults.map((product) => (
            <ul key={product.id}>
                <li>{product.name}</li>
                <li>{product.description}</li>
                <img src={product.img} alt="" srcset="" />
            </ul>

    ))}

      </div>
    </div>
    )
  
  
          }