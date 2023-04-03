import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ProductTable = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (e, id, field) => {
    const newProducts = [...products];
    const index = newProducts.findIndex(product => product.id === id);
    newProducts[index][field] = e.target.value;
    setProducts(newProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('adminValue');
    localStorage.removeItem('adminId');
    window.location.href = '/';
  }

  const handleUpdateClick = (id) => {
    const product = products.find(product => product.id === id);
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/updateproduct.php', {
      id: id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      is_featured: product.is_featured,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image URL</th>
          <th>Category</th>
          <th>Inventory</th>

          {isAdmin && <th>Featured</th>}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <input type="text" value={product.name} onChange={(e) => handleInputChange(e, product.id, 'name')} />
            </td>
            <td>
              <input type="text" value={product.description} onChange={(e) => handleInputChange(e, product.id, 'description')} />
            </td>
            <td>
              <input type="number" value={product.price} onChange={(e) => handleInputChange(e, product.id, 'price')} />
            </td>
            <td>
              <input type="text" value={product.img} onChange={(e) => handleInputChange(e, product.id, 'img')} />
            </td>
            <td>
              <input type="text" value={product.category_id} onChange={(e) => handleInputChange(e, product.id, 'category_id')} />
            </td>
            <td>
              <input type="text" value={product.inventory} onChange={(e) => handleInputChange(e, product.id, 'inventory')} />
            </td>
            {isAdmin && (
              <td>
                <input type="checkbox" checked={product.is_featured} onChange={(e) => handleInputChange(e, product.id, 'is_featured')} />
              </td>
            )}
            <td>
              <button onClick={() => handleUpdateClick(product.id)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
      <button onClick={handleLogout}>Kirjaudu ulos</button>
    </table>
  );
};

export default ProductTable;
