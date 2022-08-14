import React from 'react';
import styles from '../asset/css/posts.module.css';
function Posts({post})
{
return(
    <div className={styles.posts}>
        <h3>{post.title}</h3>
       
        <img src={`http://127.0.0.1:8887/${post.fileName}`} alt={post.title}/>
        <span>Date: {post.date}</span>
        <pre>{post.des}</pre>

    </div>
)
}

export default Posts;