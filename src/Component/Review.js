import React from 'react';
import StarRatings from 'react-star-ratings';
import styles from '../asset/css/review.module.css';
import user from '../asset/images/user.webp';
function Review({review})
{

return(
    <div className={styles.reviews}>
        <div className={styles.flex}>
        <img src={user} alt="Review"></img>
        <h3>{review.username}</h3>
        </div>
        <span style={{color:"grey",marginLeft:"50px"}}>{review.date}</span>
        <div style={{marginLeft:"30px",marginTop:"10px",marginBottom:"10px"}}>
        <StarRatings
      rating={parseInt(review.rating)}
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