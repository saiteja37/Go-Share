import React from 'react'
import Register from './Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import Login from './Login';
import Navba from './Navbar';
import Home from './Home';
import Book from './Book';
import Profile from './Profile';
import Post from './Post';
import Myrides from './Myrides';

import Booked from './Booked';
import Posted from './Posted';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/nav" element={<Navba></Navba>}></Route>
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