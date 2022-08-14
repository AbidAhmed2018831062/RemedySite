import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Posts from './Posts';
function DoctorPosts({id})
{
    const [what,setWhat]=useState(false);
    let posts=useRef([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/doctor/getposts/${id}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                posts.current=data.data;
                console.log(data);
                setWhat(true);
            
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[id]);

return(
    <div>
          {what&&<div>{posts.current.map((e,i)=>{
                return <Posts post={e}/>
               })}
               </div>}
    </div>
)
}

export default DoctorPosts;