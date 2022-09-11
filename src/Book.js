import React from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import {Table} from 'antd'
import './Login.css'
import Navba from './Navbar';
import './Book.css'
const Book = () => {
    const navigate = useNavigate();
    const[dat,setDat]=useState()
  const tok=localStorage.getItem("pos-user");
    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const[list,setList]=useState([])
    axios.get("http://localhost:1000/profile",{
        headers:{
            "x-token":token
        }
    }).then((res)=>{
       setDat(res.data._id)
    })
    const cli=(record)=>{
      const data={
        from:record.from,
        to:record.to,
        veh:record.veh,
        charge:record.charge,
        date:record.date,
        person:record.person,
        bookedby:dat
      }
      console.log(data)
      axios.post("booked",data,{
        headers:{
          'x-token':token
        }
      }).then((res)=>{
        console.log(res.data)
      })
      const da={
        id:record._id
      }
      axios.post("del",da,{
        headers:{
          'x-token':token
        }
      }).then((res)=>{
        setList(res.data)
        window.location.reload();
      })
    }
    
  const columns=[
    {
        title:"FROM",
        dataIndex:"from"
    },
    {
        title:"TO",
        dataIndex:"to"
    },
    {
        title:"VEHICLE",
        dataIndex:"veh"
    },
    {
      title:"Name",
      dataIndex:"person",
      render:item=>Object.values(item)[1]
    },
    {
      title:"PH.No",
      dataIndex:"person",
      render:item=>Object.values(item)[2]
    },
    {
      title:"Charge",
      dataIndex:"charge",
    },
    {
      title:"Date",
      dataIndex:"date",
    },
    {
      title:"CONFORMATION",
      dataIndex:"_id",
      render:(_id,record)=><div>
        <button className='btn-success' onClick={()=>{cli(record)}} >Accept</button>
      </div>
    }
   
]
  
    const submit = (userCredObj) => {
      console.log(userCredObj)
      const data={
        "from":userCredObj.from,
        "to":userCredObj.to
      }
      axios.post("http://localhost:1000/cbook",data,{
        headers:{
          'x-token':token
        }
      }).then((res)=>{
        setModal(true)
        setList(res.data)
      })
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (<div>
    <Navba></Navba>


        <div className='book mt-0 mx-auto'>
            <form className='border p-4 bg-opacity-25 shadow rounded-3' onSubmit={handleSubmit(submit)} style={{backgroundColor:`rgb(214,215,215)`}} >
                <div className='m-3 mx-5'>
                    <p className='display-6 mx-5 px-4 text-center'>Book A Ride</p>
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
                {/* login button */}
                <div className='mb-1 text-center'>
                    {/* <button type="submit" className="btn  w-50 mb-1" style={{ borderRadius: '15px', backgroundColor: 'orange', color: '' }}>Login</button> */}
                    <Button type='submit' variant='outline-success' size="lg">Search Ride</Button>
                </div>
                
               
            </form>
            {
            
            modal?
            <div className='mt-3 mr-3 ml-3'><Table columns={columns} dataSource={list}></Table></div>:""
            

            
          }
        </div>
      
        </div>
    )
}

export default  Book
/*import React from 'react'
import Navba from './Navbar'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
const Book = () => {
  const [from,setFrom]=useState();
  const[to,setTo]=useState();
  const[dat,setDat]=useState()
  const tok=localStorage.getItem("pos-user");
    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  const[list,setList]=useState([])
    axios.get("/profile",{
        headers:{
            "x-token":token
        }
    }).then((res)=>{
       setDat(res.data._id)
    })

  const cli=(record)=>{
    const data={
      from:record.from,
      to:record.to,
      veh:record.veh,
      charge:record.charge,
      date:record.date,
      person:record.person,
      bookedby:dat
    }
    console.log(data)
    axios.post("/booked",data,{
      headers:{
        'x-token':token
      }
    }).then((res)=>{
      console.log(res.data)
    })
    const da={
      id:record._id
    }
    axios.post("/del",da,{
      headers:{
        'x-token':token
      }
    }).then((res)=>{
      setList(res.data)
      window.location.reload();
    })
  }
  
  
  const columns=[
    {
        title:"FROM",
        dataIndex:"from"
    },
    {
        title:"TO",
        dataIndex:"to"
    },
    {
        title:"VEHICLE",
        dataIndex:"veh"
    },
    {
      title:"Name",
      dataIndex:"person",
      render:item=>Object.values(item)[1]
    },
    {
      title:"PH.No",
      dataIndex:"person",
      render:item=>Object.values(item)[2]
    },
    {
      title:"Charge",
      dataIndex:"charge",
    },
    {
      title:"Date",
      dataIndex:"date",
    },
    {
      title:"CONFORMATION",
      dataIndex:"_id",
      render:(_id,record)=><div>
        <button className='btn-success' onClick={()=>{cli(record)}} >Accept</button>
      </div>
    }
   
]
  const sub=()=>{
    const data={
      "from":from,
      "to":to
    }
    axios.post("/cbook",data,{
      headers:{
        'x-token':token
      }
    }).then((res)=>{
      setModal(true)
      setList(res.data)
    })
  }
  return (
    <div style={{"background-color":"rgb(133, 146, 158 )"}}>
        <Navba></Navba>
           <center>
           <h2 className='mt-2'>Booking page</h2>
           <hr/>
           <div className='mt-2'>
           <div className='mt-2'>
           <input value={from} onChange={(e)=>setFrom(e.target.value)} placeholder='Enter Source'></input>
           </div>
         <div className='mt-3'>
         <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder='Enter Destination'></input>
         
         </div>
         <button className='btn btn-success mt-4' onClick={sub} >Book A Ride</button>
           </div>
           <div className='mt-3 ml-3 mr-3'>
           {
            
            modal?
            <div className='mt-3 mr-3 ml-3'><Table columns={columns} dataSource={list}></Table></div>:""
            

            
          }
           </div>
         
           </center>
    </div>
  )
}

export default Book
*/