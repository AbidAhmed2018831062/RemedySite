import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from '../asset/css/login.module.css';
import beach from '../asset/images/beach.jpeg';
function LogIn()
{
   
    const ref=useRef();
    const [status,setStatus]=useState(false);
    const [what,setWhat]=useState(false);
    const schema=yup.object().shape({
        username:yup.string().min(4).required("Username is required"),
        password:yup.string().required("Password is required"),

       
    }).required();
const form=useRef();
  
    const [username,setusername]=React.useState("");
    const [password,setPassword]=React.useState("");
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
    //  console.log(e);
      const change=e.target.value;
      console.log(password);
     if(e.target.name==="username")
      setusername(change);
      else
      setPassword(change);
    }
    const submit=(e)=>{
        console.log("Hello");
        axios.post(`http://localhost:5000/login`,{
    userName:username,password       
    }).then((data)=>{
            if(data.status===200)
            {
                setWhat(true);
                setusername("");
                setPassword("");
                console.log(data);
                if(data.data.msg.includes("false")){
                setError("verify", { type: "focus",message: 'Your verification is still pending. Please try again later!!' }, { shouldFocus: true });
                }
                else
                localStorage.setItem("token",data.data.msg)
                
            }
          }).catch(err=>
            {
                setError("userandpass", { type: "focus",message: 'Invalid Username or password. Please try again!!' }, { shouldFocus: true });
            });
            return console.log(e);
    }
return(
    <div className={styles.login}>
        <div className={styles.img}>
            <img src={beach} alt="Backgorund"></img>
        </div>
        <div className={styles.container}>
            
            <h3 className={styles.title}>Sign In</h3>
            <p className={styles.error}>{errors.verify?.message}</p>
     <form ref={form}onSubmit={ handleSubmit(submit)}>
    <input type="text" value={username} {...register('username')} placeholder="Enter your username" onChange={handleChange}></input> 
    <p className={styles.error}>{errors.username?.message}</p>
  
    <input type="password" value={password} name="password"placeholder="Enter your password"  {...register('password')} onChange={handleChange}></input> 
    <p className={styles.error}>{errors.password?.message}</p>
    <input type="submit"/>
    </form>
    <p className={styles.error}>{errors.userandpass?.message}</p>
  
    </div>
    {what&& <Navigate to="/home"></Navigate>}
    
  
    </div>
   
)
}

export default LogIn;