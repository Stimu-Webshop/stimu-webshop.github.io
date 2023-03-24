import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

// TÄÄ TARVII TYYLITTELYÄ T. SEPI

export default function Rating(id) {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [review, setReview] = useState([]);
    const [pageid, setPageid] = useState(id);
    const [rating, setRating] = useState(null);


    const handleSubmit = (e) => {

        e.preventDefault();
        setName("");
        setComment("");
    };
    // Funktiolla nimi ja kommentti tilamuuttujaan, tätä käytetään "Lähetä" -napissa
    const reviewHandler = () => {
        const response = JSON.stringify(pageid);
        const responseObject = JSON.parse(response);
        const id = responseObject.id;

        setReview([...review, { name: name, comment: comment }])
        const PHP = `http://localhost:3001/reviews/review.php`
        fetch(PHP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                comment: comment
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Review submitted successfully.')
                } else {
                    throw new Error('Network response was not ok.')
                }
            })
            .catch(error => {
                console.error('There was a problem submitting the review:', error)
            });
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
            <form onSubmit={handleSubmit} className="review-form" method="post">
                <label>Nimi:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Arvostelu:</label>
                <textarea name="review" rows="4" cols="33" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <label>Tähdet:</label>
                <div className='ratingStars'>
                {/* Tässäkin on nyt vaan nämä ikonit, pitää lisätä vielä input kenttiä ja hover toiminnallisuudet (rating ja värin vaihtuminen) ikoneille */}
                <FontAwesomeIcon icon={faStar} className='star' id="star5" />
                <FontAwesomeIcon icon={faStar} className='star' id="star4" />
                <FontAwesomeIcon icon={faStar} className='star' id="star3" />
                <FontAwesomeIcon icon={faStar} className='star' id="star2" />
                <FontAwesomeIcon icon={faStar} className='star' id="star1" />
            </div>
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