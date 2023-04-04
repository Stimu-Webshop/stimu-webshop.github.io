import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function CategoryPage({pageid, header}) {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [category, setCategory] = useState(pageid);


    useEffect(() => {
        const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/categories.php?category=${category}`;
        axios.get(PHP)
          .then(response => {
            setError(null);
            setIsLoaded(true);
            setSearchResults(response.data);
            console.log(response.data)
          })
          .catch(error => {
            alert(error);
          });
      }, []);

      if (error) {
        return <p>{error.message}</p>;
      } else if (!isLoaded) {
        return <p>Loading...</p>;
      } else {
        return (
          <div>
            <h1 id="header">{header}</h1>
            <div className='product-container'>
              {searchResults.map((product) => (
                <div className="product" id="product-box" key={product.id}>
                  <Link to={`/productpage/${product.id}`}>
                    <img src={product.img} alt="" srcSet="" />
                    <ul>
                      <h5>{product.name}</h5>
                      <p id="prdprice">{product.price} eur</p>
                      <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
                    </ul>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      }
    };

