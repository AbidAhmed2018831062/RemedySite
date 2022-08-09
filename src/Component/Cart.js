import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartItems from './ShowCart';
import styles from 'D:/medicine/src/asset/css/showcart.module.css';
function Cart()
{
    const username="abid62";
    let [ship,setShip]=useState("");
    let [code,setCode]=useState(0);
    let [item,setItem]=useState(0);
    let [price,setPrice]=useState(0);
    let [carts,setCarts]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/cart/${username}`,{
            headers:{
              "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmlkNjIxIiwiZXhwIjoxNjU5MTI3OTk1LCJpYXQiOjE2NTgzNTA3NDJ9.2vSHsj3LMjyVgEvmvzIxtIAYworN5V63_89a-XfSTqY`,
            }}).then((data)=>{
            if(data.status===200)
            {
                
                console.log(data.data);
                let p=0;
                let i=0;
                data.data.forEach((e)=>{
                    p+=e.price;
                    i++;

                });
                setItem(i);
                setPrice(p);
                setCarts(data.data);
            
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[]);
const increaseItem=(e,item1)=>{
    console.log(item);
    if(e==="decrease"){
     setItem((prev)=> prev-1);
     setPrice((prev)=> prev-item1.price)
    }
    else
    {
        setItem((prev)=> prev+1);
        setPrice((prev)=> prev+item1.price)
    }
}
const deleteItem=(e,item)=>{

    axios.delete(`http://localhost:5000/users/cart/delete/${item.medicineId}`,{
        headers:{
          "Authorization":`Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmlkNjIxIiwiZXhwIjoxNjU5MTI3OTk1LCJpYXQiOjE2NTgzNTA3NDJ9.2vSHsj3LMjyVgEvmvzIxtIAYworN5V63_89a-XfSTqY`,
        }}).then((data)=>{
        if(data.status===200)
        {
            
            console.log(data.data);
            let ca=carts;
            ca.splice(e,1);
            setCarts(ca);
            setItem((prev)=>prev-1);
            setPrice((prev)=>prev-item.price);
           
        }
      }).catch(err=>
        {
          console.log(err);
        });
}
const handleDeli=(e)=>{
    if(e.target.value.includes("Dh")){
    setCode((prev)=>prev+100);
    setShip(e.target.value);
    }
    else  if(e.target.value.includes("My")){
        setCode((prev)=>prev+100);
        setShip(e.target.value);
        }
        else  if(e.target.value.includes("Cu")){
            setCode((prev)=>prev+100);
            setShip(e.target.value);
            }
            else  if(e.target.value.includes("Sy")){
                setCode((prev)=>prev+0);
                setShip(e.target.value);
                }
}
return(
    <div className={styles.cart1}>
    <div className={styles.showcart}>
           <h3 className={styles.h3}>Your Added Items</h3>
           <hr className={styles.hr}></hr>
           {carts.map((e,i)=>{
            return <CartItems increaseItem={increaseItem}deleteItem={deleteItem}index={i}item={e}/>
           })}
           </div>
           <div className={styles.order}>
            <h3>Summary</h3>
            <hr></hr>
            <div className={styles.flex}>
            <div className={styles.total}>
            <pre>Total Items: </pre>
            <pre>Total Price</pre>
            </div>
            <div className={styles.total1}>
            <pre>{item} </pre>
            <pre>{price}</pre>
            </div>
            </div>
            <h4>
                Shipping
            </h4>
            <select className={styles.ship}  value={ship}  onChange={handleDeli}>
                        <option value="Sylhet-0">Sylhet- 0</option>
                        <option value="Dhaka-100">Dhaka- 100</option>
                        <option value="Mymensingh-100">Mymensingh- 100</option>
                        <option value="Cumilla-100">Dhaka- 100</option>
                    </select>
                    <h4>
                Enter Code
            </h4>
            <input type="text" value={code} placeholder="Enter code"></input>
            <hr></hr>
            <div className={styles.flex} style={{marginBottom:"30px"}}>
            <div className={styles.total}>
            <pre>Total Price:</pre>
            </div>
            <div className={styles.total1}>
            <pre>{(price+code)}</pre>
            </div>
            </div>
            <NavLink className={styles.checkout} to="/cart">
            Checkout
            </NavLink>
           </div>
    </div>
)
}

export default Cart;