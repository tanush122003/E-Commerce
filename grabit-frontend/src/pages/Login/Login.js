import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const loginObject = 
{
  email:'',
  password:''
}

const Login = () => 
{
  const [loginDetails,setLoginDetails] = useState(loginObject); 
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location)

  
  useEffect(()=>
  {
    window.scrollTo(0,0)
  })

  const handleChange = (e)=>
  {
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
    console.log(loginDetails)
  }

  const sendLoginRequestToBackend = async()=>
  {
    console.log('send login request');
    try 
    {
      const {data} = await axios.post("/auth/login",{ 
      email:loginDetails.email,password:loginDetails.password
    })

    console.log(data)

    if(data?.error)
    {
      toast.error(data?.error);
    }
    else
    {
      localStorage.setItem('auth',JSON.stringify(data));
      setAuth
      ({
        ...auth,token:data?.token,user:data?.user
      })
      toast.success('User Logged in Succesfully');
      navigate(location.state || `/dashboard/${data?.user?.role === 'admin' ? 'admin':'user'}`);
    }
      
    } 
    catch (error) 
    {
      toast.error(error.response.data.error)
    }
    
  }

 
  return (
 <form id="login-page">
  <div className="container">
    
    <div className="row form flex-column align-items-center justify-content-center">
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <h2 class="text-center text-bg-dark bg-transparent login-head">Login</h2>
        <h4 className="alert-msg text-center" />
        <label class="email-cont text-bg-dark bg-transparent">E-mail&nbsp;&nbsp;<i class="fa fa-envelope mail-icon"></i></label>
        <input type="email" onChange={handleChange} name="email" id="e-mail" placeholder="example@example.com..." />
      </div>
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <label class="password-cont text-bg-dark bg-transparent">Password&nbsp;&nbsp;<i class="fa-solid fa-lock"></i></label>
        <input type="password" onChange={handleChange} name="password" id="password" placeholder="Password..." />
      </div>
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <button type="button" id="submit" onClick={()=>sendLoginRequestToBackend()} className="submit-btn">Login</button>
        <NavLink to='/register' style={{marginTop:"20px",color:"white"}} className=" text-center h4 text-decoration-none">Not a member ? Register !</NavLink>
      </div>
    </div>
  </div>
</form>

  )
}

export default Login