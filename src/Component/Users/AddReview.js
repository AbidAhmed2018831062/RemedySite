import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import queryString from 'query-string';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import * as yup from 'yup';
import Denied from '../Denied';
import styles from 'D:/medicine/src/asset/css/newpost.module.css';
import cancel from 'D:/medicine/src/asset/images/cancel.png';
function AddReview()
{
    const {search}=useLocation();
  let {username}=queryString.parse(search);
    let doctor=useRef();
  let [show,setShow]=useState(false);
  let [text,setText]=useState("");
  let userType;
  
  if(localStorage.getItem("type")!=="Doctor")
   userType=false;
   else
   userType=true;
    const ref=useRef();
    const schema=yup.object().shape({
  des:yup.string().min(15).required("Description needs to be more than 15 characters"),
      
        
       
    }).required();
    
const form=useRef();
let [rating,setRating]=useState(0);
    const [ty,setTy]=useState(false);
    const [what,setWhat]=useState(false);
    const [title,setTitle]=React.useState('');
    const [des,setDes]=React.useState('');
    const [file,setFile]=React.useState("");
   const [type,setType]=React.useState('Neurology');
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
    //  console.log(e);
      const change=e.target.value;
      if(e.target.name==="title")
      setTitle(change);
      else if(e.target.name==="des")
      setDes(change);
      else if(e.target.name==="type")
      setType(change);
      
    }
   
    const submit=(e)=> {
        const date=new Date();
        let  month_names= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let appDate=date.getDate()+" "+month_names[date.getMonth()]+" "+date.getFullYear();
        axios.post("http://localhost:5000/doctor/addreview",{username:localStorage.getItem("username"),des,rating,doctorusername:username,date:appDate},{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
       }}).then((data)=>{
        if(data.status===200){
          form.current.reset();
        console.log(data);
      setTitle("");
      setDes("");
      setType("Neurology");
      setShow(true);
      setText("Your review was posted successfully");
        
      
        
      }
      }).catch(err=>
        {
          console.log(err);
         

        });
      
        
       
    
}
const imageChange=(e)=>{
 
    setFile(e.target.files[0]);
   
  }
  const remove=()=>{
    setShow(false);   }
 const  removeShow=()=>{
    const interval=setInterval(() => {
        setShow(false);
      
    }, 10000);
 }
 const changeRating=(newRating)=>{
    setRating(newRating)
 }
return(
    <div className={styles.newpost}>
        {show&&<div  className={styles.show}>
            <p>{text}</p>
            <img onClick={remove}src={cancel} alt="Cancel"></img>
            </div>}
    { userType&&<div className={styles.container}>
         <form ref={form}onSubmit={ handleSubmit(submit)}>
            <h4>Insert Your Rating:</h4>
         <StarRatings
      rating={rating}
        starRatedColor="blue"
        numberOfStars={5}
        changeRating={changeRating}
        name='rating'
        starDimension="20px"
        starSpacing="3px"/>
    
    <textarea rows="10" cols="10" type="text" value={des} placeholder="Enter description"  {...register('des')} onChange={handleChange}></textarea> 
    <p className={styles.error}>{errors.des?.message}</p>

   <input type="submit"></input>

    </form>
    </div>}
    {!userType&&<Denied/>}
    </div>
)
}

export default AddReview;