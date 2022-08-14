import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../asset/css/showsinglepost.module.css';
function ShowSinglePost()
{
   let savedPost= JSON.parse(localStorage.getItem("savePost"));
   if(savedPost===null)
   savedPost=[];
  if(savedPost!==null&&savedPost.length===4)
   savedPost.pop();
    const savePost={};
        const {id}=useParams();
    const [post,setPost]=React.useState([]);
    const [sidePost,setSidePost]=React.useState([]);
    let [what,setState]=useState(false);
    useEffect( ()=>{
       
    axios.get(`http://localhost:5000/doctor/showsinglepost/${id}`,
        {headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
          }}).then((res)=>{const status=res.status;
  
    if(status===200){
    setPost(res.data);
    axios.get(`http://localhost:5000/doctor/getallposts`, {headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then(data=>{
if(data.status===200)
{
    setSidePost(data.data.slice(0,7));
    setState(true);
  
}
   })
  
    }

});
    },[id,what]);

return(
    <> {what&&<div className={style.showsingle}>
        
    <div className={style.mainPosts}>
     <h3>{post.title}</h3>
     <span className={style.span}>{post.date}</span>
     <span className={style.span1}>Author: {post.username}</span>
     <img src={`http://127.0.0.1:8887/${post.fileName}`} className={style.img} alt="Pro"/>
     <pre className={style.para}>{post.des}</pre>
    </div>
    <div className={style.sidePosts}>
    <h3>Recent Posts</h3>
        {sidePost.map((element,i)=>{
       if(element.id===post.id)
      return(<></>);
       return (
       <NavLink to={`/doctor/posts/${element.id}`}key={element.id} className={({isActive})=> isActive?style.navLink:style.navLink}>
       <div key={element.id}>
        <div className={style.posts}>
            <img src={`http://127.0.0.1:8887/${element.fileName}`}alt="Pro"/>
            <h4>{element.title}</h4>
        </div>
    </div>
    </NavLink>
       )
        })
    }
    </div>
  </div>
}
  </>
  
)
}

export default ShowSinglePost;