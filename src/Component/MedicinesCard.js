import React from 'react';
import styles from '../asset/css/cards.module.css';
import Card from './Showcard';

function Cards({cards})
{
    
   

return(
    <div className={styles.cards}>
      
      <div className={styles.cardFlex}>
      {cards.map((e,i)=>{
          return  <Card card={e}/>

      })}
    </div>
    </div>
)
}

export default Cards;