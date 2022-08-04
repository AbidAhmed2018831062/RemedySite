import React, { useState } from 'react';
import styles from 'D:/medicine/src/asset/css/cart.module.css';
import del from 'D:/medicine/src/asset/images/del.png';

function CartItems({item,i,deleteItem,increaseItem})
{
    
    let [count,setCount]=useState(item.count);

return(
    <div className={styles.cart}>
        <div className={styles.container}>
            <div className={styles.cartitems}>
             <div style={{width:"25%"}}>
             <img className={styles.img} src={`http://127.0.0.1:8887/${item.fileName}`} alt={item.name}/>
                </div>
                <div className={styles.name}>
                 <h2>{item.name}</h2>
                 <h3>{item.company}</h3>
                 </div>
                 <div className={styles.price}>
                 <h2>৳ {item.price}</h2>
                
                 </div>
                 <span style={{backgroundColor:"#ECECEC"}}onClick={()=>{
                    if(count>0){
                    setCount((prev)=>prev-1);
                    return increaseItem("decrease",item)
                 }
                 else
                 return null;}}>-</span>
                 <span>{count}</span>
                 <span style={{backgroundColor:"#ECECEC"}} onClick={()=>{
                      setCount((prev)=>prev+1);
                    return increaseItem("increase",item)}}>+</span>
                 <div className={styles.del}>
                 <img src={del} onClick={()=> deleteItem(i,item)} alt={item.name}/>
                 
                 </div>
                 
            </div>
           
        </div>
        <hr></hr>
    </div>
)
}

export default CartItems;