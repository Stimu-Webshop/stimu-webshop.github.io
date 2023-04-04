import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (e, id, field) => {
    const newProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    setProducts(newProducts);
  };



  const handleUpdateClick = (id) => {
    const product = products.find(product => product.id === id);
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_updateproduct.php', {
      id: id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.img, // changed 'img' to 'image'
      category: product.category_id,
      inventory: product.inventory,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const handleAddClick = () => {
    function getNextFreeId(data) {
      const maxId = data.reduce((max, item) => (parseInt(item.id) > max ? parseInt(item.id) : max), 0);
      return parseInt(maxId) + 1;
    }
    const newProduct = {
      id: getNextFreeId(products),
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      inventory: '',
    };
    setProducts([...products, newProduct]);
    /* handleAddProduct(newProduct); */
  };
  

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm('Haluatko varmasti poistaa tuotteen?');
    if (!confirmed) {
      return
    }
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);

    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_deleteproduct.php', {
      id: id,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const handleAddProduct = (product) => {

    const newProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.img,
      category: product.category_id,
      inventory: product.inventory,
    };
  
    axios.post('https://www.students.oamk.fi/~n2jato00/PHP/accounts/admin_insertproduct.php', newProduct)
      .then(response => {
        console.log(newProduct);
      })
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
          <input type="text" value={product.price} onChange={(e) => handleInputChange(e, product.id, 'price')} />
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
        <td>
          <button onClick={() => handleUpdateClick(product.id)}>Update</button>
          <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="8">
        <button onClick={handleAddClick}>Add row</button>
        <button onClick={handleAddProduct}>Add product</button>
      </td>
    </tr>
  </tfoot>
</table>
);
};

export default ProductManagement;
