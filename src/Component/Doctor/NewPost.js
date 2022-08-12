import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import emailjs from 'emailjs-com';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Denied from '../Denied';
import styles from 'D:/medicine/src/asset/css/newpost.module.css';
function AddPost()
{
  let userType;
  if(localStorage.getItem("type")!=="Doctor")
   userType=false;
   else
   userType=true;
    const ref=useRef();
    const schema=yup.object().shape({
      title:yup.string().min(10).required("Title needs to be more than 10 characters"),
        des:yup.string().min(100).required("Description needs to be more than 100 characters"),
      
        
       
    }).required();
    let category=["Neurologists", "Heart","Gastric","Pediatricians","Gyenocologist","Flu","Allergists","Psychiatrist","Ophthalmologist","Urologists","Other"];
const form=useRef();
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
      let userData={};
        let fd=new FormData();
        fd.append("type",type);
        fd.append("title",title);
        fd.append("des",des);
        fd.append("username",localStorage.getItem("username"));
        fd.append("img",file);
        fd.append("date",new Date().toLocaleDateString());
        axios.post("http://localhost:5000/doctor/addpost",fd,{headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
       }}).then((data)=>{
        if(data.status===200){
          form.current.reset();
        console.log(data);
      setTitle("");
      setDes("");
      setType("Neurology");
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
const imageChange=(e)=>{
 
    setFile(e.target.files[0]);
   
  }
return(
    <div className={styles.newpost}>
    { userType&&<div className={styles.container}>
         <form ref={form}onSubmit={ handleSubmit(submit)}>
         <input className={styles.fileSelector}
  type='file'
  name="image"
  style={{ display: 'block' }}
  onChange={imageChange}
/>     
    <input type="text" value={title} {...register('title')} placeholder="Enter Title" onChange={handleChange}></input> 
    <p className={styles.error}>{errors.name?.message}</p>
  
    <textarea rows="10" cols="10" type="text" value={des} placeholder="Enter description"  {...register('des')} onChange={handleChange}></textarea> 
    <p className={styles.error}>{errors.lastname?.message}</p>
   
    <p className={styles.error}>{errors.username?.message}</p>
    
    
    <select  {...register("type")} value={type} onChange={handleChange}>
      
    {category.map((e)=>{
                     return   <option value={e}>{e}</option>

      })}
                    </select>
                    <p className={styles.error}>{errors.type?.message}</p>
                    <input type="Submit"></input>

    </form>
    </div>}
    {!userType&&<Denied/>}
    </div>
)
}

export default AddPost;