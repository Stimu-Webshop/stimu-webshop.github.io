import React from 'react'

export default function AdminPage() {
   
const adminVal = localStorage.getItem('adminValue');
       if(adminVal) {
          console.log('User is an admin');
           } else
        console.log('No access');
    
        const handleLogout = () => {
            localStorage.removeItem('userId');
            localStorage.removeItem('adminValue');
            localStorage.removeItem('adminId');
            window.location.href = '/';
          };


  return (
    <div>AdminPage
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
