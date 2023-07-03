import React from 'react'
import { useAuth } from '../../../context/auth/authContext'
import './AdminDashboard.css'

const AdminDetails = () => 
{
    const [auth,setauth] = useAuth();
  return (
    <div className='text-center admin-detail'>
        <h2>Name :  &nbsp;{auth?.user.name}</h2>
        <h2>Role :  &nbsp;{auth?.user.role}</h2>
        <h2>Email : &nbsp;{auth?.user.email}</h2>
    </div>
  )
}

export default AdminDetails