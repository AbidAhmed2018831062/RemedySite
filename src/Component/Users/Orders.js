import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Order from './Order';
function Orders()
{
 const [what,setWhat]=useState(false);
    let orders=useRef();
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/getorders/${localStorage.getItem("username")}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                console.log(data);
               
                orders.current=data.data;
                setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
          
    },[])
return(
  <div>
    {what&&<div>
    {orders.current.map((e,i)=>{
      return <Order order={e} index={i}/>
    })}
    </div>}
    </div>
)
}

export default Orders;