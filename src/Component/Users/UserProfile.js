import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import AppointmentList from './AppointmentList';
import Orders from './Orders';
import styles from 'D:/medicine/src/asset/css/userprofile.module.css';
import customer from 'D:/medicine/src/asset/images/customer.png';
import edit1 from 'D:/medicine/src/asset/images/edit.png';
import face from 'D:/medicine/src/asset/images/face.jpg';
import order1 from 'D:/medicine/src/asset/images/order.png';

function UserProfile()
{
    const orders=useRef();
    const [type,setType]=useState("Normal");
    const userProfile=useRef();
    const [what,setWhat]=useState(false);
    const [profile,setProfile]=useState(true);
    const [order,setOrder]=useState(false);
    const [edit,setEdit]=useState(false);
    const [app,setApp]=useState(false);
    const profileHandler=()=>{
        if(profile===false){
        setProfile(true);
        setEdit(false);
        setOrder(false);
        setApp(false);
        }
        
        
    };
    const orderHandler=()=>{
        //console.log("HI I am Abid")
        if(order===false){
            console.log("HI I am Abid")
        setOrder(true);
        setEdit(false);
        setProfile(false);
        setApp(false);

        }
    }
    
    const editHandler=()=>{
        //console.log("HI I am Abid")
        if(edit===false){
        setEdit(true);
        setOrder(false);
        setProfile(false);
        setApp(false);

        }
    }
        const appHandler=()=>{
            //console.log("HI I am Abid")
            if(edit===false){
            setEdit(false);
            setOrder(false);
            setProfile(false);
            setApp(true);
    
            }
    };
    useEffect(()=>{
        let   e="http://localhost:5000/getProfileDetails/";
        if(localStorage.getItem("type").includes("tor")){
          e="http://localhost:5000/doctorprofileuser/";
          setType("doctor");
        }
        else if(localStorage.getItem("type")==="normal")
        e="http://localhost:5000/getProfileDetails/"
        axios.get(`${e}${localStorage.getItem("username")}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
              console.log(data);
                userProfile.current=data.data;
                axios.get(`http://localhost:5000/getorders/${localStorage.getItem("username")}`,{
                    headers:{
                      "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    }}).then((data)=>{
                    if(data.status===200)
                    {
                        console.log(data);
                        setWhat(true);
                        orders.current=data.data;
                       // console.log(orders.current[0]);
                    }
                  }).catch(err=>
                    {
                      console.log(err);
                    });
            }
          }).catch(err=>
            {
              console.log(err);
            });
     
    },[]);
   

return(
   
    <div className={styles.userprofile}>
      {what&&  
      <div className={styles.item1}>
            <div className={styles.profilepic}>
                <img src={face} alt="Face"></img>
                <h2>{userProfile.current.userName}</h2>
                <span>{userProfile.current.email}</span>
            </div>
      
            <div className={styles.profile} onClick={profileHandler}>
                <img  src={customer} alt="Customer"></img>
              <h3>Profile</h3>
            </div>
            <div className={styles.profile} onClick={orderHandler}>
                <img  src={order1} alt="Order"></img>
              <h3>Orders</h3>
            </div>  
            <div className={styles.profile} onClick={editHandler}>
                <img  src={edit1} alt="Edit"></img>
              <h3>Edit Profile</h3>
            </div>
            <div className={styles.profile} onClick={appHandler}>
                <img  src={edit1} alt="Edit"></img>
              <h3>Appointment</h3>
            </div>
        </div>}
        {what&&  <div className={styles.item2}>
           
           {profile &&<div className={styles.pr}>
            <div className={styles.right}>
            <div className={styles.quotes}>
                <pre style={{fontStyle:"italic",fontFamily:"cursive",textAlign: "center"}}>
                We can cure physical diseases with medicine, the only cure for loneliness, despair, and hopelessness is love -Mother Teresa

                    </pre>
            </div>
           <div className={styles.details}>
                <h2>User Details</h2>
               <div className={styles.detailsdiv}>
                <div className={styles.part1}>
                    <pre>Name&nbsp;&nbsp;&nbsp;             : {userProfile.current.firstName+" "+userProfile.current.lastName}</pre>
                    <pre>Phone&nbsp;&nbsp;&nbsp;            :  {userProfile.current.phone}</pre>
                    <pre>Email&nbsp;&nbsp;&nbsp;             :  {userProfile.current.email}</pre>
                </div>
                <div className={styles.part2}>
                  
                    <pre>Username        :  {userProfile.current.userName}</pre>
                    <pre>Type                  : {type}</pre>
                </div>
            </div>
            </div>
            </div>
            <div className={styles.overview}>
                <div className={styles.totalorder}>
                    <h3>{orders.current[0]}</h3>
                   <div className={styles.insidediv}>
                    <h4>Total Orders</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.thismonth}>
                    <h3>{orders.current[0]}</h3>
                   <div className={styles.insidediv}>
                    <h4>Monthly Order</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.totalorder}>
                    <h3 style={{color:"#89E289"}}>{orders.current[1]}</h3>
                   <div className={styles.insidediv}>
                    <h4 style={{color:"#89E289"}}>Appointment</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
                <div className={styles.thismonth}>
                    <h3 style={{color:"#66009A"}}>{orders.current[1]}</h3>
                   <div className={styles.insidediv}>
                    <h4 style={{color:"#66009A"}}>Monthly Order</h4>
                    <span>From: 12 Jan 2020</span>
                    <span>To: 20 Nov 2022</span>
                    </div>
                </div>
            </div>
            </div>}
            {order&&<div className={styles.orders}>
               <Orders/>
                </div>}
                {app&&<div className={styles.orders}>
               <AppointmentList></AppointmentList>
                </div>}
        </div>}
        
    </div>
)
}

export default UserProfile;