import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/card.module.css';
function Card({card})
{

return(
   
    <div className={styles.card}>
         <NavLink to={`/medicine/${card.id}`}>
        <div className={styles.imageSettle}>
        <img src={`http://127.0.0.1:8887/${card.fileName}`} alt={card.name}/>
        </div>
        <span className={styles.name}>{card.name}</span>
        <span className={styles.company}>{card.name}</span>
        <span className={styles.price}>৳{card.price}</span>
        <button className={styles.button}>Add To Cart</button>
        </NavLink>
    </div>
   
)
}

export default Card;