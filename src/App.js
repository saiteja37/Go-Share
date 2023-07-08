import React from 'react'
import Register from './Authentication/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import Login from './Authentication/Login';
import Navba from './Navbar';
import Home from './User Info/Home';
import Profile from './User Info/Profile';
import Myrides from './User Info/Myrides';
import Booked from './Bookings/Booked';
import Book from './Bookings/Book';
import Posted from './Postings/Posted';
import Post from './Postings/Post'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/nav" element={<Protected><Navba></Navba></Protected>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/book" element={<Book></Book>}></Route>
        <Route path="/post" element={<Post></Post>}></Route>
        <Route path="/profil" element={<Profile></Profile>}></Route>
        <Route path="/myrides" element={<Myrides></Myrides>}></Route>
        <Route path="/clibooked" element={<Booked></Booked>}></Route>
        <Route path="/cliposted" element={<Posted></Posted>}></Route>
      </Routes>
    </Router>
  )
}

export default App


export function Protected({children}){
  if(localStorage.getItem("pos-user"))
  return children
  else
  return <Navigate to="/home"></Navigate>
}