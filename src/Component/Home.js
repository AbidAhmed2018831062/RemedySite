import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../asset/css/home.module.css';
import Category from './Category';
import Cards from './MedicinesCard';
function Home()
{
    let mainCard=useRef([]);
    let [cards,setCards]=useState([]);
    const [what,setWhat]=useState(false);
    useEffect(()=>{
      console.log(process.env.React_App_NAME);
        axios.get("http://localhost:5000/users/allmedicine",{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
              'Content-type':"multipart/form-data"
            }}).then((data)=>{
            if(data.status===200)
            {
                setCards(data.data);
                mainCard.current=data.data;
                console.log(data.data);
                setWhat(true);
            }
          }).catch(err=>
            {
              console.log(err);
            });
    },[]);
    let filter=(e)=>{
        console.log(e);
      
        let filterMed=[];
     mainCard.current.forEach((card)=>{
        if(card.category===e){
            console.log(card.category);
           filterMed.push(card);
        }
     });
    setCards(filterMed);
    }
return(
    <div className={styles.comp}>
        <Category filter={filter}/>
    <Cards cards={cards}/>
    </div>
)
}

export default Home;