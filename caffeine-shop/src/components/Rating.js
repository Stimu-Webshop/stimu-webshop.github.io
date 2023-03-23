import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Reviews from "./ReviewTEST";




export default function Rating() {

    return (
        <>
            <h3>Arvostelut</h3>
            <div className='rating'>
                <div className='ratingStars'>
                    {/* Tässäkin on nyt vaan nämä ikonit, pitää lisätä vielä input kenttiä ja hover toiminnallisuudet (rating ja värin vaihtuminen) ikoneille */}
                    <FontAwesomeIcon icon={faStar} className='star' id="star1" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star2" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star3" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star4" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star5" />
                </div>
            </div>
        </>
    )
}