import React, { useState } from 'react';
import styles from 'D:/medicine/src/asset/css/doctorcategory.module.css';
import cold from 'D:/medicine/src/asset/images/cold.webp';
import gas from 'D:/medicine/src/asset/images/gas.jpg';
import geyno from 'D:/medicine/src/asset/images/geyno.jpg';
import heart from 'D:/medicine/src/asset/images/heart.jpg';
import menu1 from 'D:/medicine/src/asset/images/menu1.png';
import neuro from 'D:/medicine/src/asset/images/neuro.jpg';
import opt from 'D:/medicine/src/asset/images/opt.jpg';
import other from 'D:/medicine/src/asset/images/other.jpg';
import pedi from 'D:/medicine/src/asset/images/pedi.jpg';
import phy from 'D:/medicine/src/asset/images/phy.jpg';
import uro from 'D:/medicine/src/asset/images/uro.jpg';

import Allergy from 'D:/medicine/src/asset/images/Allergy.jpg';

function DoctorCategory({filter})
{
let category=["Neurologist", "Heart","Gastric","Pediatricians","Gyenocologist","Flu","Allergists","Psychiatrist","Ophthalmologist","Urologists","Other"];
let images=[neuro,heart,gas,pedi,geyno,cold,Allergy,phy,opt,uro,other];

let [what, setWhat]=useState(true);
const catHandler=()=>{
    if(what===true)
    setWhat(false);
    else
    setWhat(true);
}
return(
    <div className={styles.doctorcategory}>
        <div className={styles.cat}>
        <img src={menu1} alt="Categories menu" onClick={catHandler}/>
        <span>Categories</span>
        </div>
       {what&&<div> {category.map((e,i)=>{
            return <ul>
                <div  onClick={()=> filter(e)}>
                    <img src={images[i]} alt={e}/>
                <li key={i}>{e}</li>
                </div>
                
            </ul>
        })}</div>}
    
       
    </div>
)
}

export default DoctorCategory;