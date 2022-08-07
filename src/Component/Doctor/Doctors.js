import React from 'react';
import { NavLink } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import styles from 'D:/medicine/src/asset/css/doctors.module.css';
import doctor1 from 'D:/medicine/src/asset/images/doctor1.jpg';

function Doctors({doctor})
{
let fileName;
console.log(doctor.fileName);
if(doctor.fileName==="abid")
fileName=doctor1;
else 
fileName=doctor.fileName;
return(
         <div className={styles.doctors}>
          
            <NavLink to={`/doctor/doctorprofile/${doctor.id}`}>
            <img src={fileName} alt="Doctor"></img>
            <h3>{doctor.name}</h3>
            <span>{doctor.category}</span>
            <StarRatings
            className={5}
      rating={doctor.rating}
        starRatedColor="yellow"
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="3px"/>
         <NavLink to="" className={styles.appointment}>Appointment</NavLink>
         </NavLink>
        </div>
   
)
}

export default Doctors;