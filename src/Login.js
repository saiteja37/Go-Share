import React from 'react'
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const submit = (userCredObj) => {
        console.log(userCredObj);
        const data = {
            email: userCredObj.email,
            pass: userCredObj.password
        }
        axios.post("http://localhost:1000/clogin", data).then((res) => {
            localStorage.setItem('pos-user', JSON.stringify(res.data));
            navigate("/home")
        })
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="body">
        <center>
        <p className="display-4 mt-2 text-dark mb-0 text-info">Go share</p>
        <h5 className='ml-4 mt-1 '>sharing became easy</h5>
        </center>
        <div className='login'>
            <form className='border p-4 bg-opacity-25 shadow rounded-3' onSubmit={handleSubmit(submit)} style={{backgroundColor:`rgb(204, 209, 209 )`}} >
                <div className=' mx-5'>
                    <p className='display-6 mx-5 px-4 text-center'>LOGIN</p>
                </div>
                <hr />
                {/* email */}
                <div className="mb-3">
                    <label htmlFor="email" className='text-center mt-3 mb-1'>Email</label>
                    <input type="email" style={{ borderRadius: '15px' }} id="email" className="form-control  " {...register("email", { required: true })} />
                    {/* validation error msg for email */}
                    {errors.email?.type === 'required' && <p className='text-danger'>* Email required</p>}
                </div>
                {/* password */}
                <div className="mb-3">
                    <label htmlFor="password" className='mt-3 mb-1 d-block m-auto'>Password</label>
                    <input type="password" style={{ borderRadius: '15px' }} id="password" className="form-control" {...register("password", { required: true, maxLength: 28, minLength: 4 })} />
                    {/* validation error msg for password */}
                    {errors.password?.type === 'required' && <p className='text-danger'>* Password required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                    {errors.password?.type === 'maxLength' && <p className='text-danger'>* Max length should be 28</p>}
                </div>
                {/* login button */}
                <div className='mb-1 text-center'>
                    {/* <button type="submit" className="btn  w-50 mb-1" style={{ borderRadius: '15px', backgroundColor: 'orange', color: '' }}>Login</button> */}
                    <Button type='submit' variant='outline-primary' size="lg">Login</Button>
                </div>
                <div className='row mt-4'>
                    <div className='text-start'>
                        {/* <Button href="signup" className='  border-warning border' style={{ borderRadius: '15px', color: 'black' ,backgroundColor:'yellow'}}>SIGNUP</Button> */}
                        <p>New User?<a href='/'><span className="btn text-primary px-2">Register</span></a></p>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login