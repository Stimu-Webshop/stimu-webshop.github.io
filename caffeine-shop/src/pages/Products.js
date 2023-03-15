import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products() {
  const [searchResults, setSearchResults] = useState([])
  



  useEffect(() => {
    const PHP = "http://localhost:3000/products/getproduct.php"
    axios.get(PHP)
    .then(response => {
      const results = response.data
      console.log(results)
      setSearchResults(results)
     })
  }, [])

    return (
      <div>
        <h1>Products</h1>
        <div className="product-container">
          {searchResults.map((product) => (
            <ul key={product.id}>
                <li>{product.name}</li>
                <li>{product.description}</li>
            </ul>

          ))}

      </div>
    </div>
    )
  }
  
