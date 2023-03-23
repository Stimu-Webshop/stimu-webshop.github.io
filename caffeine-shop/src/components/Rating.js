import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"



// TÄÄ TARVII TYYLITTELYÄ T. SEPI

export default function Rating() {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [review, setReview] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setName("");
        setComment("");
    };
    // Funktiolla nimi ja kommentti tilamuuttujaan, tätä käytetään "Lähetä" -napissa
    const reviewHandler = () => {
        setReview([...review, { name: name, comment: comment }]);
    };
    // Arvostelukomponentti
    const Review = ({ name, comment }) => (
        <div className="review">
            <h3>{name}</h3>
            <p>{comment}</p>
            <div className='ratingStars'>
                    {/* Tässäkin on nyt vaan nämä ikonit, pitää lisätä vielä input kenttiä ja hover toiminnallisuudet (rating ja värin vaihtuminen) ikoneille */}
                    <FontAwesomeIcon icon={faStar} className='star' id="star1" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star2" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star3" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star4" />
                    <FontAwesomeIcon icon={faStar} className='star' id="star5" />
                </div>
        </div>
    );




    return (
        <>
            <h3>Arvostelut</h3>
                <form onSubmit={handleSubmit} className="review-form">
                    <label>Nimi:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Arvostelu:</label>
                    <textarea name="review" rows="4" cols="33" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type="submit" className="btn btn-primary" onClick={reviewHandler}>Lähetä</button>
                    {/* Tilamuuttujaan napilla syötetyt tiedot annetaan arvostelukomponentille ja kutsutaan komponentti */}
                </form>
                <div className='rating'>
                {review.map((review, index) => (
                        <Review key={index} name={review.name} comment={review.comment} />
                    ))}
            </div>
        </>
    )
}