import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ContactRequests() {
 
    const [isLoading, setIsLoading] = useState(true);
    const [ContactRequests, setContactRequests] = useState([])
    const navigate = useNavigate();


  useEffect(() => {
    const adminValue = localStorage.getItem('adminValue')
    if (!adminValue) {
      window.location.href = '/#/'
    } else {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    axios.post('https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/products/admin_getcontacts.php')
      .then(response => setContactRequests(response.data))
      .catch(error => console.log(error));
  }, []);



  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <table className='order-table'>
        <thead>
          <tr>
            <th>Contact ID</th>
            <th>Timestamp</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {ContactRequests.map(contact => (
            <tr key={contact.id} className='order-table-column'>
              <td>{contact.id}</td>
              <td>{contact.currentdate}</td>
              <td><p>{contact.first_name}</p></td>
              <td><p>{contact.last_name}</p></td>
              <td><p>{contact.email}</p></td>
              <td><p>{contact.address}</p></td>
              <td><p>{contact.phone}</p></td>
              <td><p>{contact.message}</p></td>
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
