import React from 'react'
import CartContent from '../components/CartContent'
import '../styles/CartPage.scss'


export default function CartPage() {
  return (
    <div className='cartpage'>
      <h2>Ostoskori</h2>
      <CartContent />
    </div>
  )
}