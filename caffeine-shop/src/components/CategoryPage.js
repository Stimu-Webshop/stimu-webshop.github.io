import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductPage from "../pages/ProductPage";



export default function CategoryPage({pageid, header}) {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [category, setCategory] = useState(pageid);


    useEffect(() => {
        const PHP = "https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/categories.php?category=" + category;
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

      function handleProductClick(product) {
        setSelectedItem(product);
      }

      function handleClose() {
        setSelectedItem(null);
      }

      if (selectedItem) {
        return (
          <ProductPage product={selectedItem} onClose={handleClose} />
        );
      } else if (error) {
        return <p>{error.message}</p>;
      } else if (!isLoaded) {
        return <p>Loading...</p>;
      } else {
        return (
          <div>
            <h1>{header}</h1>
            <div className='product-container'>
              {searchResults.map((product) => (
                <div className="product" key={product.id} onClick={() =>
                  handleProductClick(product)}>
                  <img src={product.img} alt="" srcSet="" />
                  <ul>
                    <h5>{product.name}</h5>
                    <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
                    <li>{product.price} eur</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

