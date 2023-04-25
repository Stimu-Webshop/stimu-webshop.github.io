import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/Admin.scss'

export default function OrderAdmin() {

  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState([]);


  useEffect(() => {
    const adminValue = localStorage.getItem('adminValue')
    if (!adminValue) {
      window.location.href = '/'
    } else {
      setIsLoading(false)
    }
  }, []);

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_getorders.php')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, [orders]);

  const handleOrderDelivered = () => {
    const confirmed = window.confirm('Merkataanko valitut tuotteet toimitetuiksi?');
    if (!confirmed) {
      return
    }
    
    const ids = selectedOrders
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_updateorders.php',
      ids)
      .then(response => console.log(response) )
      .catch(error => console.log(error));
  }

  const handleCheckboxChange = (event, orderId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <table className='order-table'>
        <thead>
          <tr>
            <th>Order row ID</th>
            <th>Date</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Delivered</th>
            <th>    <button
                  className="btn btn-success"
                  onClick={() => handleOrderDelivered()}
                >
                  Merkkaa toimitetuksi
                </button></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.row_id} className='order-table-column'>
              <td>{order.row_id}</td>
              <td><p>{order.order_date}</p></td>
              <td><p>{order.user_id}</p></td>
              <td><p>{order.ordered_product_id}</p></td>
              <td><p>{order.product_quantity}</p></td>
              <td><p>{order.delivered}</p></td>
              <td>
              <input id='set-as-delivered' type='checkbox' onChange={(event) => handleCheckboxChange(event, order.row_id)}></input>    
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id='backbutton' onClick={() => navigate(-1)}>
        Takaisin Admin sivulle
      </button>
    </>
  );



}
