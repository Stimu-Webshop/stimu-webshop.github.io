import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

// TÄÄ TARVII TYYLITTELYÄ T. SEPI

export default function Rating(id) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [review, setReview] = useState([]);
  const [pageid, setPageid] = useState(id);
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);


  const handleSubmit = (e) => {
    e.preventDefault()
    setName("")
    setComment("")
  };
  // Funktiolla nimi ja kommentti tilamuuttujaan, tätä käytetään "Lähetä" -napissa
  const reviewHandler = () => {
    const response = JSON.stringify(pageid);
    const responseObject = JSON.parse(response);
    const id = responseObject.id;

    setReview([...review, { name: name, comment: comment, rating: rating }]);
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/reviews/review.php`;
    // Läheteään tiedot PHP:lle, joka lisää ne tietokantaan. Huomaa että ID on ProductPage-komponentilta saatu sivun ID
    fetch(PHP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        rating: rating,
        comment: comment,
        name: name
      })
    })
  };

  useEffect(() => {
    const PHP = `https://www.students.oamk.fi/~n2rusa00/Stimu/backendi/Web-Shop-Back/reviews/getreview.php?pageid=${pageid.id}`;
    axios.get(PHP)
      .then(response => {
        setData(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);


  // Arvostelukomponentti
  const Review = ({ name, comment, rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const className = i < rating ? "black" : "";
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`rewStar ${className}`}
          id={`rewStar${i + 1}`}
        />
      );
    }
    return (
      <div className="review">
        <h3>{name}</h3>
        <p>{comment}</p>
        <div className="rewStars">{stars}</div>
      </div>
    );
  }

  useEffect(() => {
    console.log(rating);
  }, [rating]);

  // Tähtien väri vaihtuu klikatessa ja arvosteluun tallentuu tähtien määrä

  const handleStarClick = (starId) => {
    setRating(starId);
  };

  const getStarClassName = (starId) => {
    if (starId <= rating) {
      return 'black';
    } else {
      return 'star';
    }
  };

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
          <FontAwesomeIcon
            icon={faStar}
            className={getStarClassName(5)}
            id="star5"
            onClick={() => handleStarClick(5)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={getStarClassName(4)}
            id="star4"
            onClick={() => handleStarClick(4)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={getStarClassName(3)}
            id="star3"
            onClick={() => handleStarClick(3)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={getStarClassName(2)}
            id="star2"
            onClick={() => handleStarClick(2)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={getStarClassName(1)}
            id="star1"
            onClick={() => handleStarClick(1)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={reviewHandler}>Lähetä</button>
      </form>
      <div className='rating'>
        {review.map((review, index) => (
          <Review key={index} name={review.name} comment={review.comment} rating={review.rating} />
        ))}
        {data.map((product, index) => (
          <Review key={index} name={product.review_name} comment={product.review_text} rating={product.rating} />
        ))}
      </div>
    </>
  );

}