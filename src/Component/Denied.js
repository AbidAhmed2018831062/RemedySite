import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../asset/css/denied.module.css';
function Denied()
{

return(
    <div  className={styles.denied}>
      <h1>403</h1>
      <h3>Access Denied</h3>
      <p>You are not allowed to access this page! Only authorized users can view this page. You can visit our other pagees <NavLink to="/">Here</NavLink></p>
      </div>
)
}

export default Denied;