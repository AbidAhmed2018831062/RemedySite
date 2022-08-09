import React from 'react';
import styles from '../asset/css/overview.module.css';
import appointment from '../asset/images/appointment.png';
import write from '../asset/images/des.png';
import review from '../asset/images/review.png';

function Overview()
{
return(
    <div className={styles.overview}>
        <div className={styles.item1}>
            <div className={styles.item}>
        <img src={appointment} alt="Appointment"></img>
        <span>1000</span>
        </div>
        <h3>Total Appointment</h3>
        </div>
        <div className={styles.item2}>
        <div className={styles.item}>
        <img src={review} alt="Appointment"></img>
        <span>4.6(199)</span>
        </div>
        <h3>Average of Reviews</h3>
        </div>
        <div className={styles.item3}>
        <div className={styles.item}>
        <img src={appointment} alt="Appointment"></img>
        <span>20 Nov 2020</span>
        </div>
        <h3>Date Joined In the Website</h3>
        </div>
        <div className={styles.item4}>
        <div className={styles.item}>
        <img src={write} alt="Appointment"></img>
        <span>40 Blogs</span>
        </div>
        <h3>Total Blogs Written</h3>
        </div>
    </div>
)
}

export default Overview;