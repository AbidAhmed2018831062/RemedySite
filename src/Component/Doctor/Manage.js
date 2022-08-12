import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from 'D:/medicine/src/asset/css/manage.module.css';
function Manage()
{
    const [appointment,setAppointment]=useState([]);
    const [what,setWhat]=useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:5000/doctor/todayappointment/${localStorage.getItem("username")}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                
              
                setAppointment(data.data);
                setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
          
    },[])

return(
    <div className={styles.manage}>
        <table>
            <thead>
            <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Appoint Id</th>
            <th>Phone</th>
            </tr>
            </thead>
            <tbody>
                    {what&&appointment.map((e)=>{
                       return( <tr>
                        <td>{e.date}</td>
                        <td>{e.name}</td>
                        <td>{e.token}</td>
                        <td>{e.phone}</td>
                        </tr> )
                    })}
               
            </tbody>
        </table>
        <button>Add new patient</button>
    </div>
)
}

export default Manage;