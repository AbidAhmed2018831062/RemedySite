import React from 'react';
import styles from '../asset/css/posts.module.css';
function Posts({post})
{
return(
    <div className={styles.posts}>
        <h3>{post.title}</h3>
        <span>Date: {post.date}</span>
        <img src={post.img} alt="Title"></img>
        <pre>{post.des}</pre>

    </div>
)
}

export default Posts;