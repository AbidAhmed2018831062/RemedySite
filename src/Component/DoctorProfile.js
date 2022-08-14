import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../asset/css/doctorprofile.module.css';
import des from '../asset/images/des.png';
import doctorsmile from '../asset/images/doctor1.webp';
import fb from '../asset/images/facebook.png';
import insta from '../asset/images/insta.png';
import link from '../asset/images/linkedin.png';
import location from '../asset/images/location.png';
import phone from '../asset/images/phone.png';
import review from '../asset/images/review.png';
import time from '../asset/images/time.png';
import DoctorPosts from './Doctorposts';
import Overview from './Overview';
import Reviews from './Reviews';
function DoctorProfile()
{
    let {id}=useParams();
     const [what,setWhat]=useState(false);
    let profile=useRef();
    let [writing,setWriting]=useState(true);
    let [rev,setReview]=useState(false);
    let [over,setOver]=useState(false);
    const writingHandler=()=>{
        if(writing===false){
        setWriting(true);
        setOver(false);
        setReview(false);
        }
        
        
    };
    useEffect(()=>{
        axios.get(`http://localhost:5000/doctorprofile/${id}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                console.log(data);
                setWhat(true);
                profile.current=data.data;
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[id]);
    const revHandler=()=>{
        //console.log("HI I am Abid")
        if(rev===false){
            console.log("HI I am Abid")
        setReview(true);
        setOver(false);
        setWriting(false);
        }
     
    };
    const overHandler=()=>{
        if(over===false){
        setOver(true);
       setWriting(false);
       setReview(false);
    }
        
    };
 

 
return(
    <div className={styles.doctorprofile}>
         {what&&<div>
        <header>
        <div className={styles.container}>
        <img className={styles.img} src={doctorsmile} alt="Doctor"></img>
            <div className={styles.main}>
            <div>
                <h2>{profile.current.name}</h2>
                <span style={{marginBottom:"10px",fontSize:"120%",color:'white'}}>Cardiologist</span>
                <div className={styles.item}>
                    <img src={location} alt="Location"></img>
                    <span>{profile.current.address}</span>
                </div>
                <div className={styles.item}>
                    <img src={phone} alt="Location"></img>
                    <span>{profile.current.phone}</span>
                </div>
                <div className={styles.item}>
                    <img src={time} alt="Location"></img>
                    <span>4-10p.m</span>
                </div>
            </div>
            </div>
            <div className={styles.media}>
                <img src={fb} alt="Facebook"></img>
                <img src={insta} alt="Instagram"></img>
                <img src={link} alt="LinkedIn"></img>
                <NavLink className={styles.navLink} to={`/appointment/${id}`}>Book An Appoinment</NavLink>
                 
            </div>
            </div>
        </header>
        <div className={styles.doctormenu}>
            <div className={styles.item} onClick={writingHandler}>
                <img src={des} alt="Des"></img>
                <span>Writing</span>
            </div>
            <div className={styles.item} onClick={revHandler}>
                <img src={review} alt="Review"></img>
                <span>Review</span>
                
            </div>
            <div className={styles.item} onClick={overHandler}>
                <img src={des} alt="overview"></img>
                <span>Overview</span>
            </div>
        </div>
        {writing&&<div className={styles.writing}>
            <div>
             <DoctorPosts id={id}/>
            </div>
        </div>}
        {rev&&<div className={styles.review}>
            <div>
              <Reviews username={profile.current.userName}/>
            </div>
        </div>}
        {over&&<div>
            <Overview profile={profile.current}/>
            </div>}
            </div>}
    </div>
)
}

export default DoctorProfile;