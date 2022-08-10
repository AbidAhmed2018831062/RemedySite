import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { default as React, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from '../asset/css/register.module.css';
import beach from '../asset/images/beach.jpeg';
function Register()
{
    const ref=useRef();
    const schema=yup.object().shape({
      name:yup.string().min(4).required("First Name is required"),
        lastname:yup.string().min(4).required("Last name is required"),
        email:yup.string().email("The given email is not a valid email").required("Email is required"),
        username:yup.string().min(4).required("Username is required"),
        phone:yup.string().required("Phone number is required"),
       
    }).required();
    let category=["Neurologists", "Heart","Gastric","Pediatricians","Gyenocologist","Flu","Allergists","Psychiatrist","Ophthalmologist","Urologists","Other"];
const form=useRef();
    const [ty,setTy]=useState(false);
    const [what,setWhat]=useState(false);
    const [name,setName]=React.useState('');
    const [lastname,setLastName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [email,setEmail]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [address,setaddress]=React.useState("");
    const [cat,setCat]=React.useState('Neurologist');
    const [type,setType]=React.useState('Normal User');
    const [reg,setReg]=React.useState('');
    const [username,setusername]=React.useState("");
    const [passwordType,setPasswordType]=React.useState("password");
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
    //  console.log(e);
      const change=e.target.value;
      console.log(password);
      if(e.target.name==="name")
      setName(change);
      else if(e.target.name==="lastname")
      setLastName(change);
      else if(e.target.name==="email")
      setEmail(change);
      else if(e.target.name==="message")
      setReg(change);
      else if(e.target.name==="cat") 
      setCat(change);
      else if(e.target.name==="address")
      setaddress(change);
      else if(e.target.name==="phone") 
      setPhone(change);
      else if(e.target.name==="type"){
        setType(change);
        console.log(ty);
        if(change==="Doctor")
        setTy(true);
        else
        setTy(false);
        setType(change);
      }
      else if(e.target.name==="username")
      setusername(change);
      else
      setPassword(change);
    }
   
    const submit=(e)=> {
      let userData={};
       if(type==="Doctor"){
        form.current.message.value= form.current.message.value+"\n"+"Email is: "+email;
        axios.post("http://localhost:5000/adddoctor",{
         name:name+" "+lastname,userName:username,fileName:"abid",password:password,email:email,phone,type,reg:reg,status:"false",address,category:cat
       },{
        headers:{
          "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmlkNjIxIiwiZXhwIjoxNjU5MTI3OTk1LCJpYXQiOjE2NTgzNTA3NDJ9.2vSHsj3LMjyVgEvmvzIxtIAYworN5V63_89a-XfSTqY`,
         
        }}).then((data)=>{
        if(data.status===200){
          form.current.reset();
        console.log(data);
        setReg("");
        setEmail('');
        setPhone(0);
        setLastName('');
        setName('');
        setPassword('');
        setType('Normal user');
        setTy(false);
        setusername('');
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
        if(err.response.data.msg.includes("Phone")){
            setError("phone", { type: "focus",message: 'Phone already in use' }, { shouldFocus: true });
    }
    else if(err.response.data.msg.includes("Username")){
        setError("username", { type: "focus",message: 'Username already in use' }, { shouldFocus: true });
}
else if(err.response.data.msg.includes("Email")){
    setError("email", { type: "focus",message: 'Email already in use' }, { shouldFocus: true });
}
        });
      
        
       
    }
    else{
      axios.post("http://localhost:5000/adduser",{
        firstName:name,lastName:lastname,userName:username,password:password,email:email,phone,type
     },{
      headers:{
        "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmlkNjIxIiwiZXhwIjoxNjU5MTI3OTk1LCJpYXQiOjE2NTgzNTA3NDJ9.2vSHsj3LMjyVgEvmvzIxtIAYworN5V63_89a-XfSTqY`,
       
      }}).then((data)=>{
      if(data.status===200){

        setReg("");
        setEmail('');
        setPhone(0);
        setLastName('');
        setName('');
        setPassword('');
        setType('Normal user');
        setTy(false);
        setusername('');
        setWhat(true);
      }
     
    }).catch(err=>
      {
        console.log(err);
      if(err.response.data.msg.includes("Phone")){
          setError("phone", { type: "focus",message: 'Phone already in use' }, { shouldFocus: true });
  }
  else if(err.response.data.msg.includes("Username")){
      setError("username", { type: "focus",message: 'Username already in use' }, { shouldFocus: true });
}
else if(err.response.data.msg.includes("Email")){
  setError("email", { type: "focus",message: 'Email already in use' }, { shouldFocus: true });
}
      });
    }
    console.log(userData);
   
     
      return console.log(e);
    }
    const myFunction=()=>{
       if(passwordType==="text")
       setPasswordType("password");
       else
       setPasswordType("text");
  }
    
    return(
        <div className={styles.registeruser}>
            <div className={styles.image}>
                <img src={beach} alt="Beach"></img>
            </div>
            <div className={styles.container}>
            
            <h3 className={styles.title}>Sign Up</h3>
     <form ref={form}onSubmit={ handleSubmit(submit)}>
    <input type="text" value={name} {...register('name')} placeholder="First Name" onChange={handleChange}></input> 
    <p className={styles.error}>{errors.name?.message}</p>
  
    <input type="text" value={lastname} name="name"placeholder="Last Name"  {...register('lastname')} onChange={handleChange}></input> 
    <p className={styles.error}>{errors.lastname?.message}</p>
    
    
    <input type="text"  value={username} placeholder="UserName"  {...register('username')} onChange={handleChange}></input>
    <p className={styles.error}>{errors.username?.message}</p>
    
    
    <select  {...register("type")} value={type} onChange={handleChange}>
      
                        <option value="Normal User">Normal User</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                    <p className={styles.error}>{errors.type?.message}</p>
    
   
    <input  type="email"  value={email}   placeholder="Email" {...register('email')} onChange={handleChange}></input>
    <p className={styles.error}>{errors.email?.message}</p>
    
    <input  type="number" placeholder="Phone"   value={phone} {...register('phone')} onChange={handleChange}></input>
    <p className={styles.error}>{errors.phone?.message}</p>
    {ty&&      <input type="text"  value={reg} name="message" placeholder="Enter your doctor registration number" onChange={handleChange}/>}
    {ty&& <div><select name="cat" value={cat} onChange={handleChange}>
      {category.map((e)=>{
                     return   <option value={e}>{e}</option>

      })}
                      
                    </select>
                    <p className={styles.error}>{errors.type?.message}</p></div>}
   {ty&&<input type="text"  value={address} name="address" placeholder="Enter your address" onChange={handleChange}/>}
    <input  style={{display:"block"}}type={passwordType} ref={ref} className={styles.myInput} placeholder="Password"   value={password}  {...register('password')} onChange={handleChange} ></input>
<input type="checkbox"  onClick={myFunction}></input><span>Show Password</span>
    <p className={styles.error}>{errors.password?.message}</p>
   
    <input type="submit"></input>
    </form>
    {what&& <Navigate to="/verifydoctor"></Navigate>}
    </div> 
    </div>
    )
}

export default Register;