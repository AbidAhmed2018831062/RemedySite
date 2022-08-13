import axios from 'axios';
import React, { useEffect } from 'react';
import style from '../asset/css/blogsp.module.css';
import AllBlogs from './ShowBlogs';
const location=localStorage.getItem("image");
function BlogPosts()
{
    let [posts,setPosts]=React.useState([]);
    let savedPost=[];
    if(localStorage.getItem("savePost")!==null)
    savedPost=JSON.parse(localStorage.getItem("savePost"));
    useEffect(()=>{
        (
            async ()=>{
      const res =await axios.get("http://localhost:5000/doctor/getallposts",{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
      }});
      
      const status=res.status;
      if(status===200)
     setPosts(res.data);
            })();
    },[]);


return(
    <div className={style.blogs}>
            
            <div className={style.main}>
        
        <AllBlogs posts={posts}/>
        </div>
    </div>
)
}

export default BlogPosts;