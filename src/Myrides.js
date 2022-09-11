import React from 'react'
import { Navbar } from 'react-bootstrap'
import Navba from './Navbar'

const Myrides = () => {
  return (
    <div>
        <Navba>
        </Navba>
        <center>
        <h1 className='mt-3'>My Rides</h1>
        <hr></hr>
           <button className='btn btn-danger mx-2'><a href="/booked">Booked Rides</a></button>
           <button className='btn btn-warning mx-2'><a href='/posted'>Posted Rides</a></button>
        </center>
    </div>
  )
}

export default Myrides