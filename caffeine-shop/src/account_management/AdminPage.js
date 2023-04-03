import React, { useEffect, useState } from 'react'
import ProductManagement from './account_components/ProductManagement'


export default function AdminPage() {

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const adminValue = localStorage.getItem('adminValue');
    if (!adminValue) {
      window.location.href = '/';
    } else {
      setIsLoading(false)
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('adminValue');
    localStorage.removeItem('adminId');
    window.location.href = '/';
  };
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <ProductManagement/>
      <button onClick={handleLogout}>Logout</button>
      </>
  
    )
}
