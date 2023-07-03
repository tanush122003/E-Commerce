import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth/authContext'
import Loading from '../Loading/Loading';
import axios from 'axios';


const AdminRoute = () => 
{
  const [auth,setAuth] = useAuth(); 
  const [isAuthorized,setIsAuthorized] = useState(false);

  useEffect(()=>
  {
    const checkIfUserIsAdmin = async()=>
    {
      const {data} = await axios.get(`/auth/check-for-admin`);
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
    if(auth?.token) checkIfUserIsAdmin();
  },[auth?.token])

  return isAuthorized ? <Outlet /> : <Loading path='home'/>;

  return (
    <div>ProtectedRoute</div>
  )
}

export default AdminRoute