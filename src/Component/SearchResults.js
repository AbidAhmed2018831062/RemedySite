import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../asset/css/searchresults.module.css';
import Doctors from './Doctor/Doctors';
import Card from './Showcard';
function SearchResult()
{
    const {search}=useParams();
    let  style={color:"red",backgroundColor:"yellow",padding:"10px 20px",marginRight:"20px",fontWeight:"bold",cursor:"Pointer"};
    const [medi,showMedi]=useState(true);
    const [doc,showDoc]=useState(false);
   let element=<p>No results found</p>
    const [medicine,setMedicine]=useState([]);
    const [doctor,setDoctor]=useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/medicine/getResults/${search}`,
        {headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
          }}).then((res)=>{const status=res.status;
 console.log(status);
    if(status===200){
       showDoc(true);
    setMedicine(res.data);
   }
    else
    {
      
        showMedi(false);
        setMedicine([]); 
    }

});
axios.get(`http://localhost:5000/doctor/getdoctor/${search}`, {headers:{
    "Authorization":`Bearer ${localStorage.getItem("token")}`,
  }}).then(data=>{

if(data.status===200&&data.data.msg==null)
{
console.log(data.data);
setDoctor(data.data);



}
else{

showDoc(false);
setDoctor([]);
}
})
    },[search]);
    const handleMedicine=()=>{
    
       style={color:"red",backgroundColor:"yellow",padding:"10px 20px"};
       showMedi(true);
       showDoc(false); 
        
    }
    const handleDoctor=()=>{
       
        style={color:"red",backgroundColor:"yellow",padding:"10px 20px"};
        showMedi(false);
        showDoc(true); 
        
     }
return(
    <div className={styles.searchResult}>
        <div className={styles.choose}>
            <span style={style} onClick={handleMedicine}>Medicines</span>
            <span style={style} onClick={handleDoctor}>Doctors</span>
        </div>
    <div>

            {medi&&medicine.map((e)=>{
                return <Card card={e}/>
            })}
            {medicine.length===0&&element}
            {doc&&doctor.map((e)=>{
                return <Doctors doctor={e}/>
            })}
             {doctor.length===0&&element}
            </div>
    </div>
)
}

export default SearchResult;