import React from 'react'
import { Navbar, Container, Button, Nav, Form, FormControl } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { CarOutlined } from '@ant-design/icons';
function Navba() {

    let navigate = useNavigate();

    //logout user
    const userLogout = () => {
        localStorage.removeItem("pos-user");
        navigate("/")
    };

    return (
        <div style={{"background-color":"rgb(169, 223, 191)"}}>
        <div className='mx-5 text-dark' >
            <Navbar  style={{"background-color":"rgb(169, 223, 191)"}} expand="lg">
            <i class="fa-sharp fa-solid fa-cars"></i>
                <Container fluid>
                    <Navbar.Brand href="/home"><b><CarOutlined />Go Share</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 mr-3"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <a className='mx-3'   href="/home">Home</a>
                            <a className='mx-3'    as={NavLink} href="/book">Book A Ride</a>
                            <a className='mx-3'    as={NavLink} href="/post">Post A ride</a>
                            <a className='mx-3'    as={NavLink} href="/myrides">My Rides</a>
                            <a className='mx-3'     as={NavLink} href="/profile" >Profile </a>
                            
                        
                            
                        </Nav>
                    </Navbar.Collapse>
                    <button class="justify-content-center" onClick={userLogout}>logout</button>
                    
                </Container>
            </Navbar>
        </div>
        </div>
    )
}

export default Navba