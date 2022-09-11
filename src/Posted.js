import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navba from './Navbar'
import { Table } from 'antd'
const Posted = () => {
    const [list,setList]=useState([])
    const tok=localStorage.getItem("pos-user");
    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
    axios.get("http://localhost:1000/sposted",{
        headers:{
          'x-token':token
        }
      }).then((res)=>{
        setModal(true)
        setList(res.data)
      })
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
          title:"Sharedwith",
          dataIndex:"bookedby",
          render:item=>Object.values(item)[1]
        },
        {
          title:"PH.No",
          dataIndex:"bookedby",
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
       
    ]
  return (
    <div>
        <Navba>
        </Navba>
        <center>
            <h1 className='mt-3'>Posted Rides</h1>
            <hr/>
            {
            
            modal?
            <div className='mt-3 mr-3 ml-3'><Table columns={columns} dataSource={list}></Table></div>:""
            

            
          }
        </center>
    </div>
  )
}

export default Posted