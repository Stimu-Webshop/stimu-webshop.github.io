import React from 'react';
import ProductManagement from './account_components/ProductManagement';
import InsertProduct from './account_components/InsertProduct';
import { useNavigate } from 'react-router-dom';

export default function Management() {

    const navigate = useNavigate()

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

