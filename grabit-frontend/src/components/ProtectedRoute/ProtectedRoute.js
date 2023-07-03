import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth/authContext'
import Loading from '../Loading/Loading';
import axios from 'axios';


const ProtectedRoute = () => 
{
  const [auth,setAuth] = useAuth();
  const [isAuthorized,setIsAuthorized] = useState(false);

  useEffect(()=>
  {
    const sendRequestToBackendToCheckIfUserIsAuthenticated = async()=>
    {
      const {data} = await axios.get(`/auth/authenticate`);
      console.log(data)
      if(data.ok)
      {
        setIsAuthorized(true)
      }
      else
      {
        setIsAuthorized(false);
      }
    }

    if(auth?.token) sendRequestToBackendToCheckIfUserIsAuthenticated();
  },[auth?.token])

  return isAuthorized ? <Outlet /> : <Loading/>;

  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute