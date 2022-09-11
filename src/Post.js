import React from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'
import Navba from './Navbar';
import './Book.css'
const Post = () => {
    const navigate = useNavigate();
    const [veh,setVeh]=useState();
    const tok=localStorage.getItem("pos-user");

    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const [dat,setDat]=useState()
   axios.get("http://localhost:1000/profile",{
    headers:{
        "x-token":token
    }
}).then((res)=>{
   setDat(res.data)
})
    const submit = (userCredObj) => {
        navigate("/home")
        console.log(userCredObj);
        const data = {
            from: userCredObj.from,
            to: userCredObj.to,
            date:userCredObj.date,
            charge:userCredObj.charge,
            veh:veh,
            person:dat._id
        }
        console.log(data)
        axios.post("http://localhost:1000/cpost", data).then((res) => {
          
        })
        
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div style={{"background-color":"rgb(133, 146, 158 )"}}>
            <Navba></Navba>
        
        <div className='book mx-auto mt-5'>
            <form className='border p-4 bg-opacity-25 shadow rounded-3' onSubmit={handleSubmit(submit)} style={{backgroundColor:`rgb(214,215,215)`}} >
                <div className='m-3 mx-5'>
                    <p className='display-6 mx-5 px-4 text-center'>Post A Ride</p>
                </div>
                <hr />
                {/* email */}
                <div className="mb-3">
                    <label htmlFor="name" className='text-center mt-3 mb-1'>Source</label>
                    <input type="name" style={{ borderRadius: '15px' }} id="from" className="form-control  " {...register("from", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Source required</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className='text-center mt-3 mb-1'>Destination</label>
                    <input type="name" style={{ borderRadius: '15px' }} id="to" className="form-control  " {...register("to", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Destination required</p>}
                </div>
                {/* password */}
                <div className="mb-3">
                    <label htmlFor="date" className='text-center mt-3 mb-1'>Date</label>
                    <input type="name" style={{ borderRadius: '15px' }} id="date" className="form-control  " {...register("date", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Date required</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className='text-center mt-3 mb-1'>Charge</label>
                    <input type="name" style={{ borderRadius: '15px' }} id="charge" className="form-control  " {...register("charge", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Charge required</p>}
                </div>
                
                <div>
                <label htmlFor="name" className='text-center mt-3 mb-1'>Vehilce &nbsp;&nbsp;&nbsp;</label>
                <select value={veh} onChange={(e)=>setVeh(e.target.value)} >
        
                <option value="car">car</option>
                <option value="bike">bike</option>
       </select>
                </div>
                {/* login button */}
                <div className='mb-1 mt-3 text-center'>
                    {/* <button type="submit" className="btn  w-50 mb-1" style={{ borderRadius: '15px', backgroundColor: 'orange', color: '' }}>Login</button> */}
                    <Button type='submit' variant='outline-success' size="lg">Post A Ride</Button>
                </div>
                
            </form>
        </div>
        </div>
    )
}

export default Post