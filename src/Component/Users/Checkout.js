import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import styles from 'D:/medicine/src/asset/css/checkout.module.css';
function Checkout({total1})
{
  let total={item:5,price:2000}
   const [ship,setShip]=useState(0);
    const [code,setCode]=React.useState('');
    const [city,setCity]=React.useState('Sylhet');
    const [email,setEmail]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [method,setMethod]=React.useState("online");
    const [address,setaddress]=React.useState("");
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
            
        }
        return(
    <div className={styles.checkout}>
        <div className={styles.delivery}>
            <h2>Enter Your details</h2>
            <form onSubmit={()=> handleSubmit(submit)}>
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
                    <input type="submit"></input>
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
            <pre>{total.item}</pre>
            <pre>{total.price}</pre>
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
            <pre>{total.price+ship}</pre>
            </div>
            </div>
            <NavLink className={styles.checkout} to="/cart">
            PlaceOrder
            </NavLink>
           </div>
    </div>
)
        
}

export default Checkout;