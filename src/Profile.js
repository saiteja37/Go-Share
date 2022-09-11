import axios from 'axios'
import React from 'react'
import Navba from './Navbar'
import { useEffect,useState } from 'react'
const Profile = () => {
    const tok=localStorage.getItem("pos-user");
    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
  console.log(token)
  const [data,setData]=useState()
    useEffect(()=>{
    
        axios.get("http://localhost:1000/profile",{
            headers:{
                "x-token":token
            }
        }).then((res)=>{
           setModal(true)
           setData(res.data)
        })
    },[])
  return (
    <div>
    <Navba></Navba>
    <center>
        <h1 className='mt-3'>My Profile</h1>
        <hr/>
        {modal?
        <div>
        <h3 className='text-info mt-3'>Name : <b className='text-warning'>{data.name}</b></h3>
        <h3 className='text-info mt-3'>Phno : <b className='text-warning'>{data.phno}</b></h3>
        <h3 className='text-info mt-3'>Email : <b className='text-warning'>{data.email}</b></h3>
        </div>:
        "Loading"
        }
        
    </center>
    </div>
  )
}

export default Profile