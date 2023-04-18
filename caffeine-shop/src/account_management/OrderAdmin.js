import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Admin.scss'

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_getorders.php')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, [orders]);

  const handleOrderDelivered = (orderId) => {
    const id = orderId
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_updateorders.php', 
      id)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
    <table className='order-table'>
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
        {orders.map(order => (
          <tr key={order.row_id} className='order-table-column'>
            <td>{order.row_id}</td>
            <td><p>{order.order_date}</p></td>
            <td><p>{order.user_id}</p></td>
            <td><p>{order.ordered_product_id}</p></td>
            <td><p>{order.product_quantity}</p></td>
            <td><p>{order.delivered}</p></td>
            <td>
              <button
                className="btn btn-success"
                onClick={() => handleOrderDelivered(order.row_id)}
              >
                Toimitettu
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
