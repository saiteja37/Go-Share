import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navba from '../Navbar'
import { Table } from 'antd'
const Booked = () => {
    const [list,setList]=useState([])
    const tok=localStorage.getItem("pos-user");
    const [modal,setModal]=useState(false)
    const  ans=tok.slice(1)
  const token=ans.slice(0,ans.length-1)
    axios.get("http://localhost:2000/sbooked",{
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
       
    ]
  return (
    <div>
        <Navba>
        </Navba>
        <center>
            <h1 className='mt-3'>Booked Rides</h1>
            <hr/>
            {
            
            modal?
            <div className='mt-3 mr-3 ml-3'><Table columns={columns} dataSource={list}></Table></div>:""
            

            
          }
        </center>
    </div>
  )
}

export default Booked