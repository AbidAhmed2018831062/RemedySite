import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../asset/css/overview.module.css';
import appointment from '../asset/images/appointment.png';
import write from '../asset/images/des.png';
import review from '../asset/images/review.png';
function Overview({profile})
{
    const [what,setWhat]=useState(false);
    const [overview,setOverview]=useState();
    useEffect(()=>{
        axios.get(`http://localhost:5000/doctor/getoverview/${profile.userName}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                console.log(data.data);
                setWhat(true);
                setOverview(data.data);
               
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[])
return(
    <div>
    {what&&<div className={styles.overview}>
       
       <div className={styles.item1}>
            <div className={styles.item}>
        <img src={appointment} alt="Appointment"></img>
        <span>{overview.appointmentcount}</span>
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
        <span>{profile.date}</span>
        </div>
        <h3>Date Joined In the Website</h3>
        </div>
        <div className={styles.item4}>
        <div className={styles.item}>
        <img src={write} alt="Appointment"></img>
        <span>{overview.blogcount}</span>
        </div>
        <h3>Total Blogs Written</h3>
        </div>
    
    </div>}
    </div>
)
}

export default Overview;