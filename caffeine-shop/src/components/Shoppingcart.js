import React from 'react'
import '../styles/Shoppingcart.scss'

export default function ShoppingCart() {
  return (
    <>
    <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasLabel">Ostoskori</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    Tähän tulee sisältö
    
  </div>
  </>
  )
}

