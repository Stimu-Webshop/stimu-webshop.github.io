import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function OrderAdmin() {
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
              <p type="text" value={product.name} onChange={(e) => handleInputChange(e, product.id, 'name')} />
            </td>
            <td>
              <p type="text" value={product.description} onChange={(e) => handleInputChange(e, product.id, 'description')} />
            </td>
            <td>
              <p type="text" value={product.price} onChange={(e) => handleInputChange(e, product.id, 'price')} />
            </td>
            <td>
              <p type="text" value={product.img} onChange={(e) => handleInputChange(e, product.id, 'img')} />
            </td>
            <td>
              <p type="text" value={product.category_id} onChange={(e) => handleInputChange(e, product.id, 'category_id')} />
            </td>
            <td>
              <input type="text" value={product.inventory} onChange={(e) => handleInputChange(e, product.id, 'inventory')} />
            </td>
            <td>
              <button onClick={() => handleUpdateClick(product.id)}>Update</button>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  );
        }