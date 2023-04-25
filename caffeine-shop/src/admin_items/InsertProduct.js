import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const adminValue = localStorage.getItem('adminValue')
    if (!adminValue) {
      window.location.href = '/#/'
    } else {
      setIsLoading(false)
    }
    }, []);



  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');


  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/getproduct.php')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);

  function getNextFreeId(data) {
    const maxId = data.reduce((max, item) => (parseInt(item.id) > max ? parseInt(item.id) : max), 0);
    return parseInt(maxId) + 1;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://www.students.oamk.fi/~n2jato00/PHP/accounts/admin_insertproduct.php', {
        id: getNextFreeId(products),
        name,
        description,
        price,
        image,
        category,
        inventory,
      });
      console.log(response.data);
      // Reset the form fields on successful submission
      setId('');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
      setInventory('');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <form onSubmit={handleSubmit} className='add-product-form'>
  <table>
    <tbody>
      <tr>
        <td>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
        </td>
        <td>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"></textarea>
        </td>
        <td>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price" />
        </td>
        <td>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Product Image URL" />
        </td>
        <td>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Product Category" />
        </td>
        <td>
          <input type="number" value={inventory} onChange={(e) => setInventory(e.target.value)} placeholder="Product Inventory" />
        </td>
        <td>
          <button type="submit">Add Product</button>
        </td>
      </tr>
    </tbody>
  </table>
</form>
  );
}

export default ProductForm;