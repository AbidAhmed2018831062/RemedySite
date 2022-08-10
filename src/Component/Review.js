import React from 'react';
import StarRatings from 'react-star-ratings';

import styles from '../asset/css/review.module.css';
function Review({review})
{

return(
    <div className={styles.reviews}>
        <div className={styles.flex}>
        <img src={review.img} alt="Review"></img>
        <h3>{review.name}</h3>
        </div>
        <span style={{color:"grey",marginLeft:"50px"}}>{review.date}</span>
        <div style={{marginLeft:"30px",marginTop:"10px",marginBottom:"10px"}}>
        <StarRatings
      rating={review.star}
        starRatedColor="blue"
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="3px"/>
        </div>
        <pre>{review.des}</pre>
    </div>
)
}

export default Review;