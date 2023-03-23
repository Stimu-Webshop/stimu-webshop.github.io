import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, comment });
    setName('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const Review = ({ name, comment }) => (
  <div>
    <h3>{name}</h3>
    <p>{comment}</p>
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <div>
      <h2>Customer Reviews</h2>
      <ReviewForm onSubmit={handleReviewSubmit} />
      {reviews.map((review, index) => (
        <Review key={index} name={review.name} comment={review.comment} />
      ))}
    </div>
  );
};

export default Reviews;
