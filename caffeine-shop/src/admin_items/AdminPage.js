import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../styles/Admin.scss';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const adminValue = localStorage.getItem('adminValue')
    if (!adminValue) {
      window.location.href = '/#/'
    } else {
      setIsLoading(false)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('adminValue')
    localStorage.removeItem('adminId')
    window.location.href = '/#/'
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className='adminPage'>
      <h1>Admin</h1>
      <div>
        <Link to='/management'>
          <button>Product Management</button>
        </Link>
      </div>
      <div>
        <Link to='/orders'>
          <button>Order Management</button>
        </Link>
      </div>
      <div>
        <Link to='/contactrequests'>
          <button>Contact Requests</button>
        </Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>

    </div>

  )
}
