import React from 'react'
import { useForm } from 'react-hook-form';
import { Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Register.css'

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSignin= () => {
      ""
    }
    const submit = (userCredObj) => {
        const data = {
            name: userCredObj.name,
            phno: userCredObj.number,
            gender: userCredObj.gender,
            email: userCredObj.email,
            pass: userCredObj.password,
        };
        console.log(data)
        axios.post("http://localhost:2000/creg", data).then((res) => {
        });
        navigate("/login")
    };
    return (
        <div className='body'>
         <center>
        <p  className=" display-4 mt-2  mb-0">Go share</p>
        <h5 className='ml-4 mt-1 '>sharing became easy</h5>
        </center>
        <div className='register mr-4'>
            <form className='border p-5 bg-opacity-50 shadow rounded-3 mr-4' style={{backgroundColor:`rgb(214,215,215)`}} onSubmit={handleSubmit(submit)} >

                <div className='m-3'>
                    <p className='display-6 text-center px-5 mx-2'>REGISTER</p>
                </div>
                <hr />
                {/* name */}
                <div className="mb-3">
                    <label htmlFor="name" className='text-center mt-3 mb-1'>Name</label>
                    <input type="name" style={{ borderRadius: '15px' }} id="name" className="form-control  " {...register("name", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Name required</p>}
                </div>
                {/* phoneNo. */}
                <div className="mb-3">
                    <label htmlFor="number" className='text-center mt-3 mb-1'>PhoneNo.</label>
                    <input type="mobile" style={{ borderRadius: '15px' }} id="number" className="form-control  " {...register("number", { required: true })} />
                    {/* validation error msg for name */}
                    {errors.number?.type === 'required' && <p className='text-danger'>*PhoneNo. required</p>}
                </div>
                {/* gender */}
                <div>
                    <label htmlFor="name" className='mt-3 mb-1 d-block'>Gender</label>
                    <Form.Check type='radio' name='gender' id='male' value='option1' label='Male' inline />
                    <Form.Check type='radio' name='gender' id='female' value='option2' label='Female' inline />
                    <Form.Check type='radio' name='gender' id='other' value='option3' label='Other' inline />
                    {/* validation error msg for name */}
                    {errors.name?.type === 'required' && <p className='text-danger'>*Gender required</p>}
                </div>
                {/* email */}
                <div className="mb-3">
                    <label htmlFor="email" className='text-center mt-3 mb-1'>Email</label>
                    <input type="email" style={{ borderRadius: '15px' }} id="email" className="form-control  " {...register("email", { required: true })} />
                    {/* validation error msg for email */}
                    {errors.email?.type === 'required' && <p className='text-danger'>*Email required</p>}
                </div>
                {/* password */}
                <div className="mb-3">
                    <label htmlFor="password" className='mt-3 mb-1 d-block m-auto'>Password</label>
                    <input type="password" style={{ borderRadius: '15px' }} id="password" className="form-control" {...register("password", { required: true, maxLength: 28, minLength: 8 })} />
                    {/* validation error msg for password */}
                    {errors.password?.type === 'required' && <p className='text-danger'>*Password required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-danger'>*Min length should be 8</p>}
                    {errors.password?.type === 'maxLength' && <p className='text-danger'>*Max length should be 28</p>}
                </div>
                {/* Signup button */}
                <div className='mb-3 text-center'>
                    <Button type='submit' variant='outline-primary' size="lg">Signup</Button>
                </div>
                <div>
                    <h7>
                        Already have an account? <a href="/login"><span className='btn text-primary' onClick={handleSignin}> Signin</span></a>
                    </h7>
                </div>

            </form>
        </div>
        </div>
    )
}

export default Register