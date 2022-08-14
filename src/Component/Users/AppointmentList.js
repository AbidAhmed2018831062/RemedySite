import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ShowAppoints from './ShowAppoints';
function AppointmentList()
{
    let [what,setWhat]=useState(false);
    const appointment=useRef();
    const upcoming=useRef();
    const old=useRef();
    console.log("Hello");
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/getappointments/${localStorage.getItem("username")}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                console.log(data);
               
               
                let appoint=[];
                let oldAppoint=[];
                const date=new Date();
                let p=0;
                console.log(new Date(data.data[0].date));
               for(let i=0;i<data.data.length;i++)
                {
                    const appDate=new Date(data.data[i].date);
                    if(date.getDate()<=appDate.getDate()&&date.getMonth()<=appDate.getMonth()){
                        p++;
                        if(p===4){
                           
                        continue;
                        }
                    appoint.push(data.data[i]);
                    }
                    else
                    {
                        console.log(i);
                        old.current=data.data.slice(i,i+5);
                        break;
                    }
                }
                upcoming.current=appoint;
                appointment.current=data.data;
                setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
          
    },[])

return(
    <div>
       {what&& <div>
            <h3 style={{color:"red",fontSize:"120%"}}>Upcoming AppointMents</h3>
             {upcoming.current.map((e)=>{
                return <ShowAppoints appoint={e} show={false}/>
             })}
              <h3 style={{color:"red",fontSize:"120%"}}>Finished AppointMents</h3>
             {old.current.map((e)=>{
                
                return <ShowAppoints appoint={e} show={true}/>
             })}
        </div>}
    </div>
)
}

export default AppointmentList;