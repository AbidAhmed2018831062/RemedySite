import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'D:/medicine/src/asset/css/showappoint.module.css';
 
function ShowAppoints({appoint,show})
{
  console.log(appoint);
  let  month_names= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date=new Date(appoint.date);
    let appDate=date.getDate()+" "+month_names[new Date(appoint.date).getMonth()]+" "+date.getFullYear();
return(
    <div className={styles.appoint}>
    <div className={styles.showappoint}>
       <div className={styles.part1}>
                    <pre>Doctor&nbsp;&nbsp;&nbsp;        : {appoint.name}</pre>
                    <pre>Token&nbsp;&nbsp;&nbsp;          : {appoint.token}</pre>
                    </div>
                    <div className={styles.part2}>
                    <pre>Date&nbsp;&nbsp;&nbsp;                : {appDate}</pre>
                    <pre>Phone&nbsp;&nbsp;&nbsp;             : {appoint.phone}</pre>
                    </div>
                    </div>
                    {show&&
                    <div className={styles.navlink}>
                    <NavLink  to={`/doctor/addreview?username=${appoint.doctorusername}`}>Write a Review</NavLink>
                    </div>}
    </div>
)
}

export default ShowAppoints;