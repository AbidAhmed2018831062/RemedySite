import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/denied.module.css';
import right from '../asset/images/right.jpg';
function Successful()
{

return(
         <div  className={styles.denied}>
            <img src={right} alt="Sucessful"></img>
      <h1 style={{color:"red"}}>Successfull</h1>
      <p style={{color:"red"}}>Your order has been successfully placed. You will be contacted soon via both email and phone call. Thank you for using our service<NavLink to="/">Here</NavLink></p>
      </div>
)
}

export default Successful;