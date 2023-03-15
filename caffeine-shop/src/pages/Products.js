import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products() {
  const [searchResults, setSearchResults] = useState([])
  
  function handleSearch () {
    const PHP = "http://localhost:3000/products/getproduct.php"
    axios.get(PHP)
    .then(response => {
      const results = response.data
      console.log(results)
      setSearchResults(results)
     })
  }
  useEffect(() => {
    handleSearch()
  }, [])

    return (
      <div>
        <h1>Products</h1>
        <div className="products">
          {searchResults.map((product, index) => (
            <li>
              <p className='products' key={index.toString()}>{product.name}</p>
            </li>
          ))}

      </div>
    </div>
    )
  }
  
