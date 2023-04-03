import React from 'react'
import ProductManagement from './account_components/ProductManagement'

export default function AdminPage() {

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('adminValue');
    localStorage.removeItem('adminId');
    window.location.href = '/';
  };

  return (
    <>
      <ProductManagement/>
      <button onClick={handleLogout}>Logout</button>
      </>
  
    )
}
