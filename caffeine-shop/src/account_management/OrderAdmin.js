import React, { useState, useEffect } from 'react'
import axios from 'axios'




export default function OrderAdmin() {

        const [products, setProducts] = useState([]);
      
        useEffect(() => {
          axios.get('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
        }, []);

    return (
        <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>User ID</th>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Delivered</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id} className='order-table'>
            <td>{product.id}</td>
            <td>
              <p>{product.name}</p> 
            </td>
            <td>
              <p>{product.description}</p>
            </td>
            <td>
              <p>{product.price}</p>
            </td>
            <td>
              <p>{product.img}</p>
            </td>
            <td>
              <p>{product.category_id}</p>
            </td>
            <td>
              {/* <input type="text" value={product.inventory} onChange={(e) => handleInputChange(e, product.id, 'inventory')} */} />
            </td>
            <td>
              <button>Update</button>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  );
        }