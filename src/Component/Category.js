import React, { useState } from 'react';
import styles from '../asset/css/category.module.css';
import bbay from '../asset/images/bbay.jpg';
import covid from '../asset/images/covid.jpg';
import devices from '../asset/images/devices.jpg';
import first from '../asset/images/first.jpg';
import gas from '../asset/images/gas.jpg';
import heart from '../asset/images/heart.jpg';
import menu1 from '../asset/images/menu1.png';
import nutrition from '../asset/images/nutrition.jpg';
import other from '../asset/images/other.jpg';
import personal from '../asset/images/personal.jpg';
import sexual from '../asset/images/sexual.webp';
import women from '../asset/images/women.webp';


function Category({filter})
{
let category=["Covid 19", "Heart","Women Care","Personal Help","Devices","Nutrtions","First Aid","Sexual Help","Baby","Gastrology","Other"];
let images=[covid,heart,women,personal,devices,nutrition,first,sexual,bbay,gas,other];

let [what, setWhat]=useState(true);
const catHandler=()=>{
    if(what===true)
    setWhat(false);
    else
    setWhat(true);
}
return(
    <div className={styles.category}>
        <div className={styles.cat}>
        <img src={menu1} alt="Categories menu" onClick={catHandler}/>
        <span>Categories</span>
        </div>
       {what&&<div> {category.map((e,i)=>{
            return <ul>
                <div onClick={()=> filter(e)}>
                    <img src={images[i]} alt={e}/>
                <li key={i}>{e}</li>
                </div>
                
            </ul>
        })}</div>}
    
       
    </div>
)
}

export default Category;