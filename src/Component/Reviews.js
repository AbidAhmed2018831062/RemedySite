import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Review from './Review';
function Reviews({username})
{
    let [what,setWhat]=useState(false);
    let review=useRef();
    useEffect(()=>{
        axios.get(`http://localhost:5000/doctor/getreviews/${username}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                console.log(data);
                setWhat(true);
                review.current=data.data;
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[username]);
return(
    <div>
       {what&&<div> {review.current.map((e)=>{
            return <Review review={e}/>
        })}
        </div>}
    </div>
)
}

export default Reviews;