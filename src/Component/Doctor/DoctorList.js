import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DoctorCategory from './DoctorCategory';
import Doctors from './Doctors';
import styles from 'D:/medicine/src/asset/css/doctorlist.module.css';
function DoctorList()
{

let doctors=useRef([]);
const [doc,setDoc]=useState([]);
const [what,setWhat]=useState(false);
useEffect(()=>{
  axios.get(`http://localhost:5000/doctor/getdoctors`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
              doctors.current=data.data;
              setDoc(data.data);
            
              console.log(data.data);
              setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
        
},[])
let filter=(e)=>{
  console.log(e);

  let filterDoc=[];
  doctors.current.forEach((docs)=>{
    console.log(docs.category+""+e);
  if(docs.category===e){
      
      filterDoc.push(docs);
  }
});
setDoc(filterDoc);
}
return(
    <div className={styles.doctorlist}>
        <DoctorCategory filter={filter}/>
    <div className={styles.container}>
    { doc.map((e)=>{
       console.log(e.userName);
      if(e.userName===localStorage.getItem("username")){
       
      return <div></div>;
      }
            return <Doctors doctor={e}/>}
      )}
    </div>
    </div>
)
}

export default DoctorList;