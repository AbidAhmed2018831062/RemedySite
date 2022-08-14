import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import styles from 'D:/medicine/src/asset/css/checkout.module.css';
function Checkout({total1})
{
  let [show,setShow]=useState(false);
  let [text,setText]=useState("");
  const {search}=useLocation();
  let {price,item}=queryString.parse(search);
  price=parseInt(price);
  item=parseInt(item);
   const [ship,setShip]=useState(0);
    const [code,setCode]=React.useState('');
    const [city,setCity]=React.useState('Sylhet');
    const [email,setEmail]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [method,setMethod]=React.useState("online");
    const [address,setaddress]=React.useState("");
    
    const rand = () => {
      return Math.random().toString(36).substr(2);
    };
    
    const token = () => {
      return rand() + rand();
    };
    
    const schema=yup.object().shape({
      address:yup.string().min(4).required("Address is required"),
        code:yup.number().required("Postal Code required"),
        email:yup.string().email("The given email is not a valid email").required("Email is required"),
        phone:yup.number().required("Phone number is required"),
       
    }).required();
    let {register,handleSubmit,setError, formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
        //  console.log(e);
          const change=e.target.value;
          if(e.target.name==="address")
          setaddress(change);
          else if(e.target.name==="phone") 
          setPhone(change);
          else if(e.target.name==="city"){
            if(change==="Sylhet")
            setShip(0);
            else
            setShip(100);
            setCity(change);

          }
          else if(e.target.name==="code")
          setCode(change);
          else if(e.target.name==="email")
          setEmail(change);
          else{
            if(change==="online")
            setShip(0);
          setMethod(change);
        
        }
      }
        const submit=()=>{
        /*  */
         // console.log("Hello");
          
          if(address.length<6){
           
          setError("address", { type: "focus",message: 'Address needs to be more than 6characters' }, { shouldFocus: true });
          }
          if(phone.length!==11){
           
          setError("phone", { type: "focus",message: 'Phone needs to be 11characters' }, { shouldFocus: true });
          }
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
        
            setError("email", { type: "focus",message: 'Needs to be a valid email address' }, { shouldFocus: true });
        
          }
          if(code.length<1){
           
            setError("code", { type: "focus",message: 'Postal code needs to be inserted' }, { shouldFocus: true });
            }
          if(code.length>1&&address.length>6&&phone.length===11&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            axios.post("http://localhost:5000/users/neworder",{phone,email,address,username:localStorage.getItem("username"),name:localStorage.getItem("username"),price:price+ship,deliverytype:method,token:token(),date:new Date()},{headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`,
             }}).then((data)=>{
              if(data.status===200){
               
                axios.delete(`http://localhost:5000/users/cart/delete/${localStorage.getItem("username")}`,{headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`,
                 }}).then((data)=>{
                  if(data.status===200){
                   setShow(true);
                   setText("Your order was places successfully");
                   setPhone("");
                   setEmail("");
                   setCode("");
                   setCity("");
                  console.log(data);
                }
                }).catch(err=>
                  {
                    console.log(err);
                   
          
                  });            }
            }).catch(err=>
              {
                console.log(err);
               
      
              });
            }
          
        }
        const remove=()=>{
          setShow(false);   }
       const  removeShow=()=>{
          const interval=setInterval(() => {
              setShow(false);
            
          }, 10000);
       }
        return(
    <div className={styles.checkout}>
    
        <div className={styles.delivery}>
            <h2>Enter Your details</h2>
            <form>
            <input   type="email"  value={email}   placeholder="Email" {...register('email')} onChange={handleChange}></input>
    <p className={styles.error}>{errors.email?.message}</p>
    <input  type="text"   value={phone}   placeholder="Phone" {...register('phone')} onChange={handleChange}></input>
    <p className={styles.error}>{errors.phone?.message}</p>
            <input type="text" value={address}  placeholder="Enter your address" {...register('address')} onChange={handleChange}></input> 
    <p className={styles.error}>{errors.address?.message}</p>
    <input type="text" value={code}  placeholder="Postal Code" {...register('code')}onChange={handleChange}></input> 
    <p className={styles.error}>{errors.name?.message}</p>   
    <select className={styles.ship}  value={city}  name="city" onChange={handleChange}>
                        <option value="Sylhet">Sylhet</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Cumilla">Cumilla</option>
                        <option value="Rangpur">Rangpur</option>
                          <option value="Chittagong">Chittagong</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Rajshahi">Rajshahi</option>
                            <option value="Barisal">Barisal</option>
                    </select> 
                  
            </form>
            <div className={styles.method}>
                <h3>Choose your delivery method</h3>
                <div className={styles.choose}>
                    <div>
                <input type="radio"value="online" checked={method==="online"} onChange={handleChange} placeholder="Online payment"/>
                <span>Online Payment</span>
                </div>
                <input type="radio"value="ondelivery" checked={method==="ondelivery"} onChange={handleChange}/>
                <span>Payment on delivery</span>
                </div>
                
            </div>

        </div>
        <div className={styles.order}>
            <h3>Summary</h3>
            <hr></hr>
            <div className={styles.flex}>
            <div className={styles.total}>
            <pre>Total Items: </pre>
            <pre>Total Price</pre>
            <pre>Shipping</pre>
            </div>
            <div className={styles.total1}>
            <pre>{item}</pre>
            <pre>{price}</pre>
            <pre>{ship}</pre>
            </div>
            </div>
                    <h4>
                Enter Code
            </h4>
            <input type="text" value={code} placeholder="Enter code"></input>
            <hr></hr>
            <div className={styles.flex} style={{marginBottom:"30px"}}>
            <div className={styles.total}>
            <pre style={{fontWeight:"bold",fontSize:"120%"}}>Total Amount:</pre>
            </div>
            <div className={styles.total1}>
            <pre>{price+ship}</pre>
            </div>
            </div>
          <button className={styles.button} onClick={submit}> Submit</button>
            
           </div>
           {show&&<Navigate to="/successful"></Navigate>}
    </div>
)
        
}

export default Checkout;