import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import emailjs from 'emailjs-com';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import styles from 'D:/medicine/src/asset/css/appointment.module.css';
function AppointMent({doctor})
{
  
    const rand = () => {
        return Math.random().toString(36).substr(2);
      };
      
      const token = () => {
        return rand() + rand();
      };
      
      
    const {id}=useParams();
   // console.log(new Date().getHours());
    const ref=useRef();
    const schema=yup.object().shape({
      name:yup.string().min(6).required("Name needs to be more than 6characters"),
      phone:yup.string().min(11).max(11).required("Enter a valid phone number without +88"),
    }).required();
   
const form=useRef();
   const date=new Date();
   //console.log(date.getDate);
    const [what,setWhat]=useState(false);
    const [name,setName]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [type,setType]=React.useState('Offline');
   const [selectedDate,setSelectedDate]=useState();
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
    //  console.log(e);
      const change=e.target.value;
      if(e.target.name==="name")
      setName(change);
      else if(e.target.name==="phone")
      setPhone(change);
      else
      setType(change);
      
    }
   const doctorDetails=useRef();
   useEffect(()=>{
    axios.get(`http://localhost:5000/doctorprofile/${id}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
        }}).then((data)=>{
        if(data.status===200)
        {
            console.log(data);
            setWhat(true);
            doctorDetails.current=data.data;
        }
      }).catch(err=>
        {
          console.log(err);
        });
      
    
   },[id])
    const submit=(e)=> {
    
       axios.post("http://localhost:5000/doctor/appointment",{
            date:selectedDate.getMonth()+" "+selectedDate.getDate()+" "+selectedDate.getFullYear(),type,name:doctorDetails.current.name+" "+doctorDetails.current.category,phone,doctorId:id,username:localStorage.getItem("username"),token:token(),doctorusername:doctorDetails.current.userName},{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
       }}).then((data)=>{
        if(data.status===200){
          form.current.reset();
        console.log(data);
        axios.put(`http://localhost:5000/doctor/overviewup/${doctorDetails.current.userName}`,{blogcount:0,appointmentcount:1,username:doctorDetails.current.userName},{headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
         }}).then((data)=>{
          if(data.status===200)
          {
            emailjs.sendForm(process.env.React_App_SERVICE_ID, process.env.React_App_Template_Id, form.current, process.env.React_App_Public)
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
           setWhat(true);
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
      
        
       
    
}

return(
    <div className={styles.appointment}>
      
       {what&& <div className={styles.container}>
        <h2 style={{color:"red",marginBottom:"20px"}}>Book an appointment of {doctorDetails.current.name}</h2>
          <form ref={form}onSubmit={ handleSubmit(submit)}>
         
    <input type="text" value={name} {...register('name')} placeholder="Enter Full Name" onChange={handleChange}></input> 
    <p className={styles.error}>{errors.name?.message}</p>
  
    <input type="text" value={phone} placeholder="Enter phone"  {...register('phone')} onChange={handleChange}></input> 
    <p className={styles.error}>{errors.phone?.message}</p>
    <ReactDatePicker selected={selectedDate} onChange={date=>  setSelectedDate(date)}
    placeholderText="Pick a date"
    filterDate={date=> date.getDay()!==5}
    minDate={new Date().getTime() + 24 * 60 * 60 * 1000}
    maxDate={new Date().getTime() + 24 * 60 * 60 * 1000*7}
   />
    
    <select name="type" value={type} onChange={handleChange}>
    <option value="Online">Online</option>
    <option value="Offline">Offline</option>

                      
     </select>
                    
  <input type="submit"></input>
    </form>
    </div>}
    </div>
)
}

export default AppointMent;