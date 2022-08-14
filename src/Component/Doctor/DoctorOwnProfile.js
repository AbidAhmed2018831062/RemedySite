import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DoctorPosts from '../Doctorposts';
import Reviews from '../Reviews';
import Manage from './Manage';
import styles from 'D:/medicine/src/asset/css/doctorownprofile.module.css';
import des from 'D:/medicine/src/asset/images/des.png';
import doctorsmile from 'D:/medicine/src/asset/images/doctor1.webp';
import fb from 'D:/medicine/src/asset/images/facebook.png';
import insta from 'D:/medicine/src/asset/images/insta.png';
import link from 'D:/medicine/src/asset/images/linkedin.png';
import location from 'D:/medicine/src/asset/images/location.png';
import phone from 'D:/medicine/src/asset/images/phone.png';
import review from 'D:/medicine/src/asset/images/review.png';
import time from 'D:/medicine/src/asset/images/time.png';
import Overview from 'D:/medicine/src/Component/Overview';
function DoctorOWnProfile()
{
    let profile=useRef();
    let [what,setWhat]=useState(false);
    let [writing,setWriting]=useState(true);
    let [rev,setReview]=useState(false);
    let [over,setOver]=useState(false);
    let [manage,setManage]=useState(false);
    const writingHandler=()=>{
        if(writing===false){
        setWriting(true);
        setOver(false);
        setReview(false);
        setManage(false)
        }
        
        
    };
    const revHandler=()=>{
        //console.log("HI I am Abid")
        if(rev===false){
            console.log("HI I am Abid")
        setReview(true);
        setOver(false);
        setWriting(false);
        setManage(false);
        }
     
    };
    const overHandler=()=>{
        if(over===false){
        setOver(true);
       setWriting(false);
       setReview(false);
       setManage(false);

    }
        
    };
    const manageHandler=()=>{
        if(manage===false){
        setOver(false);
       setWriting(false);
       setReview(false);
       setManage(true);

    }
        
    };  
    useEffect(()=>{
        axios.get(`http://localhost:5000/getdoctor/${localStorage.getItem("username")}`,{
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
    },[]);
   
 
 
 
return(
    <div className={styles.doctorownprofile}>
        {what&&<div>
        <header>
            <div className={styles.container}>
        <img className={styles.img} src={doctorsmile} alt="Doctor"></img>
            <div className={styles.main}>
            <div>
                <h2>{profile.current.name}</h2>
                <span style={{marginBottom:"10px",fontSize:"120%",color:'white'}}>{profile.current.category}</span>
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
                <NavLink className={styles.navLink} to="/doctor/write">Write a new blog</NavLink>
                 
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
            <div className={styles.item} onClick={manageHandler}>
                <img src={des} alt="overview"></img>
                <span>Manage</span>
            </div>
        </div>
        {writing&&<div className={styles.writing}>
            <div>
             <DoctorPosts id={profile.current.id}/>
            </div>
        </div>}
        {rev&&<div className={styles.review}>
            <div>
             <Reviews username={profile.current.userName} />
            </div>
        </div>}
        {over&&<div>
            <Overview profile={profile.current}/>
            </div>}
            
        <Manage/>
        </div>}
    </div>
)
}

export default DoctorOWnProfile;