import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../asset/css/showmedicine.module.css';
import cancel from '../asset/images/cancel.png';
import Cashback from '../asset/images/cashback.png';
import des from '../asset/images/des.png';
function Medicine()
{

    let {id}=useParams();
    let [show,setShow]=useState(false);
    let [text,setText]=useState("");
   let card=useRef({});
console.log(id);
    const [what,setWhat]=useState(false);
    useEffect(()=>{
      console.log(localStorage.getItem("token"));
        axios.get(`http://localhost:5000/medicine/${id}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
            }}).then((data)=>{
            if(data.status===200)
            {
                card.current=data.data;
                console.log(data.data);
                 setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[]);
    const addToCart=(e)=>{
   let username=localStorage.getItem("username");
 
    axios.post(`http://localhost:5000/users/addtocart/${localStorage.getItem("username")}`,{
        name:card.current.name,fileName:card.current.fileName,company:card.current.company,price:card.current.price,count:1,username,medicineId:card.current.id
    },
     {headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }}).then((data)=>{
      if(data.status===200)
      {
          setText("Item added to the cart successfully");
          setShow(true);
          removeShow();
          console.log(data.data);
      }
    }).catch(err=>
      {
        setText("There was an error! Please try again later!");
          setShow(true);
          removeShow();
        console.log(err);
      });
    }
    const remove=()=>{
        setShow(false);   }
     const  removeShow=()=>{
        const interval=setInterval(() => {
            setShow(false);
          
        }, 10000);
     }
return(
    <div className={styles.showMedicine}>
        {show&&<div  className={styles.show}>
            <p>{text}</p>
            <img onClick={remove}src={cancel} alt="Cancel"></img>
            </div>}
      {what &&<div>
      <div className={styles.image}>
            <div className={styles.imagePart}>
            <img src={`http://127.0.0.1:8887/${card.current.fileName}`} alt={card.name}/>
            <p style={{color:"grey",margin:"0 auto"
            }}>Click to View Full Image.<br></br>
            Delivery available in all over Bangladesh *charges applied</p>
            </div>
            <div className={styles.medicinedes}>
             <h2>{card.current.name}</h2>
             <span  style={{display:"block"}}>{card.current.category}</span>
             <span style={{display:"block",marginBottom:"10px"}}>{card.current.company}</span>
             <div className={styles.priceDiv}>
                <span className={styles.buy}>5730people bought this</span>
                <span className={styles.price}>Best Price: ৳{card.current.price}</span>
                <button className={styles.button} onClick={addToCart}>Add To Cart</button>
             </div>
             <h3>Offers</h3>
             <ul>
                <li>
                    <div style={{marginBottom:"10px"}}>
                    <img src={Cashback} alt="Cashback"></img>
                   <span style={{fontSize:"115%",marginLeft:"5px"}}>Cashback 200 for purchasing above 5000</span>
                    </div>
                    </li>
                <li><div style={{marginBottom:"10px"}}>
                    <img src={Cashback} alt="Cashback"></img>
                    <span style={{fontSize:"115%",marginLeft:"5px"}}> Cashback 100 for pirchasing above 3000</span>
                    </div></li>
                <li><div style={{marginBottom:"10px"}}>
                    <img src={Cashback} alt="Cashback"></img>
                    <span style={{fontSize:"115%",marginLeft:"5px"}}> Cashback 50 for pirchasing above 2000</span>
                    </div></li>
             </ul>
             </div>
        </div>
        <div className={styles.description}>
            <div className={styles.desHead}>
            <img src={des} alt="Des" style={{width:"30px",height:"30px"}}></img>
            <h3 style={{color:"red",fontSize:"170%",display:"inline-block",marginTop:"-6px"}}>Description</h3>
            </div>
            <pre className={styles.para}>{card.current.desc}</pre>
        </div>
        </div>}
    </div>
)
}

export default Medicine;