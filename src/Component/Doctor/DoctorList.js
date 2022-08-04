import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DoctorCategory from './DoctorCategory';
import Doctors from './Doctors';
import styles from 'D:/medicine/src/asset/css/doctorlist.module.css';
function DoctorList()
{

let doctors=useRef([]);
const [what,setWhat]=useState(false);
useEffect(()=>{
  axios.get(`http://localhost:5000/getdoctors`,{
            headers:{
              "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmlkNjIxIiwiZXhwIjoxNjU5MTI3OTk1LCJpYXQiOjE2NTgzNTA3NDJ9.2vSHsj3LMjyVgEvmvzIxtIAYworN5V63_89a-XfSTqY`,
            }}).then((data)=>{
            if(data.status===200)
            {
                doctors.current=data.data;
                console.log(data.data);
                 setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
        
})
return(
    <div className={styles.doctorlist}>
        <DoctorCategory/>
    {what&&<div className={styles.container}>
        {doctors.current.map((e)=>{
            return <Doctors doctor={e}/>
        })}
    </div>}
    </div>
)
}

export default DoctorList;