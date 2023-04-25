import React, { useEffect, useState } from 'react';
import ProductManagement from './ProductManagement';
import InsertProduct from './InsertProduct';
import { useNavigate } from 'react-router-dom';

export default function Management() {
   const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const adminValue = localStorage.getItem('adminValue')
      if (!adminValue) {
        window.location.href = '/#/'
      } else {
        setIsLoading(false)
      }
    }, []);

    
    const navigate = useNavigate()
    if (isLoading) {
        return <div>Loading...</div>
      }
    return (
        <>
            <ProductManagement />
            <InsertProduct />
           
            
            <button id='backbutton' onClick={() => navigate(-1)}>
                Takaisin Admin sivulle
            </button>
        </>

    )
}

