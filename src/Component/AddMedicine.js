import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import * as yup from 'yup';
import style from '../asset/css/addmedicine.module.css';
import wall from '../asset/images/wall.jpg';

function AddMedicine()
{
  let userType;
  console.log(localStorage.getItem("type"))
  if(localStorage.getItem("type")!=="Normal"&&localStorage.getItem("type")!=="doctor")
   userType=true;
   else
   userType=false;
    const schema=yup.object().shape({
        name:yup.string().min(4).required("Name is required"),
        cat:yup.string().required(),
        des:yup.string().min(100).required("Description is required"),
        price:yup.number().required("Price is required"),
        mg:yup.number().required("Mg is required"),
        qua:yup.number().required("Quantity is required"),
        com:yup.string().min(3).required(),
    }).required();
    const [name,setName]=React.useState('');
    const [des,setDes]=React.useState('');
    const [file,setFile]=React.useState();
    const [price,setPrice]=React.useState(0);
    const [mg,setMg]=React.useState(0);
    const [qua,setQua]=React.useState(0);
    const [com,setCom]=React.useState('');
    const [cat,setCat]=React.useState("Covid 19");
    const {register,handleSubmit,formState:{errors}} =useForm({resolver: yupResolver(schema)})
    const handleChange= (e)=>{
    //  console.log(e);
      const change=e.target.value;
    //  console.log("Abid"+change);
      if(e.target.name==="name")
      setName(change);
      else if(e.target.name==="des")
      setDes(change);
      else if(e.target.name==="price")
      setPrice(change);
      else if(e.target.name==="mg") 
      setMg(change);
      else if(e.target.name==="qua")
      setQua(change);
      else if(e.target.name==="com")
      setCom(change);
      else
      setCat(change);
    }
    const imageChange=(e)=>{
    
      setFile(e.target.files[0]);
    }
    const submit=(e)=> {
   
      let data=new FormData();
      data.append("name", name);
      data.append("description",des);
      data.append("price",price);
      data.append("company",com);
      data.append("mg",mg);
      data.append("category",cat);
      data.append("medicineImage",file);
      data.append("quantity",qua);
      axios.post("http://localhost:5000/addmedicine",{
     name,description:des,price,company:com,mg,category:cat,quantity:qua,medicineImage:file
     },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        'Content-type':"multipart/form-data"
      }}).then((data)=>{
      if(data.status===200)
      console.log(data);
    }).catch(err=>
      {
        console.log(err);
      });
   
    return console.log(e);
  }

     
return(
    <div className={style.addMedicine}>
      {!userType&&<Navigate to="/denied"></Navigate>}
        <div className={style.container}>
        <img src={wall} alt="Medicine"/>
        <h3 className={style.title}>Add a New Medicine</h3>
 <form onSubmit={ handleSubmit(submit)}>
 <label htmlFor="image">Profile Picture</label> 
<input className={style.fileSelector}
  type='file'
  name="image"
  style={{ display: 'block' }}
  onChange={imageChange}
/>
<p className={style.error}></p>
<label htmlFor="name">Name</label>
<input type="text" value={name} name="name" {...register('name')} onChange={handleChange}></input> 
<p className={style.error}>{errors.name?.message}</p>
<label htmlFor="des">Description</label>
<textarea  type="text"  rows="10" column="10" value={des}  {...register('des')}onChange={handleChange} ></textarea>
<p className={style.error}>{errors.des?.message}</p>

<label htmlFor="com">Company</label>
<input type="text"  value={com}  {...register('com')} onChange={handleChange}></input>
<p className={style.error}>{errors.com?.message}</p>

<label htmlFor="cat">Category</label>

<select  {...register("cat")} value={cat} onChange={handleChange}>
                    <option value="Covid 19">Covid 19</option>
                    <option value="Heart">Heart</option>
                    <option value="Women Care">Women Care</option>
                    <option value="Personal Help">Personal Help</option>
                    <option value="Devices">Devices</option>
                    <option value="Nutrtions">Nutrtions</option>
                    <option value="Sexual Help">Sexual Help</option>
                    <option value="Gastrology">Gastrology</option>
                    <option value="Baby">Baby</option>
                    <option value="First Aid">First Aid</option>
                    <option value="Others">Others</option>
                </select>
                <p className={style.error}>{errors.cat?.message}</p>

<label htmlFor="price">Price</label>
<input  type="number"  value={price}   {...register('price')} onChange={handleChange}></input>
<p className={style.error}>{errors.price?.message}</p>


<label htmlFor="mg">Mg</label>
<input type="number"   value={mg}  {...register('mg')} onChange={handleChange}></input>
<p className={style.error}>{errors.mg?.message}</p>

<label htmlFor="qua">Quantity</label>
<input  type="number"   value={qua} {...register('qua')} onChange={handleChange}></input>
<p className={style.error}>{errors.qua?.message}</p>

<input type="submit"></input>
</form>
</div> 
</div>
)
}

export default AddMedicine;